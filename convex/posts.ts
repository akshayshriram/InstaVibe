import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const generateUploadUrl = mutation(async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    return await ctx.storage.generateUploadUrl();
})

export const createPost = mutation({
    args: {
        caption: v.optional(v.string()),
        storageId: v.id("_storage"),
    },
    handler: async (ctx, args) => {

        const currentUser = await getAuthenticatedUser(ctx);

        const imageUrl = await ctx.storage.getUrl(args.storageId);
        if (!imageUrl) throw new Error("Image Not Found");

        // createPost
        const postId = await ctx.db.insert("posts", {
            userId: currentUser._id,
            imageUrl,
            storageId: args.storageId,
            caption: args.caption,
            likes: 0,
            Comments: 0
        })

        // increment user's post by one

        await ctx.db.patch(currentUser._id, {
            posts: currentUser.posts + 1
        });

        return postId

    }
})

export const getFeedPosts = query({
    handler: async (ctx) => {
        const currentUser = await getAuthenticatedUser(ctx)

        // Get All Posts
        const posts = await ctx.db.query("posts").order("desc").collect()

        if (posts.length === 0) return []

        const postsWithInfo = await Promise.all(
            posts.map(async (post) => {
                const postAuthor = (await ctx.db.get(post?.userId))!

                const like = await ctx.db.query("likes")
                    .withIndex("by_user_and_post", (q) => q.eq("userId", currentUser._id).eq("postId", post._id)).first()

                const bookmark = await ctx.db.query("bookmarks")
                    .withIndex("by_user_and_post", (q) => q.eq("userId", currentUser._id).eq("postId", post._id)).first()

                return {
                    ...post,
                    author: {
                        _id: postAuthor?._id,
                        username: postAuthor?.username,
                        image: postAuthor?.image
                    },
                    isLiked: !!like,
                    isBookmarked: !!bookmark
                }
            })
        )

        return postsWithInfo
    }
})

export const toggleLike = mutation({
    args: { postId: v.id("posts") },
    handler: async (ctx, args) => {
        const currentUser = await getAuthenticatedUser(ctx);

        const existing = await ctx.db
            .query("likes")
            .withIndex("by_user_and_post", (q) =>
                q.eq("userId", currentUser._id).eq("postId", args.postId))
            .first()

        const post = await ctx.db.get(args.postId)

        if (!post) throw new Error("Post Not Found")
        if (existing) {
            // Remove Like
            await ctx.db.delete(existing._id)
            await ctx.db.patch(args.postId, { likes: post.likes - 1 })

            return false //unliked
        } else {
            // Add Like
            await ctx.db.insert("likes", {
                userId: currentUser._id,
                postId: args.postId
            })

            await ctx.db.patch(args.postId, { likes: post.likes + 1 })

            // If not my Post sent notifications to others
            if (currentUser._id !== post.userId) {
                await ctx.db.insert("notificatons", {
                    receiverId: post.userId,
                    senderId: currentUser._id,
                    type: "like",
                    postId: args.postId,
                })
            }
            return true //This is now liked
        }
    }
})

export const deletPost = mutation({
    args: {
        postId: v.id("posts")
    },
    handler: async (ctx, args) => {
        const currentUser = await getAuthenticatedUser(ctx)

        const post = await ctx.db.get(args.postId)
        if (!post) throw new ConvexError("Post Not Found")

        // Verify ownership
        if (post.userId !== currentUser._id) throw new Error("Not Authorized to delete this post.")

        // delete associated links
        const likes = await ctx.db.query("likes")
            .withIndex("by_post", q => q.eq("postId", args.postId))
            .collect()

        for (const like of likes) {
            await ctx.db.delete(like._id)
        }

        // delete assocaited comments
        const comments = await ctx.db.query("comments")
            .withIndex("by_post", q => q.eq("postId", args.postId))
            .collect()

        for (const comment of comments) {
            await ctx.db.delete(comment._id)
        }

        // delete associated bookmark
        const bookmarks = await ctx.db.query("bookmarks")
            .withIndex("by_post", q => q.eq("postId", args.postId))
            .collect()

        for (const bookmark of bookmarks) {
            await ctx.db.delete(bookmark._id)
        }

        // delete associated Notification
        const notifications = await ctx.db.query("notificatons")
            .withIndex("by_post", (q) => q.eq("postId", args.postId))
            .collect()

        for (const notification of notifications) {
            await ctx.db.delete(notification._id)
        }




        // Delete the Image 
        await ctx.storage.delete(post.storageId)

        // Delete the post 

        await ctx.db.delete(post._id)

        await ctx.db.patch(currentUser._id, { posts: Math.max(0, (currentUser.posts || 1) - 1) })

    }
})

export const getPostByUser = query({
    args: {
        userId: v.optional(v.id("users"))
    },
    handler: async (ctx, args) => {

        const user = args.userId ? await ctx.db.get(args.userId) : await getAuthenticatedUser(ctx)

        if (!user) throw new Error("User Not Found")

        const posts = await ctx.db
            .query("posts")
            .withIndex("by_user", q => q.eq("userId", user._id))
            .collect()

        return posts
    }
})
 
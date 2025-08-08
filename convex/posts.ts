import { mutation } from "./_generated/server";
import { v } from "convex/values"

export const genreateUploadUrl = mutation(async (ctx) => {
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
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized");

        const currentUser = await ctx.db.query("users").withIndex("by_clerk_id",
            (q) => q.eq("clerkId", identity.subject)
        ).first()

        if (!currentUser) throw new Error("User not found");

        // createPost

        const imageUrl = await ctx.storage.getUrl(args.storageId);
        if (!imageUrl) throw new Error("Image Not Found");

        await ctx.db.insert("posts", {
            userId: currentUser._id,
            imageUrl,
            storageId: args.storageId,
            likes: 0,
            Comments: 0
        })

        // increment user's post by one

        await ctx.db.patch(currentUser._id, {
            posts: currentUser.posts + 1
        })

    }
})
import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/feed.styles";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Post({ post }: { post: any }) {
  return (
    <View style={styles.post}>
      {/* Post Header */}

      <View style={styles.postHeader}>
        <Link href={"/(tabs)/notification"}>
          <TouchableOpacity style={styles.postHeaderLeft}>
            <Image
              source={post.authorInfo.image}
              style={styles.postAvatar}
              contentFit="cover"
              transition={200}
              cachePolicy={"memory-disk"}
            />
            <Text style={styles.postUsername}>{post.authorInfo.username}</Text>
          </TouchableOpacity>
        </Link>
        {/* SHow a delete button  */}
        <TouchableOpacity>
          <Ionicons
            name="ellipsis-horizontal"
            size={20}
            color={COLORS.white}
          ></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="trash-outline"
            size={20}
            color={COLORS.primary}
          ></Ionicons>
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <Image
        source={post.imageUrl}
        style={styles.postImage}
        contentFit="cover"
        transition={200}
        cachePolicy={"memory-disk"}
      />

      {/* Post Actons */}

      <View style={styles.postActions}>
        <View style={styles.postActionsLeft}>
          <TouchableOpacity
          // onPress={handleLike}
          >
            <Ionicons
              // name={isLiked ? "heart" : "heart-outline"}
              name={"heart-outline"}
              size={24}
              // color={isLiked ? COLORS.primary : COLORS.white}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
          //  onPress={() => setShowComments(true)}
          >
            <Ionicons
              name="chatbubble-outline"
              size={22}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
        // onPress={handleBookmark}
        >
          <Ionicons
            // name={isBookmarked ? "bookmark" : "bookmark-outline"}
            name={"bookmark-outline"}
            size={22}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>

      {/* POST INFO */}
      <View style={styles.postInfo}>
        <Text style={styles.likesText}>
          {post.likes > 0
            ? `${post.likes.toLocaleString()} likes`
            : "Be the first to like         Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae a deserunt, nobis repellendus neque quos itaque? Commodi dolorem, eligendi adipisci reprehenderit officiis quidem vel et perferendis sequi eveniet, deleniti odio aliquam! Consectetur deleniti veritatis distinctio eaque maxime reprehenderit quaerat ipsam."}
        </Text>
        {post.caption && (
          <View style={styles.captionContainer}>
            <Text style={styles.captionUsername}>
              {/* {post.authorInfo.username} */}Author Name
            </Text>
            <Text style={styles.captionText}>{post.caption}</Text>
          </View>
        )}

        {post.comments > 0 && (
          <TouchableOpacity
          // onPress={() => setShowComments(true)}
          >
            <Text style={styles.commentsText}>
              View all {post.comments} comments
            </Text>
          </TouchableOpacity>
        )}

        <Text style={styles.timeAgo}>
          {/* {formatDistanceToNow(post._creationTime, { addSuffix: true })} */}
          2 hours Ago
        </Text>
      </View>
    </View>
  );
}

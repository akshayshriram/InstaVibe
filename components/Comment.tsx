import { styles } from "@/styles/feed.styles";
import { formatDistanceToNow } from "date-fns";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

interface typeComment {
  content: string;
  _creationTime: number;
  user: {
    fullname: string;
    image: string;
  };
}

export default function Comment({ comment }: { comment: typeComment }) {
  return (
    <View style={styles.commentContainer}>
      <Image
        style={styles.commentAvatar}
        source={{ uri: comment.user.image }}
      />
      <View style={styles.commentContent}>
        <Text style={styles.commentUsername}>{comment.user.fullname}</Text>
        <Text style={styles.commentText}>{comment.content}</Text>
        <Text style={styles.commentTime}>
          {formatDistanceToNow(comment._creationTime, {
            addSuffix: true,
            includeSeconds: true,
          })}
        </Text>
      </View>
      <Text>Comment</Text>
    </View>
  );
}

import { Loader } from "@/components/Loader";
import NoPostsFound from "@/components/NoPostsFound";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/feed.styles";
import { useQuery } from "convex/react";
import { Image } from "expo-image";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function Bookmarks() {
  const bookmarkedPosts = useQuery(api.bookmarks.getBookmarkPosts);

  if (bookmarkedPosts === undefined) return <Loader />;

  if (bookmarkedPosts.length === 0) return <NoPostsFound content="Bookmarks" />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bookmarks</Text>
      </View>

      {/* POSTS */}
      <ScrollView
        contentContainerStyle={{
          padding: 8,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {bookmarkedPosts.length > 0 &&
          bookmarkedPosts.map((post) => (
            <View key={post?._id} style={{ width: "33.3%", padding: 1 }}>
              <Image
                source={{ uri: post?.imageUrl }}
                style={{ width: "100%", aspectRatio: 1 }}
                contentFit="cover"
                transition={200}
                cachePolicy="memory-disk"
              />
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

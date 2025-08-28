import { Loader } from "@/components/Loader";
import NoPostsFound from "@/components/NoPostsFound";
import Notification from "@/components/Notification";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/notifications.styles";
import { useQuery } from "convex/react";
import React from "react";
import { FlatList, Text, View } from "react-native";

export default function notification() {
  const notifications = useQuery(api.notifications.getNotifications);

  if (notification === undefined) return <Loader />;
  if (notification.length === 0)
    return <NoPostsFound content="Notifications" />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>

        <FlatList
          data={notifications}
          renderItem={({ item }) => <Notification notification={item} />}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
}

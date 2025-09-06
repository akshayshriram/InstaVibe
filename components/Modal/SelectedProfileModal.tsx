import { COLORS } from "@/constants/theme";
import { Doc } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/profile.styles";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Modal, TouchableOpacity, View } from "react-native";

export default function SelectedProfileModal({
  selectedPost,
  setSelectedPost,
}: {
  selectedPost: Doc<"posts"> | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Doc<"posts"> | null>>;
}) {
  return (
    <Modal
      visible={!!selectedPost}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setSelectedPost(null)}
    >
      <View style={styles.modalBackdrop}>
        {selectedPost && (
          <View style={styles.postDetailContainer}>
            <View style={styles.postDetailHeader}>
              <TouchableOpacity onPress={() => setSelectedPost(null)}>
                <Ionicons name="close" size={24} color={COLORS.white} />
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: selectedPost.imageUrl }}
              cachePolicy={"memory-disk"}
              style={styles.postDetailImage}
            />
          </View>
        )}
      </View>
    </Modal>
  );
}

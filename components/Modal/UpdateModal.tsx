import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/profile.styles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function EditProfileModal({
  isUpdateModalVisible,
  setIsUpdateModalVisible,
}: {
  isUpdateModalVisible: boolean;
  setIsUpdateModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Modal
      visible={isUpdateModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsUpdateModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>🚀 Coming Soon on InstaVibe</Text>
              <TouchableOpacity onPress={() => setIsUpdateModalVisible(false)}>
                <Ionicons name="close" size={24} color={COLORS.white} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.modalText}>
                🔗 Share Profile Functionality: Let friends connect faster.
              </Text>
              <Text style={styles.modalText}>
                📸 Add Status / Story: Share your moments instantly.
              </Text>
              <Text style={styles.modalText}>
                🔍 Search Feed & Profiles: Find posts and people with ease.
              </Text>
              <Text style={styles.modalText}>
                🎬 Reels / Short Videos: Express yourself with quick clips.
              </Text>
              <Text style={styles.modalText}>
                💬 Direct Messaging (DMs): Chat with your friends privately.
              </Text>
              <Text style={styles.modalText}>
                🔔 Push Notifications: Stay updated with real-time alerts.
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

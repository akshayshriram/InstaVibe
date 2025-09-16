import { COLORS } from '@/constants/theme';
import { styles } from '@/styles/profile.styles';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, Keyboard, KeyboardAvoidingView, Modal, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export default function DeletePostModal({
    isDeletePostModalVisible,
    setIsDeletePostModalVisible,
    handleDelete,
    postImageUrl }: {
        isDeletePostModalVisible: boolean;
        setIsDeletePostModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
        handleDelete: () => void | Promise<void>;
        postImageUrl: string;
    }) {

    const { width } = Dimensions.get("window");
    return (
        <Modal
            visible={isDeletePostModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsDeletePostModalVisible(false)}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.modalContainer}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Delete Post</Text>
                            <TouchableOpacity onPress={() => setIsDeletePostModalVisible(false)}>
                                <Ionicons name="close" size={24} color={COLORS.white} />
                            </TouchableOpacity>
                        </View>
                        <Image
                            source={{ uri: postImageUrl }}
                            style={{ width: width * 0.9, height: 250 }}
                            contentFit="contain"
                            transition={200}
                            cachePolicy={"memory-disk"}
                        />
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleDelete}
                        >
                            <Text style={styles.saveButtonText}>Delete Post</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Modal>
    )
}
import UpdateModal from "@/components/Modal/UpdateModal";
import { STORIES } from "@/constants/mock-data";
import { styles } from "@/styles/feed.styles";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import Story from "./Story";

export default function StoriesSection() {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.storiesContainer}
      >
        {STORIES.map((story) => (
          <Story
            key={story.id}
            story={story}
            setIsUpdateModalVisible={setIsUpdateModalVisible}
          />
        ))}
      </ScrollView>
      <UpdateModal
        isUpdateModalVisible={isUpdateModalVisible}
        setIsUpdateModalVisible={setIsUpdateModalVisible}
      />
    </>
  );
}

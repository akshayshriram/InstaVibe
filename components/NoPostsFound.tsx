import { COLORS } from "@/constants/theme";
import React from "react";
import { Text, View } from "react-native";

interface NoPostsFoundProps {
  content: string;
}

export default function NoPostsFound({ content }: NoPostsFoundProps) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 20, color: COLORS.primary }}>
        No {content} yet
      </Text>
    </View>
  );
}

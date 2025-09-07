import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function UserProfileScreen() {
  const profile = useQuery(api.users.userProfile);

  return (
    <View>
      <Text>n</Text>
    </View>
  );
}

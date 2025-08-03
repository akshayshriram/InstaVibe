import { styles } from "@/styles/auth.styles";
import { Link } from "expo-router";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
      <TouchableOpacity onPress={() => alert("Clicked")}>
        <Text>Click me</Text>
      </TouchableOpacity>
      <Pressable onPress={() => alert("Press me")}>
        <Text>Press me</Text>
      </Pressable>
      <Image
        source={require("@/assets/images/react-logo.png")}
        style={{ width: 100, height: 100 }}
      />
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        style={{ width: 400, height: 400, resizeMode: "contain" }}
      />

      <Link href="/profile">Profile</Link>
      <Link href="/notification">Notification</Link>
    </View>
  );
}

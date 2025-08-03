import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/auth.styles";
import { useSSO } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Login() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });
      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error("ERROR while logging:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Brand Section */}
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/instaVibe.png")}
            style={{ width: 64, height: 64 }}
          />
        </View>
        <Text style={styles.appName}>InstaVibe</Text>
        <Text style={styles.tagline}>Every Snap Has a Vibe.</Text>
      </View>
      {/* Illustration */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require("@/assets/images/InstaVibePoster.png")}
          style={styles.illustration}
          resizeMode="cover"
        />
      </View>
      {/* Login Section */}
      <View style={styles.loginSection}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
          activeOpacity={0.9}
        >
          <View style={styles.googleIconContainer}>
            <Ionicons name="logo-google" size={20} color={COLORS.surface} />
          </View>
          <Text style={styles.googleButtonText}>Contuine with Google</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          By continuing, you agree in our Terms and Privacy Policy
        </Text>
      </View>
    </View>
  );
}

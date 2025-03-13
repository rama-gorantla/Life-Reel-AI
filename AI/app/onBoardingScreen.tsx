import React from "react";
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const OnboardingScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/images/lifereel-bg.jpg")} // Use the same futuristic background
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {/* Image */}
          <Image source={require("../assets/images/on-boarding-image.jpg")} style={styles.image} />
          
          {/* Title */}
          <Text style={styles.title}>LifeReel</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
          Create, share, and explore real-life stories that inspire.
          </Text>

          {/* Login Button */}
          <TouchableOpacity style={styles.primaryButton} onPress={() => router.push("/logIn")}>  
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          
          {/* Signup Text Link */}
          <TouchableOpacity onPress={() => router.push("/signUp")}>
            <Text style={styles.noAccountText}>Don't have an account? <Text style={styles.signupText}>Sign Up</Text></Text>
          </TouchableOpacity>

          {/* Know More Link */}
          <TouchableOpacity onPress={() => router.push("/about")}>  
            <Text style={styles.knowMoreText}>Know More About LifeReel</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    width: "92%",
    maxWidth: 420,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    backgroundColor: "rgba(0, 0, 50, 0.85)", // Slightly darker overlay for better contrast
    borderRadius: 18,
  },
  image: {
    width: 160,
    height: 160,
    marginBottom: 18,
    resizeMode: "contain",
  },
  title: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 18,
  },
  subtitle: {
    color: "#D1ECFF", // Lighter blue for improved readability
    fontSize: 16,
    textAlign: "center",
    marginBottom: 28,
    paddingHorizontal: 18,
    lineHeight: 28,
  },
  primaryButton: {
    backgroundColor: "#007BFF", // Brighter blue for stronger CTA
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
    marginBottom: 18,
    shadowColor: "#1E90FF",
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    color: "#FFFFFF", // White text for strong contrast
    fontSize: 18,
    fontWeight: "bold",
  },
  noAccountText: {
    color: "#ADD8E6", // Light blue text for contrast
    fontSize: 16,
    marginTop: 14,
  },
  signupText: {
    color: "#1E90FF", 
    fontSize: 16,
    fontWeight: "bold",
  },
  knowMoreText: {
    color: "#ADD8E6", // Slightly brighter blue for better visibility
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    textDecorationLine: "underline",
  },
});

export default OnboardingScreen;

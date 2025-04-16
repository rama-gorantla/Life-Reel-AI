import React from "react";
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const AboutScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/images/lifereel-bg.jpg")} // Use the same futuristic background
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {/* Logo Image */}
          <Image source={require("../assets/images/on-boarding-image.jpg")} style={styles.image} />
          
          {/* Title */}
          <Text style={styles.title}>Know More About LifeReel</Text>
          <Text style={styles.subtitle}>
            LifeReel is a platform where you can share your life story, explore others' experiences, and get inspired.
          </Text>

          {/* Features Section */}
          <View style={styles.featuresContainer}>
            <Text style={styles.feature}>✔ Create your life story</Text>
            <Text style={styles.feature}>✔ Discover inspiring stories</Text>
            <Text style={styles.feature}>✔ Connect with like-minded people</Text>
          </View>

          {/* Back Button */}
          <TouchableOpacity style={styles.primaryButton} onPress={() => router.push("/onBoardingScreen")}>  
            <Text style={styles.buttonText}>Go to Home</Text>
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
    color: "#1E90FF", // Deep blue for a sleek modern look
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#D1ECFF", // Lighter blue for improved readability
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  featuresContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  feature: {
    color: "#D1ECFF",
    fontSize: 16,
    marginVertical: 5,
  },
  primaryButton: {
    backgroundColor: "#007BFF", // Brighter blue for stronger CTA
    paddingVertical: 14,
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
});

export default AboutScreen;

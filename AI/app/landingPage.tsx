import React from "react";
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const LandingScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/images/lifereel-bg.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {/* Title */}
          <Text style={styles.title}>LifeReel</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Your Story, Your Legacy - Share your life experiences and inspire the world!
          </Text>

          {/* Video Preview Section */}
          <View style={styles.videoPreviewContainer}>
            <Image source={require("../assets/images/ai.jpg")} style={styles.videoPreview} />
          </View>

          {/* AI Prompt Button */}
          <TouchableOpacity style={styles.aiButton} onPress={() => router.push("/featuresPage")}>  
            <Text style={styles.aiText}>Ask AI to generate your story</Text>
            <View style={styles.generateButton}>
              <Text style={styles.generateText}>Generate</Text>
            </View>
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
    width: "85%",
    height: "75%",
    maxWidth: 400,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    // backgroundColor: "rgba(0, 0, 0, 0.6)", 
    // borderRadius: 12,
    backgroundColor: "rgba(0, 0, 50, 0.5)", // Slightly more transparent
    backdropFilter: "blur(10px)", // Glass effect
    borderRadius: 16,
  },
  title: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  subtitle: {
    color: "#ADD8E6",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24, // More space
    lineHeight: 24, // Improved readability
  },
  videoPreviewContainer: {
    width: "100%",
    maxWidth: 350,
    height: 200,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 40,
  },
  videoPreview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  aiButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A1F44", // Dark blue with futuristic feel
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    width: "100%",
    maxWidth: 350,
    justifyContent: "space-between",
    shadowColor: "#00BFFF", // Neon blue glow effect
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  aiText: {
    color: "#E0F7FA", // Light cyan for contrast
    fontSize: 16,
    flex: 1,
  },
  generateButton: {
    shadowColor: "#00BFFF", // Light blue glow
    shadowOpacity: 0.8,
    shadowRadius: 8,
    backgroundColor: "#1E90FF", // Bright blue gradient feel
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },  
  generateText: {
    color: "#ffffff", // Dark text for contrast on golden button
    fontWeight: "bold",
  },
});

export default LandingScreen;

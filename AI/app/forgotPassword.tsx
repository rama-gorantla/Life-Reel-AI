import React, { useState } from "react";
import { View, Text, TextInput, ImageBackground, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const ForgotPasswordScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = () => {
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setError("");
    setMessage("A password reset link has been sent to your email.");
    // Here, integrate Firebase/Auth API to send a reset email
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/images/lifereel-bg.jpg")} // Use the same futuristic background
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {/* Logo Image */}
          <Image source={require("../assets/images/auth.png")} style={styles.image} />
          
          {/* Title */}
          <Text style={styles.title}>Reset Your Password</Text>
          <Text style={styles.subtitle}>Enter your email to receive a reset link</Text>

          {/* Input Field */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#D1ECFF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Error or Success Message */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {message ? <Text style={styles.successText}>{message}</Text> : null}

          {/* Reset Password Button */}
          <TouchableOpacity style={styles.primaryButton} onPress={handleResetPassword}>  
            <Text style={styles.buttonText}>Send Reset Link</Text>
          </TouchableOpacity>
          
          {/* Back to Login Link */}
          <TouchableOpacity onPress={() => router.push("/logIn")}>  
            <Text style={styles.backToLoginText}>Back to Login</Text>
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
    color: "white", // Deep blue for a sleek modern look
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
  errorText: {
    color: "#FF6347", // Red for visibility
    fontSize: 16,
    marginBottom: 12,
    textAlign: "center",
  },
  successText: {
    color: "#00FF7F", // Green for success message
    fontSize: 16,
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 12,
    color: "#FFFFFF",
    fontSize: 16,
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
  backToLoginText: {
    color: "#ADD8E6", // Light blue text for contrast
    fontSize: 16,
    marginTop: 14,
    textDecorationLine: "underline",
  },
});

export default ForgotPasswordScreen;

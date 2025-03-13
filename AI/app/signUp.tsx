import React, { useState } from "react";
import { View, Text, TextInput, ImageBackground, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const SignupScreen = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = () => {
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError(""); // Clear error on success
    // Here you can integrate Firebase/Auth API
    router.push("/landingPage");
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
          <Text style={styles.title}>Create Your LifeReel</Text>
          <Text style={styles.subtitle}>Join now and start your journey</Text>

          {/* Input Fields */}
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#D1ECFF"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#D1ECFF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#D1ECFF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Error Message (Now placed above the Sign Up button) */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Signup Button */}
          <TouchableOpacity style={styles.primaryButton} onPress={handleSignup}>  
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          
          {/* Login Link */}
          <TouchableOpacity onPress={() => router.push("/logIn")}>  
            <Text style={styles.alreadyAccountText}>Already have an account? <Text style={styles.loginText}>Log In</Text></Text>
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
  alreadyAccountText: {
    color: "#ADD8E6", // Light blue text for contrast
    fontSize: 16,
    marginTop: 14,
  },
  loginText: {
    color: "#1E90FF", // Spring Green for visibility
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SignupScreen;

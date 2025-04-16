import React, { useState } from "react";
import { View, Text, TextInput, ImageBackground, TouchableOpacity, StyleSheet, Dimensions, Image, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"; // Eye icon for password visibility

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Regular Expressions for Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleLogin = () => {
    // if (!email || !password) {
    //   setError("Please enter both email and password.");
    //   return;
    // }
    // if (!emailRegex.test(email)) {
    //   setError("Please enter a valid email.");
    //   return;
    // }
    // if (!passwordRegex.test(password)) {
    //   setError("Password must be at least 8 characters long, including uppercase, lowercase, number, and special character.");
    //   return;
    // }

    // setError("");
    router.push("/landingPage");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ImageBackground
            source={require("../assets/images/lifereel-bg.jpg")}
            style={styles.background}
            resizeMode="cover"
          >
            <View style={styles.overlay}>
              {/* Logo Image */}
              <Image source={require("../assets/images/auth.png")} style={styles.image} />

              {/* Title */}
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Log in to continue your journey</Text>

              {/* Email Input */}
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#D1ECFF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* Password Input with Eye Icon */}
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Password"
                  placeholderTextColor="#D1ECFF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                  <Ionicons
                    name={passwordVisible ? "eye-off" : "eye"}
                    size={22}
                    color="white"
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </View>

              {/* Error Message */}
              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              {/* Login Button */}
              <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Log In</Text>
              </TouchableOpacity>

              {/* Signup & Forgot Password Links */}
              <TouchableOpacity onPress={() => router.push("/signUp")}>
                <Text style={styles.noAccountText}>Don't have an account? <Text style={styles.signupText}>Sign Up</Text></Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/forgotPassword")}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
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
    backgroundColor: "rgba(0, 0, 50, 0.85)",
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
    color: "#D1ECFF",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  errorText: {
    color: "#FF6347",
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 12,
  },
  passwordInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    paddingVertical: 12,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  primaryButton: {
    backgroundColor: "#007BFF",
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
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  noAccountText: {
    color: "#ADD8E6",
    fontSize: 16,
    marginTop: 14,
  },
  signupText: {
    color: "#1E90FF",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPasswordText: {
    color: "#ADD8E6",
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: "underline",
  },
});

export default LoginScreen;

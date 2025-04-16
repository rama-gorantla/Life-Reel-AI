import React from "react";
import { View, Text, TextInput, ImageBackground, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import BottomNavigation from "./bottomNavigations";

const { width, height } = Dimensions.get("window");

const FeaturesScreen = () => {
  const router = useRouter();

  // const navigateToStoryGenerator = () => {
  //   if (Platform.OS === "web") {
  //     router.push("/storyGeneratorWeb");  // Web route
  //   } else {
  //     router.push("/storyGeneratorScreenMobile");      // Native route
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/images/lifereel-bg.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Top Navigation */}
        <View style={styles.topNav}>
        <Image source={{ uri: "https://via.placeholder.com/50" }} style={styles.profileImage} />
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor="#666" />
        </View>

        {/* Features Grid with ScrollView */}
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.featuresGrid}>
          <TouchableOpacity style={[styles.featureBox, { backgroundColor: "#FF4500" }]}  onPress={ ()=> {router.push("/storyGenerator")} }
          > 
              <FontAwesome name="magic" size={32} color="white" />
              <Text style={styles.featureTitle}>AI Story Generator</Text>
              <Text style={styles.featureDesc}>Enter a prompt, get a full story</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.featureBox, { backgroundColor: "#FFA500" }]} onPress={()=> {router.push("/videoGenerator")}}> 
              <FontAwesome name="film" size={32} color="white" />
              <Text style={styles.featureTitle}>AI Video Generator</Text>
              <Text style={styles.featureDesc}>Convert stories into video series (Premium)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.featureBox, { backgroundColor: "#32CD32" }]} onPress={()=> {router.push("/readStories")}} > 
              <FontAwesome name="book" size={32} color="white" />
              <Text style={styles.featureTitle}>Read Stories</Text>
              <Text style={styles.featureDesc}>Discover inspiring stories</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.featureBox, { backgroundColor: "#4682B4" }]} onPress={()=> {router.push("/watchStories")}}> 
              <FontAwesome name="video-camera" size={32} color="white" />
              <Text style={styles.featureTitle}>Watch Stories</Text>
              <Text style={styles.featureDesc}>Explore story videos</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={[styles.featureBox, { backgroundColor: "#8A2BE2" }]}> 
              <FontAwesome name="users" size={32} color="white" />
              <Text style={styles.featureTitle}>Community</Text>
              <Text style={styles.featureDesc}>Join and interact with storytellers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.featureBox, { backgroundColor: "#FF69B4" }]}> 
              <FontAwesome name="comment" size={32} color="white" />
              <Text style={styles.featureTitle}>Engage</Text>
              <Text style={styles.featureDesc}>Comment & discuss stories</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomNavigation></BottomNavigation>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { width: width, height: height, alignItems: "center" },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginTop: 40,
  },
  profileImage: { width: 50, height: 50, borderRadius: 25, backgroundColor: "#ccc", marginRight: 10 },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 10,
    padding: 10,
    marginVertical: 15,
    alignItems: "center",
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: "#333" },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 80,
  },
  featuresGrid: {
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureBox: {
    width: "48%",
    height: 180, // Increased height
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  featureTitle: {
    color: "white",
    fontSize: 16,
    padding: 8,
    fontWeight: "bold",
    marginTop: 8,
  },
  featureDesc: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
});

export default FeaturesScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import BottomNavigation from "./bottomNavigations";

const { width } = Dimensions.get("window");

const FeaturesScreen = () => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showStory, setShowStory] = useState(false);

  const [showFullStory, setShowFullStory] = useState(false);


  const story = {
    title: "A Simple Family Story",
    poster: require("../assets/images/on-boarding-image.jpg"),
    content: [
      "Once upon a time, in a small Australian town, there lived a happy family of five.",
      "They worked from home most of the day, which was much more convenient than city life.",
      "The pandemic had brought them closer, but it also left a heavy impact on their lives.",
      "One day, Mia checked her weekly grocery list and noticed some items on sale due to reduced demand.",
      "She bought fresh ingredients and planned a cozy dinner with her family.",
    ],
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>LifeReel</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="paper-plane-outline" size={24} color="white" style={styles.headerIcon} />
          <Ionicons name="menu-outline" size={28} color="white" />
        </View>
      </View>

      <View style={styles.greetingContainer}>
        <Image source={require("../assets/images/dummyProfile.png")} style={styles.profileImage} />
        <Text style={styles.greetingText}>{getGreeting()}, Rama 👋</Text>
      </View>

     <ScrollView contentContainerStyle={styles.middleContainer}>
  {!showFullStory ? (
    <>
      <Text style={styles.storyTitle}>{story.title}</Text>
      <Image source={story.poster} style={styles.poster} />

      {/* Forward Arrow Button */}
      <TouchableOpacity
        style={styles.forwardButton}
        onPress={() => setShowFullStory(true)}
      >
        <Ionicons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
    </>
  ) : (
    <View style={styles.storyScrollContainer}>
      {story.content.map((para, idx) => (
        <Text key={idx} style={styles.fullStoryText}>
          {para}
        </Text>
      ))}
    </View>
  )}

  {/* Action Buttons (Always Show) */}
  <View style={styles.actionsContainer}>
    <View style={styles.leftActions}>
      <TouchableOpacity onPress={() => setLiked(!liked)}>
        <Ionicons
          name={liked ? "heart" : "heart-outline"}
          size={26}
          color={liked ? "red" : "white"}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="chatbubble-outline" size={24} color="white" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="share-social-outline" size={24} color="white" style={styles.icon} />
      </TouchableOpacity>
    </View>
    <TouchableOpacity onPress={() => setSaved(!saved)}>
      <Ionicons
        name={saved ? "bookmark" : "bookmark-outline"}
        size={24}
        color="white"
        style={styles.icon}
      />
    </TouchableOpacity>
  </View>
</ScrollView>


      <BottomNavigation />
    </SafeAreaView>
  );
};

export default FeaturesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1B1C36" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 12,
    alignItems: "center",
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "cursive",
    color: "#FFF",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 12,
  },
  greetingContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  middleContainer: {
    alignItems: "center",
    padding: 20,
  },
  storyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
  },
  poster: {
    width: width - 40,
    height: 300,
    borderRadius: 12,
    resizeMode: "cover",
  },
  arrowButton: {
    marginTop: 20,
  },
  forwardButton: {
  marginTop: 20,
  backgroundColor: "#1E90FF",
  padding: 12,
  borderRadius: 30,
  alignItems: "center",
  justifyContent: "center",
},

storyScrollContainer: {
  backgroundColor: "#2F3C7E",
  padding: 20,
  borderRadius: 12,
  marginTop: 20,
  width: width - 40,
},

fullStoryText: {
  fontSize: 16,
  color: "#fff",
  lineHeight: 24,
  marginBottom: 16,
},

  page: {
    width: width,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  pageText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 26,
    textAlign: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width - 40,
    marginTop: 16,
  },
  leftActions: {
    flexDirection: "row",
  },
  icon: {
    marginHorizontal: 8,
  },
});

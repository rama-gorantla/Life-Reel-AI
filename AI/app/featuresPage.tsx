import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Share,
  Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import * as Speech from "expo-speech";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import BottomNavigation from "./bottomNavigations";

const { width } = Dimensions.get("window");

const FeaturesScreen = () => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showFullStory, setShowFullStory] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

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

  const fullStoryText = story.content.join(" ");

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const handleTextToSpeech = () => {
    setIsSpeaking(true);
    Speech.speak(fullStoryText, {
      onDone: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
    });
  };

  const stopTextToSpeech = () => {
    Speech.stop();
    setIsSpeaking(false);
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(fullStoryText);
    Alert.alert("Copied", "Story copied to clipboard!");
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: fullStoryText,
      });
    } catch (error) {
      Alert.alert("Error", "Unable to share the story.");
    }
  };

  const handleExportPDF = async () => {
    const htmlContent = `
      <html>
        <body style="font-family: Arial; padding: 20px;">
          <h2>${story.title}</h2>
          ${story.content.map(p => `<p>${p}</p>`).join("")}
        </body>
      </html>
    `;
    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    await Sharing.shareAsync(uri);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>LifeReel</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="paper-plane-outline" size={24} color="white" style={styles.headerIcon} />
          <Ionicons name="menu-outline" size={28} color="white" />
        </View>
      </View>

      {/* Greeting */}
      <View style={styles.greetingContainer}>
        <Image source={require("../assets/images/dummyProfile.png")} style={styles.profileImage} />
        <Text style={styles.greetingText}>{getGreeting()}, Rama 👋</Text>
      </View>

      {/* Main Content */}
     <View style={styles.middleContainer}>
  {!showFullStory ? (
    <>
      <Text style={styles.storyTitle}>{story.title}</Text>
      <Image source={story.poster} style={styles.poster} />
      <TouchableOpacity style={styles.forwardButton} onPress={() => setShowFullStory(true)}>
        <Ionicons name="arrow-forward" size={16} color="white" />
      </TouchableOpacity>
    </>
  ) : (
    <>
      {/* Scrollable story box */}
      <View style={styles.storyBox}>
        <ScrollView showsVerticalScrollIndicator={true}>
          {story.content.map((para, idx) => (
            <Text key={idx} style={styles.fullStoryText}>{para}</Text>
          ))}
        </ScrollView>
      </View>

      {/* Navigation and Speech Controls */}
<View style={styles.storyControls}>
  {/* Back Button - Left */}
  <TouchableOpacity style={styles.backArrow} onPress={() => setShowFullStory(false)}>
    <Ionicons name="arrow-back" size={16} color="#fff" />
  </TouchableOpacity>

  {/* Speech Buttons - Right */}
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
    <TouchableOpacity onPress={handleTextToSpeech}>
      <Ionicons name="volume-high-outline" size={24} color="white" />
    </TouchableOpacity>
    {isSpeaking && (
      <TouchableOpacity onPress={stopTextToSpeech}>
        <Ionicons name="stop-circle-outline" size={24} color="red" />
      </TouchableOpacity>
    )}
  </View>
</View>


      {/* Story utility actions */}
      {/* <View style={styles.storyActions}>
        <TouchableOpacity onPress={handleTextToSpeech}>
          <Ionicons name="volume-high-outline" size={24} color="white" />
        </TouchableOpacity>
        {isSpeaking && (
          <TouchableOpacity onPress={stopTextToSpeech}>
            <Ionicons name="stop-circle-outline" size={24} color="red" />
          </TouchableOpacity>
        )} */}
        {/* <TouchableOpacity onPress={handleCopy}>
          <Ionicons name="copy-outline" size={24} color="white" />
        </TouchableOpacity>
      
        <TouchableOpacity onPress={handleExportPDF}>
          <Ionicons name="document-outline" size={24} color="white" />
        </TouchableOpacity> */}
      {/* </View> */}

      {/* Back Button */}
      {/* <TouchableOpacity onPress={() => setShowFullStory(false)} style={styles.backButton}>
        <Ionicons name="arrow-back" size={22} color="#fff" />
      </TouchableOpacity> */}
    </>
  )}
</View>


      {/* Bottom Action Buttons */}
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
            <TouchableOpacity onPress={handleShare}>
          <Ionicons name="share-social-outline" size={24} color="white" />
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
  storyControls: {
  width: width - 40,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 16,
},

  storyBox: {
  height: 300,
  width: width - 40,
  backgroundColor: "#2F3C7E",
  borderRadius: 12,
  padding: 16,
  marginTop: 20,
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
    flex: 1,
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
  forwardButton: {
    marginTop: 20,
    backgroundColor: "#1E90FF",
    padding: 12,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  backArrow: {
        padding: 12,

    borderRadius: 20,
    backgroundColor: "#1E90FF",
  },
  
  backButton: {
  marginTop: 16,
  alignItems: "center",
  justifyContent: "center",

  },
  storyScrollWrapper: {
    height: 300,
    width: width - 40,
    backgroundColor: "#2F3C7E",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  
  storyScroll: {
    flex: 1,
  },
  fullStoryText: {
    fontSize: 16,
    color: "#fff",
    lineHeight: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  storyActions: {
    flexDirection: "row",
  marginTop: 12,
  justifyContent: "center",
  alignItems: "center",
  gap: 20,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#1B1C36",
  },
  leftActions: {
    flexDirection: "row",
  },
  icon: {
    marginHorizontal: 8,
  },
});

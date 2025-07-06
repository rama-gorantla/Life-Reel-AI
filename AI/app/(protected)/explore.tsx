import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  Animated,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import BottomNavigation from "../bottomNavigations";
import * as Speech from "expo-speech";

const { width } = Dimensions.get("window");

const dummyExploreItems = [
  {
    id: "1",
    type: "story",
    title: "A cute family story",
    image: require("../../assets/images/family.jpg"),
    story:
      "In a world where AI and humans coexist peacefully, a new era of innovation begins. This is a very long story to test scrollable content. Imagine a time where stories expand infinitely with imagination, dreams, adventures and challenges. This should scroll smoothly in the modal popup and also support voice narration with language switching. Repeat this a few times to simulate longer content. Thank you.",
  },
  {
    id: "2",
    type: "video",
    title: "The honey bee",
    image: require("../../assets/images/honeybee.jpg"),
    videoUrl: require("../../assets/images/sampleVideo.mp4"),
  },
  {
    id: "3",
    type: "story",
    title: "True friendship",
    image: require("../../assets/images/friend.jpg"),
    story:
      "A brilliant scientist builds a robot friend, changing the future of companionship forever.",
  },
  {
    id: "4",
    type: "video",
    title: "Amazing AI",
    image: require("../../assets/images/ai.jpg"),
    videoUrl: require("../../assets/images/sampleVideo.mp4"),
  },
   {
    id: "5",
    type: "story",
    title: "True friendship",
    image: require("../../assets/images/friend.jpg"),
    story:
      "A brilliant scientist builds a robot friend, changing the future of companionship forever.",
  },
  {
    id: "6",
    type: "video",
    title: "Amazing AI",
    image: require("../../assets/images/ai.jpg"),
    videoUrl: require("../../assets/images/sampleVideo.mp4"),
  },
];

const ExploreScreen = () => {
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [scaleAnim] = useState(new Animated.Value(1));
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeakToggle = (text: string) => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      Speech.speak(text, {
        language: "en",
        rate: 0.95,
        pitch: 1.0,
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
      });
      setIsSpeaking(true);
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => setSelectedItem(item)}
      onPressIn={() => {
        Animated.spring(scaleAnim, {
          toValue: 1.05,
          useNativeDriver: true,
        }).start();
      }}
      onPressOut={() => {
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      }}
    >
      <Animated.View
        style={[styles.card, { transform: [{ scale: scaleAnim }] }]}
      >
        <Image source={item.image} style={styles.cardImage} />
        {item.type === "video" && (
          <View style={styles.videoOverlay}>
            <Ionicons name="play-circle" size={18} color="white" />
            <Text style={styles.videoText}>Video</Text>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={18}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search stories or videos..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={[...dummyExploreItems].sort(() => 0.5 - Math.random())}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        columnWrapperStyle={styles.gridWrapper}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      />

      <Modal visible={!!selectedItem} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          {selectedItem && (
            <View
              style={[
                styles.modalCard,
                {
                  height: selectedItem.type === "story" ? 500 : 360,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => {
                  Speech.stop();
                  setIsSpeaking(false);
                  setSelectedItem(null);
                }}
              >
                <Ionicons name="close" size={22} color="#000" />
              </TouchableOpacity>

              <Text style={styles.popupTitle}>{selectedItem.title}</Text>

              {selectedItem.type === "video" ? (
                <Video
                  source={selectedItem.videoUrl}
                  style={styles.popupMediaVideo}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  shouldPlay
                />
              ) : (
                <Image
                  source={selectedItem.image}
                  style={styles.popupMediaImage}
                />
              )}

              {selectedItem.type === "story" && (
                <View style={styles.scrollableStoryContainer}>
                  <ScrollView showsVerticalScrollIndicator>
                    <Text style={styles.popupStory}>
                      {selectedItem.story || ""}
                    </Text>
                  </ScrollView>
                </View>
              )}

              <View style={styles.popupActions}>
                {selectedItem.type === "story" && (
                  <TouchableOpacity
                    onPress={() => handleSpeakToggle(selectedItem.story)}
                    style={styles.iconBtn}
                  >
                    <Ionicons
                      name={
                        isSpeaking
                          ? "volume-mute-outline"
                          : "volume-high-outline"
                      }
                      size={24}
                      color="#333"
                    />
                  </TouchableOpacity>
                )}
                <Ionicons name="heart-outline" size={22} color="#000" />
                <Ionicons name="chatbubble-outline" size={22} color="#000" />
                <Ionicons name="share-social-outline" size={22} color="#000" />
              </View>
            </View>
          )}
        </View>
      </Modal>

      <BottomNavigation />
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1123",
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#232640",
    marginHorizontal: 16,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
  },
  gridWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 14,
  },
  gridContainer: {},
  card: {
    width: (width - 48) / 2,
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 16,
    backgroundColor: "#1A1D3D",
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: 160,
    borderRadius: 14,
    resizeMode: "cover",
  },
  videoOverlay: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  videoText: {
    color: "white",
    fontSize: 12,
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalCard: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  popupMediaImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
    resizeMode: "cover",
  },
  popupMediaVideo: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#000",
  },
  scrollableStoryContainer: {
    maxHeight: 200,
    width: "100%",
    marginBottom: 12,
    paddingHorizontal: 6,
  },
  popupStory: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 12,
  },
  popupActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 8,
  },
  iconBtn: {
    paddingHorizontal: 4,
  },
});

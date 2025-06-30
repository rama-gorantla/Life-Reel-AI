import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNavigation from "./bottomNavigations";

const { width } = Dimensions.get("window");

// Dummy data: mix of stories and videos
const dummyExploreItems = [
  { id: "1", type: "story", image: "../assets/images/ai.jpg" },
  { id: "2", type: "video", image: "../assets/images/ai.jpg" },
  { id: "3", type: "story", image: "../assets/images/ai.jpg" },
  { id: "4", type: "video", image: "../assets/images/ai.jpg" },
  { id: "5", type: "story", image: "../assets/images/ai.jpg" },
  { id: "6", type: "video", image: "../assets/images/ai.jpg" },
];

const ExploreScreen = () => {
  const [search, setSearch] = useState("");

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.gridItem} activeOpacity={0.8}>
      <Image source={{ uri: item.image }} style={styles.image} />
      {item.type === "video" && (
        <Ionicons name="play-circle" size={28} color="white" style={styles.playIcon} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search stories or videos..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Grid layout */}
      <FlatList
        data={dummyExploreItems}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        columnWrapperStyle={styles.gridWrapper}
        contentContainerStyle={styles.bottomSpacing}
        showsVerticalScrollIndicator={false}
      />

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
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: "center",
    marginBottom: 12,
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
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  gridItem: {
    width: (width - 48) / 2,
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  playIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 2,
  },
  bottomSpacing: {
    paddingBottom: 80,
  },
});

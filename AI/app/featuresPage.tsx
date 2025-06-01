// import React from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   ImageBackground,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   Image,
//   ScrollView,
//   Platform,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { FontAwesome, Ionicons } from "@expo/vector-icons";
// import BottomNavigation from "./bottomNavigations";

// const { width, height } = Dimensions.get("window");

// const FeaturesScreen = () => {
//   const router = useRouter();

//   return (
//     <SafeAreaView style={styles.container}>
//       <ImageBackground
//         source={require("../assets/images/lifereel-bg.jpg")}
//         style={styles.background}
//         resizeMode="cover"
//       >
//         {/* Background overlay */}
//         <View style={styles.overlay} />

//         {/* Top Navigation */}
//         <View style={styles.topNav}>
//           <Image
//             source={{ uri: "https://via.placeholder.com/50" }}
//             style={styles.profileImage}
//           />
//           <TouchableOpacity>
//             <Ionicons name="notifications-outline" size={28} color="#FFFFFF" />
//           </TouchableOpacity>
//         </View>

//         {/* Greeting */}
//         <View style={styles.greetingContainer}>
//           <Text style={styles.greetingText}>Hi👋, ready to explore stories?</Text>
//         </View>

//         {/* Search Bar */}
//         <View style={styles.searchContainer}>
//           <FontAwesome
//             name="search"
//             size={20}
//             color="#666"
//             style={styles.searchIcon}
//           />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search"
//             placeholderTextColor="#666"
//           />
//         </View>

//         {/* Features Grid with ScrollView */}
//         <ScrollView
//           contentContainerStyle={styles.scrollView}
//           showsVerticalScrollIndicator={false}
//         >
//           <View style={styles.featuresGrid}>
//             <TouchableOpacity
//               style={[styles.featureBox, { backgroundColor: "#FF4500" }]}
//               onPress={() => {
//                 router.push("/storyGenerator");
//               }}
//               activeOpacity={0.85}
//             >
//               <FontAwesome name="magic" size={32} color="white" />
//               <Text style={styles.featureTitle}>AI Story Generator</Text>
//               <Text style={styles.featureDesc}>Enter a prompt, get a full story</Text>
//               <View style={styles.badgeFree}>
//                 <Text style={styles.badgeText}>Free</Text>
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.featureBox, { backgroundColor: "#FFA500" }]}
//               onPress={() => {
//                 router.push("/videoGenerator");
//               }}
//               activeOpacity={0.85}
//             >
//               <FontAwesome name="film" size={32} color="white" />
//               <Text style={styles.featureTitle}>AI Video Generator</Text>
//               <Text style={styles.featureDesc}>Convert stories into video series</Text>
//               <View style={styles.badgePremium}>
//                 <Text style={styles.badgeText}>Premium</Text>
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.featureBox, { backgroundColor: "#32CD32" }]}
//               onPress={() => {
//                 router.push("/readStories");
//               }}
//               activeOpacity={0.85}
//             >
//               <FontAwesome name="book" size={32} color="white" />
//               <Text style={styles.featureTitle}>Read Stories</Text>
//               <Text style={styles.featureDesc}>Discover inspiring stories</Text>
//               <View style={styles.badgeFree}>
//                 <Text style={styles.badgeText}>Free</Text>
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.featureBox, { backgroundColor: "#4682B4" }]}
//               onPress={() => {
//                 router.push("/watchStories");
//               }}
//               activeOpacity={0.85}
//             >
//               <FontAwesome name="video-camera" size={32} color="white" />
//               <Text style={styles.featureTitle}>Watch Stories</Text>
//               <Text style={styles.featureDesc}>Explore story videos</Text>
//               <View style={styles.badgeFree}>
//                 <Text style={styles.badgeText}>Free</Text>
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.featureBox, { backgroundColor: "#8A2BE2" }]}
//               activeOpacity={0.85}
//             >
//               <FontAwesome name="users" size={32} color="white" />
//               <Text style={styles.featureTitle}>Community</Text>
//               <Text style={styles.featureDesc}>Join and interact with storytellers</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.featureBox, { backgroundColor: "#FF69B4" }]}
//               activeOpacity={0.85}
//             >
//               <FontAwesome name="comment" size={32} color="white" />
//               <Text style={styles.featureTitle}>Engage</Text>
//               <Text style={styles.featureDesc}>Comment & discuss stories</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>

//         {/* Bottom Navigation */}
//         <BottomNavigation />
//       </ImageBackground>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   background: {
//     width: width,
//     height: height,
//     alignItems: "center",
//     justifyContent: "flex-start",
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0, 0, 0, 0.3)",
//   },
//   topNav: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: "90%",
//     marginTop: 40,
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "#ccc",
//     marginRight: 10,
//   },
//   greetingContainer: {
//     width: "90%",
//     marginTop: 10,
//   },
//   greetingText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   searchContainer: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     width: "90%",
//     borderRadius: 10,
//     padding: 10,
//     marginVertical: 15,
//     alignItems: "center",
//   },
//   searchIcon: { marginRight: 10 },
//   searchInput: { flex: 1, fontSize: 16, color: "#333" },
//   scrollView: {
//     flexGrow: 1,
//     alignItems: "center",
//     paddingBottom: 80,
//   },
//   featuresGrid: {
//     width: "90%",
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   featureBox: {
//     width: "48%",
//     height: 180,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     marginVertical: 8,
//     position: "relative",
//   },
//   featureTitle: {
//     color: "white",
//     fontSize: 16,
//     padding: 8,
//     fontWeight: "bold",
//     marginTop: 8,
//     textAlign: "center",
//   },
//   featureDesc: {
//     color: "white",
//     fontSize: 12,
//     textAlign: "center",
//   },
//   badgeFree: {
//     position: "absolute",
//     top: 10,
//     right: 10,
//     backgroundColor: "#00FF99",
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 5,
//   },
//   badgePremium: {
//     position: "absolute",
//     top: 10,
//     right: 10,
//     backgroundColor: "#FF1493",
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 5,
//   },
//   badgeText: {
//     color: "white",
//     fontSize: 10,
//     fontWeight: "bold",
//   },
// });

// export default FeaturesScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import BottomNavigation from "./bottomNavigations";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const FeaturesScreen = () => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);


  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>LifeReel</Text>
        <View style={styles.headerIcons}>
          <Ionicons
            name="paper-plane-outline"
            size={24}
            color="black"
            style={styles.headerIcon}
          />
          <Ionicons name="menu-outline" size={28} color="black" />
        </View>
        
      </View>

      {/* User Greeting */}
      <View style={styles.greetingContainer}>
        <Image source={require("../assets/images/dummyProfile.png")} style={styles.profileImage} />
        <Text style={styles.greetingText}>{getGreeting()}, Rama 👋</Text>
      </View>

      {/* Middle Content */}
      <ScrollView contentContainerStyle={styles.middleContainer}>
        <Image
          source={require("../assets/images/on-boarding-image.jpg")}
          style={styles.poster}
        />
        <TouchableOpacity style={styles.sliderButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="white" />
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <View style={styles.leftActions}>
            <TouchableOpacity onPress={() => setLiked(!liked)}>
              <Ionicons
                name={liked ? "heart" : "heart-outline"}
                size={26}
                color={liked ? "red" : "black"}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name="chatbubble-outline"
                size={24}
                color="black"
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name="share-social-outline"
                size={24}
                color="black"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setSaved(!saved)}>
            <Ionicons
              name={saved ? "bookmark" : "bookmark-outline"}
              size={24}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View>
        <BottomNavigation />
      </View>
    </SafeAreaView>
  );
};

export default FeaturesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 12,
    alignItems: "center",
  },
  logo: { fontSize: 28, fontWeight: "bold", fontFamily: "cursive" },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 12,
  },

  storiesContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingLeft: 12,
  },
  storyItem: {
    marginRight: 12,
    alignItems: "center",
  },
  storyImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#FF4081",
  },
  storyName: {
    marginTop: 6,
    fontSize: 12,
    color: "#444",
  },

  middleContainer: {
    alignItems: "center",
    padding: 20,
  },
  poster: {
    width: width - 40,
    height: 300,
    borderRadius: 12,
    resizeMode: "cover",
  },
  sliderButton: {
    position: "absolute",
    right: 30,
    top: 150,
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 30,
    elevation: 5,
  },

  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width - 40,
    marginTop: 10,
  },
  leftActions: {
    flexDirection: "row",
  },
  icon: {
    marginHorizontal: 8,
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
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
    color: "#333",
  },
});

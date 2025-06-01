// import React from "react";
// import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter, usePathname } from "expo-router";


// type IonIconName = "home" | "heart" | "person-outline";

// type TabItem = {
//   name: string;
//   icon: IonIconName;
//   route: string;
// };

// const BottomNavigation = () => {
//   const router = useRouter();
//   const pathname = usePathname();

//   const tabs: TabItem[] = [
//     { name: "Home", icon: "home", route: "/featuresPage" },
//     { name: "Favorites", icon: "heart", route: "/featuresPage" },
//     { name: "Profile", icon: "person-outline", route: "/featuresPage" },
//   ];

//   return (
//     <View style={styles.bottomNav}>
//       {tabs.map((tab, index) => {
//         const isActive = pathname === tab.route;
//         return (
//           <TouchableOpacity
//             key={index}
//             style={styles.tab}
//             onPress={() => router.push(tab.route as any)}
//             activeOpacity={0.8} >
//            <Ionicons
//               name={tab.icon}
//               size={24}
//               color={isActive ? "#FF69B4" : "#FFFFFF"}
//             />
//             <Text style={[styles.tabLabel, isActive && styles.activeLabel]}>
//               {tab.name}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   bottomNav: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     paddingVertical: 10,
//     backgroundColor: "#1E102F",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     elevation: 10,
//   },
//   tab: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   tabLabel: {
//     fontSize: 12,
//     color: "#FFFFFF",
//     marginTop: 2,
//   },
//   activeLabel: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });

// export default BottomNavigation;

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname, type Route } from "expo-router";

const navItems: {
  icon: string;
  label: string;
  route: Route;
}[] = [
  { icon: "home-outline", label: "Home", route: "/featuresPage" },
  { icon: "create-outline", label: "Story Gen", route: "/storyGenerator" },
  { icon: "videocam-outline", label: "Video Gen", route: "/videoGenerator" },
  { icon: "book-outline", label: "Read", route: "/readStories" },
  { icon: "tv-outline", label: "Watch", route: "/watchStories" },
];

const BottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.bottomNav}>
      {navItems.map((item) => {
        const isActive = pathname === item.route;
        return (
          <TouchableOpacity
            key={item.label}
            onPress={() => router.push(item.route)}
            style={styles.navItem}
          >
            <Ionicons
              name={item.icon as any}
              size={24}
              color={isActive ? "#1E90FF" : "#999"}
            />
            <Text style={[styles.navLabel, isActive && { color: "#1E90FF" }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  navItem: { alignItems: "center" },
  navLabel: { fontSize: 10, marginTop: 2, color: "#333" },
});

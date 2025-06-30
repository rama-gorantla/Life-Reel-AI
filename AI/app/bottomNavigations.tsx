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
  { icon: "search-outline", label: "Explore", route: "/explore" },
  { icon: "person-outline", label: "Profile", route: "/profile" },
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
  },
  navItem: {
    alignItems: "center",
  },
  navLabel: {
    fontSize: 10,
    marginTop: 2,
    color: "#fff",
  },
});

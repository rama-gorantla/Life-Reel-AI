import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BottomNavigation = () => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity><Ionicons name="home" size={24} color="white" /></TouchableOpacity>
      <TouchableOpacity><Ionicons name="heart" size={24} color="white" /></TouchableOpacity>
      {/* <TouchableOpacity><Ionicons name="eye" size={24} color="white" /></TouchableOpacity> */}
      <TouchableOpacity><Ionicons name="person-outline" size={24} color="white" /></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#1E102F",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default BottomNavigation;

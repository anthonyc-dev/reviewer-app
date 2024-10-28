import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";

const CoolHeader = () => {
  return (
    <View style={styles.headerContainer}>
      {/* <TouchableOpacity style={styles.iconContainer}>
        <Icon name="menu-outline" size={28} color="#fff" />
      </TouchableOpacity> */}
      <Text style={styles.headerText}>Home</Text>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="person-circle-outline" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.secondary, // Cool blue background
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10, // Rounded corners for a modern look
    marginHorizontal: 10,
    marginTop: 30,
    shadowColor: "#000", // Shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Shadow for Android
  },
  headerText: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "outfit-bold",
  },
  iconContainer: {
    padding: 5,
  },
});

export default CoolHeader;

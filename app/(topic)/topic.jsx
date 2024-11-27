import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons
import { Colors } from "../../constants/Colors";

const categories = [
  {
    id: "1",
    title: "Video Lectures",
    icon: "videocam-outline",
  },
  {
    id: "2",
    title: "Review Materials",
    icon: "book-outline",
  },
  {
    id: "4",
    title: "Pre Test",
    icon: "document-text-outline",
  },
  {
    id: "5",
    title: "Post Test",
    icon: "document-text-outline",
  },
  {
    id: "6",
    title: "Evaluation Exam",
    icon: "checkmark-done-outline",
  },
];

const Topic = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.pickerButton}>
      <Ionicons
        name={item.icon} // Use icon name from the categories array
        size={24}
        color={Colors.primary}
        style={styles.icon}
      />
      <Text style={styles.categoryText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Review materials</Text>
      <Text style={styles.subtitle}>
        Navigate Through Key Areas of Study – Empower Your Knowledge
      </Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Topic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f4f8",
  },
  header: {
    fontSize: 28,
    fontFamily: "outfit-bold",
    // marginBottom: 20,
    textAlign: "center",
    color: Colors.primary,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 2, // Android shadow
  },
  icon: {
    marginRight: 15, // Space between icon and text
  },
  categoryText: {
    fontSize: 18,
    color: "#333",
    fontFamily: "outfit",
  },
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: "#fff",
  },
  subtitle: {
    fontFamily: "outfit",
    color: "gray",
    marginBottom: 20,
    paddingHorizontal: 20,
    textAlign: "center",
  },
});

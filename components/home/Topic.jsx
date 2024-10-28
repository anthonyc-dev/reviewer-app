import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Colors } from "../../constants/Colors";

const topics = [
  { id: "1", img: require("../../assets/images/1.jpg") },
  { id: "2", img: require("../../assets/images/2.jpg") },
  { id: "3", img: require("../../assets/images/3.jpg") },
  { id: "4", img: require("../../assets/images/4.jpg") },
  { id: "5", img: require("../../assets/images/5.jpg") },
  { id: "6", img: require("../../assets/images/6.jpg") },
];

const TopicList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>#Review materials</Text>
      </View>

      {/* Using View and map to render topics in a grid layout */}
      <View style={styles.gridContainer}>
        {topics.map((topic) => (
          <TouchableOpacity key={topic.id} style={styles.topicItem}>
            <Image source={topic.img} style={styles.topicImage} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default TopicList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingRight: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 10,
    marginBottom: 5,
  },
  headerText: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    paddingLeft: 20,
  },
  viewAllText: {
    color: Colors.secondary,
  },
  gridContainer: {
    flexDirection: "row", // Arrange items in a row
    flexWrap: "wrap", // Allow wrapping to the next line
    justifyContent: "space-between", // Space between items
    paddingHorizontal: 15,
  },
  topicItem: {
    width: "48%", // Each item takes up almost half the width
    marginBottom: 20,
    borderRadius: 10,
    alignItems: "center", // Center items horizontally
    justifyContent: "center", // Center items vertically
    overflow: "hidden", // Ensures the image doesn't overflow the rounded corners
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 2, // Android shadow
  },
  topicImage: {
    width: "100%", // Take full width of the parent container
    height: 150, // Set a height for the image
    resizeMode: "contain", // Show the entire image within the container
  },
});

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { db } from "../../FirebaseConfig"; // Ensure the path to FirebaseConfig is correct
import { collection, onSnapshot } from "firebase/firestore"; // Import Firestore snapshot method

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch materials data in real-time from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "materials"),
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTopics(data); // Update the topics state with fetched data
        setLoading(false); // Set loading to false once the data is fetched
      },
      (error) => {
        console.error("Error fetching materials:", error);
        setLoading(false); // Handle errors and stop loading
      }
    );

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  // If data is still loading, show an activity indicator
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>#Review Materials</Text>
      </View>

      {/* Display topics in a grid layout */}
      <View style={styles.gridContainer}>
        {topics.map((topic) => (
          <TouchableOpacity key={topic.id} style={styles.topicItem}>
            {/* Assuming the `imageUrl` field contains the image URL */}
            <Image source={{ uri: topic.imageUrl }} style={styles.topicImage} />
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
    resizeMode: "cover", // Use cover to ensure the image fills the container
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

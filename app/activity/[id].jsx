import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import { db } from "../../FirebaseConfig"; // Correct import
import { collection, getDocs, query, where } from "firebase/firestore";

const Topic = () => {
  const { id } = useLocalSearchParams(); // Get the id from params
  const [materials, setMaterials] = useState(null);

  console.log(id);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        // Query Firestore collection where title matches the id
        const materialsQuery = query(
          collection(db, "materials"), // Correct way to query Firestore collection
          where("title", "==", id) // Ensure you're matching the correct field
        );
        const querySnapshot = await getDocs(materialsQuery);

        querySnapshot.forEach((doc) => {
          setMaterials(doc.data()); // Set the materials data from the document
        });
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchMaterials();
  }, [id]);

  if (!materials) {
    return <Text>Loading...</Text>; // Display loading while data is being fetched
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Review materials</Text>
      <Text style={styles.subtitle}>
        Navigate Through Key Areas of Study – Empower Your Knowledge
      </Text>

      {/* Review Materials Button */}
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => {
          // Pass all data as parameters to the videoUrl page
          router.push({
            pathname: "/pdfUrl/[id]",
            params: { id, materials }, // Pass materials as a parameter
          });
        }}
      >
        <Ionicons
          name={"book-outline"}
          size={24}
          color={Colors.primary}
          style={styles.icon}
        />
        <Text style={styles.categoryText}>Review Materials</Text>
      </TouchableOpacity>

      {/* Video Lectures Button */}
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => {
          // Pass all data as parameters to the videoUrl page
          router.push({
            pathname: "/videoUrl/[id]",
            params: { id, materials }, // Pass materials as a parameter
          });
        }}
      >
        <Ionicons
          name={"videocam-outline"}
          size={24}
          color={Colors.primary}
          style={styles.icon}
        />
        <Text style={styles.categoryText}>Video Lectures</Text>
      </TouchableOpacity>

      {/* Pre Test Button */}
      <TouchableOpacity style={styles.pickerButton}>
        <Ionicons
          name={"document-text-outline"}
          size={24}
          color={Colors.primary}
          style={styles.icon}
        />
        <Text style={styles.categoryText}>Pre Test</Text>
      </TouchableOpacity>
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
    textAlign: "center",
    color: Colors.primary,
  },
  subtitle: {
    fontFamily: "outfit",
    color: "gray",
    marginBottom: 20,
    paddingHorizontal: 20,
    textAlign: "center",
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
  icon: {
    marginRight: 15, // Space between icon and text
  },
  categoryText: {
    fontSize: 18,
    color: "#333",
    fontFamily: "outfit",
  },
});

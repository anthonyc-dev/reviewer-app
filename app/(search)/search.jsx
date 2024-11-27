import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import { Colors } from "../../constants/Colors"; // Ensure Colors is defined
import { useRouter } from "expo-router";
import { Searchbar } from "react-native-paper";
import { db } from "../../FirebaseConfig";
import { onSnapshot, collection } from "firebase/firestore";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [materials, setMaterials] = useState([]);
  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Set up Firestore listener to fetch data from the "materials" collection
    const unsubscribe = onSnapshot(
      collection(db, "materials"),
      (snapshot) => {
        const fetchedMaterials = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMaterials(fetchedMaterials);
      },
      (error) => {
        console.error("Error fetching materials:", error);
      }
    );

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  // Filter the fetched materials based on the search term
  const filteredData = materials.filter(
    (item) =>
      item.title && // Check if item.name is defined
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchTerm}
        value={searchTerm}
        iconColor={Colors.primary}
        style={{
          marginTop: 10,
          fontFamily: "outfit",
        }}
      />

      {/* Render filtered results */}
      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => {
                router.push({
                  pathname: "/subject/[id]", // New edit screen path
                  params: {
                    id: item.id,
                    category: item.category,
                    title: item.title,
                    imageUrl: item.imageUrl,
                    videoUrls: item.videoUrls,
                    pdfUrls: item.pdfUrls,
                  },
                });
              }}
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.resultImage}
              />
              <Text style={styles.resultText}>{item.title}</Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          style={styles.resultList}
        />
      ) : (
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Not Found.</Text>
        </View>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#f8f9fa",
  },
  resultList: {
    marginTop: 10,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
  },
  resultImage: {
    width: 50,
    height: 50,
    marginRight: 15,
    resizeMode: "cover",
  },
  resultText: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "outfit",
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontFamily: "outfit",
  },
});

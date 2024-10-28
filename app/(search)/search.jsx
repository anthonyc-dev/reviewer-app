import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import { Colors } from "../../constants/Colors"; // Ensure Colors is defined
import { Link } from "expo-router";
import { useRouter } from "expo-router";

const sampleData = [
  {
    name: "Criminal Law and Jurisprudence",
    image: require("../../assets/images/1.jpg"),
  },
  {
    name: "Law Enforcement Administration",
    image: require("../../assets/images/2.jpg"),
  },
  {
    name: "Crime Detection and Investigation",
    image: require("../../assets/images/3.jpg"),
  },
  { name: "Forensic Science", image: require("../../assets/images/4.jpg") },
  { name: "Criminology", image: require("../../assets/images/5.jpg") },
  { name: "Correction", image: require("../../assets/images/6.jpg") },
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  // Filter the sample data based on the search term
  const filteredData = sampleData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={24} color={Colors.primary} />
        <TextInput
          placeholder="Search..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={styles.searchInput}
        />
      </View>

      {/* Render filtered results */}
      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => router.push("/topicList")}
            >
              <Image source={item.image} style={styles.resultImage} />
              <Text style={styles.resultText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          style={styles.resultList}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "outfit",
            }}
          >
            Not Found.
          </Text>
        </View>
      )}
      <StatusBar style="auto" />
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
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    width: "100%",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 2, // Android shadow
  },
  searchInput: {
    flex: 1,
    fontFamily: "outfit",
    fontSize: 16,
    marginLeft: 10, // Space between icon and input
    outlineStyle: "none", // For web use
  },
  resultList: {
    marginTop: 10,
  },
  resultItem: {
    flexDirection: "row", // Align items in a row
    alignItems: "center", // Center align items vertically
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8, // Add rounded corners
    marginBottom: 10, // Space between items
    elevation: 1, // Add shadow effect
  },
  resultImage: {
    width: 50, // Keep the size of the image
    height: 50,
    marginRight: 15, // Space between image and text
    resizeMode: "cover", // Ensure image covers the space
  },
  resultText: {
    fontSize: 16,
    fontWeight: "500", // Bold text for better visibility
    fontFamily: "outfit",
  },
});

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { Link, router, useLocalSearchParams, useNavigation } from "expo-router";
import { db } from "../../FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const TopicLists = () => {
  const [material, setMaterial] = useState([]); // Material data state, set as array for FlatList
  const { category } = useLocalSearchParams(); // Retrieve title from params

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: material.length > 0 ? material[0].title : "Loading...",
      headerStyle: {
        backgroundColor: Colors.secondary,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontFamily: "outfit-bold",
      },
    });
  }, [navigation, material]);

  useEffect(() => {
    const fetchMaterialData = async () => {
      try {
        const materialsQuery = query(
          collection(db, "materials"),
          where("category", "==", category)
        );

        const querySnapshot = await getDocs(materialsQuery);
        const materialData = querySnapshot.docs.map((doc) => doc.data());

        if (materialData.length > 0) {
          setMaterial(materialData);
        } else {
          Alert.alert("Error", "Material not found.");
        }
      } catch (error) {
        console.error("Error fetching material: ", error);
        Alert.alert("Error", "Failed to fetch material data.");
      }
    };

    fetchMaterialData();
  }, [category]);

  const renderItem = ({ item, index }) => (
    <View>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => {
          router.push({
            pathname: `/activity/${item.title}`, // New edit screen path
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
        <View style={styles.categoryContent}>
          <View
            style={{
              backgroundColor: Colors.primary,
              width: 30,
              height: 30,
              borderRadius: 99,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontFamily: "outfit",
                fontSize: 15,
                textAlign: "center",
              }}
            >
              {index + 1}
            </Text>
          </View>
          <Text style={styles.categoryText}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Topic List</Text>
      <Text style={styles.subtitle}>
        Discover Essential Topics and Enhance Your Learning Journey
      </Text>
      {material.length > 0 ? (
        <FlatList
          data={material}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
    </View>
  );
};

export default TopicLists;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f4f8",
  },
  header: {
    fontSize: 30,
    fontFamily: "outfit-bold",
    textAlign: "center",
    color: Colors.primary,
    letterSpacing: 1,
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
  categoryContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  categoryText: {
    fontSize: 18,
    color: "#4a4a4a",
    fontFamily: "outfit",
  },
  subtitle: {
    fontFamily: "outfit",
    color: "gray",
    marginBottom: 20,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 18,
    color: "gray",
    marginTop: 20,
  },
});

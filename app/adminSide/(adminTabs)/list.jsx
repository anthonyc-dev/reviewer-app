import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { db } from "../../../FirebaseConfig";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { TouchableOpacity } from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { SegmentedButtons } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons

const List = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Admin",
      headerStyle: {
        backgroundColor: Colors.secondary,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontFamily: "outfit-bold",
      },
    });
  }, []);

  useEffect(() => {
    const materialsCollection = collection(db, "materials");

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      materialsCollection,
      (snapshot) => {
        const materialsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMaterials(materialsList);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching materials: ", error);
        setLoading(false);
      }
    );

    // Clean up listener on component unmount
    return () => unsubscribe();
  }, []);

  const deletecon = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this material?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "materials", id));
              Alert.alert("Info", "Material deleted successfully.");
              setMaterials((prevMaterials) =>
                prevMaterials.filter((material) => material.id !== id)
              );
            } catch (error) {
              Alert.alert(
                "Error",
                "Failed to delete material. Please try again."
              );
              console.error("Error deleting material:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity style={styles.resultItem}>
        <View
          style={{
            flexDirection: "row", // Align items in a row
            alignItems: "center", // Center align items vertically
          }}
        >
          <Image source={{ uri: item.imageUrl }} style={styles.resultImage} />
          <Text style={styles.resultText}>{item.category}</Text>
        </View>

        {/* Edit and Delete Icons */}
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/adminSide/subjectList/[id]", // New edit screen path
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
            <Ionicons
              name="pencil"
              size={24}
              color="#6200ee"
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => deletecon(item.id)}>
            <Ionicons
              name="trash"
              size={24}
              color="#f44336"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#6200ee" style={styles.loading} />
    );
  }

  return (
    <>
      <FlatList
        data={materials}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </>
  );
};

export default List;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6200ee",
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
  },
  resultList: {
    marginTop: 10,
  },
  resultItem: {
    flexDirection: "row", // Align items in a row
    alignItems: "center", // Center align items vertically
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8, // Add rounded corners
    marginBottom: 10, // Space between items
    elevation: 1, // Add shadow effect
  },
  resultImage: {
    width: 50,
    height: 50,
    marginRight: 15,
    resizeMode: "cover",
  },
  resultText: {
    fontSize: 16,
    fontWeight: "500", // Bold text for better visibility
    fontFamily: "outfit",
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 10,
  },
});

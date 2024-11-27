import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { db } from "../../../FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Colors } from "../../../constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";

const SubjectList = () => {
  const { title } = useLocalSearchParams(); // Get the title parameter from the route
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const materialsQuery = query(
          collection(db, "materials"),
          where("title", "==", title)
        );
        const querySnapshot = await getDocs(materialsQuery);

        const fetchedMaterials = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMaterials(fetchedMaterials);
      } catch (error) {
        console.error("Error fetching materials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [title]);

  if (loading) return <Text style={styles.loadingText}>Loading...</Text>;

  return (
    <>
      <View style={styles.container}>
        {/* Custom Header */}
        {/* <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </View> */}
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: Colors.secondary,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontFamily: "outfit-bold",
            },
            headerShown: true,
            headerBackVisible: true,
            title: title,
            headerLeft: () => {
              <AntDesign name="arrowleft" size={24} color="black" />;
            },
          }}
        />

        {/* Material List */}
        <FlatList
          data={materials}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.materialItem}
              onPress={() => {
                router.push({
                  pathname: "/adminSide/edit/[id]", // New edit screen path
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
              <Text style={styles.materialTitle}>{item.title}</Text>
              <Text style={styles.materialCategory}>{item.category}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text style={styles.noMaterials}>
              No materials found with this title.
            </Text>
          }
        />
      </View>
    </>
  );
};

export default SubjectList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 18,
    color: "#6200EE", // Optional: Match your app's primary color
    marginTop: "50%",
  },
  header: {
    backgroundColor: Colors.secondary, // Secondary color
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  headerText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  materialItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  materialTitle: {
    fontSize: 18,
    color: "#333",
    fontFamily: "outfit-bold",
  },
  materialCategory: {
    fontSize: 14,
    color: "#666",
    fontFamily: "outfit",
  },
  noMaterials: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 20,
  },
});

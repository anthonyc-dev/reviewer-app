import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router"; // Get params
import { db } from "../../../FirebaseConfig"; // Firebase config
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EditMaterials = () => {
  const { id } = useLocalSearchParams(); // Retrieve id from params
  const [material, setMaterial] = useState(null); // Material data state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Fetch the current material data from Firestore
    const fetchMaterialData = async () => {
      try {
        const docRef = doc(db, "materials", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setMaterial(data); // Set material data to state
          setTitle(data.title);
          setCategory(data.category);
          setImageUrl(data.imageUrl);
        } else {
          Alert.alert("Error", "Material not found.");
        }
      } catch (error) {
        console.error("Error fetching material: ", error);
        Alert.alert("Error", "Failed to fetch material data.");
      }
    };

    fetchMaterialData();
  }, [id]);

  const handleUpdate = async () => {
    if (!title || !category || !imageUrl) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      const docRef = doc(db, "materials", id);
      await updateDoc(docRef, {
        title,
        category,
        imageUrl,
      });

      Alert.alert("Success", "Material updated successfully.");
    } catch (error) {
      console.error("Error updating material: ", error);
      Alert.alert("Error", "Failed to update material.");
    }
  };

  // If data is not loaded yet
  if (!material) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Material</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
      />

      <Button title="Update Material" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
  },
});

export default EditMaterials;

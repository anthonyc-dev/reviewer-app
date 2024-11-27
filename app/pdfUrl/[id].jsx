import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { db } from "../../FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import * as WebBrowser from "expo-web-browser"; // Import expo-web-browser

const PdfUrl = () => {
  const { id } = useLocalSearchParams();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const materialsQuery = query(
          collection(db, "materials"),
          where("title", "==", id)
        );
        const querySnapshot = await getDocs(materialsQuery);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const materialData = doc.data();
            setPdfUrl(materialData.pdfUrls);
          });
        } else {
          console.log("No matching documents found");
        }
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterial();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!pdfUrl) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No PDF URL available</Text>
      </View>
    );
  }

  const openPdfInBrowser = async () => {
    await WebBrowser.openBrowserAsync(pdfUrl);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>PDF Document</Text>
      <Button title="View PDF" onPress={openPdfInBrowser} />
    </View>
  );
};

export default PdfUrl;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

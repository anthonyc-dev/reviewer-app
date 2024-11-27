import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import * as DocumentPicker from "expo-document-picker";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import Material Icons
import Toast from "react-native-toast-message";

const AddTopic = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]); // Array for multiple videos
  const [pdfs, setPdfs] = useState(null); // Array for multiple PDFs

  const navigation = useNavigation();

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

  // Select Image
  const onImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result?.assets[0]?.uri);
    }
  };

  // Select Video (allows multiple)
  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setVideos((prevVideos) => [...prevVideos, result?.assets[0]?.uri]);
    }
  };

  // Select PDF
  const pickPdf = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });

    if (!result.canceled) {
      setPdfs(result?.assets[0]?.uri);
    }
  };

  // Upload image, multiple videos, and multiple PDFs, then save data to Firestore
  const onAddNewTopics = async () => {
    setLoading(true);
    try {
      let imageUrl = null;
      const videoUrls = [];
      let pdfUrls = null;

      // Upload Image
      if (image) {
        const imageFileName = Date.now().toString() + "_image.jpg";
        const imageResp = await fetch(image);
        const imageBlob = await imageResp.blob();
        const imageRef = ref(storage, "topics-app/" + imageFileName);
        await uploadBytes(imageRef, imageBlob);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Upload Videos
      for (let video of videos) {
        const videoFileName = Date.now().toString() + "_video.mp4";
        const videoResp = await fetch(video);
        const videoBlob = await videoResp.blob();
        const videoRef = ref(storage, "topics-app/" + videoFileName);
        await uploadBytes(videoRef, videoBlob);
        const videoUrl = await getDownloadURL(videoRef);
        videoUrls.push(videoUrl);
      }

      // Upload PDF
      if (pdfs) {
        const pdfFileName = Date.now().toString() + "_document.pdf";
        const pdfResp = await fetch(pdfs);
        const pdfBlob = await pdfResp.blob();
        const pdfRef = ref(storage, "topics-app/" + pdfFileName);
        await uploadBytes(pdfRef, pdfBlob);
        pdfUrls = await getDownloadURL(pdfRef);
      }

      // Save topic details to Firestore
      await saveTopics(imageUrl, videoUrls, pdfUrls);
    } catch (error) {
      console.error("Error in onAddNewTopics:", error);
      Alert.alert("Upload Failed", "There was an error uploading your files.");
    } finally {
      setLoading(false);
    }
  };

  // Save to Firestore
  const saveTopics = async (imageUrl, videoUrls, pdfUrls) => {
    try {
      if (!title || !category) {
        Alert.alert("Error", "Title or Category is missing");
        return;
      }

      await setDoc(doc(db, "materials", Date.now().toString()), {
        category,
        imageUrl,
        videoUrls,
        pdfUrls,
        title,
      });

      Alert.alert("Success", "Material added.");

      // Clear input fields by resetting state
      setTitle("");
      setCategory("");
      setImage(null);
      setVideos([]);
      setPdfs(null);
    } catch (error) {
      console.error("Error saving topic to Firestore:", error);
      Alert.alert("Save Failed", "There was an error saving the topic.");
    }
  };

  return (
    <View style={{ padding: 20, backgroundColor: Colors.bgColor }}>
      <Text style={styles.title}>Add Topic Materials</Text>
      <Text style={styles.subtitle}>
        Fill in all the details to add new topic materials
      </Text>

      {/* Image Picker */}
      <TouchableOpacity style={styles.pickerButton} onPress={onImagePick}>
        <Icon
          name="photo-camera"
          size={24}
          color={Colors.primary}
          style={styles.icon}
        />
        <Text style={styles.pickerText}>
          {image ? "Image Selected" : "Select Image"}
        </Text>
      </TouchableOpacity>

      {/* Text Inputs */}
      <TextInput
        placeholder="Subject Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />

      {/* Video Picker */}
      <TouchableOpacity style={styles.pickerButton} onPress={pickVideo}>
        <Icon
          name="video-library"
          size={24}
          color={Colors.primary}
          style={styles.icon}
        />
        <Text style={styles.pickerText}>
          {videos.length > 0
            ? `Selected Videos: ${videos.length}`
            : "Select Video(s)"}
        </Text>
      </TouchableOpacity>

      {/* PDF Picker */}
      <TouchableOpacity style={styles.pickerButton} onPress={pickPdf}>
        <Icon
          name="picture-as-pdf"
          size={24}
          color={Colors.primary}
          style={styles.icon}
        />
        <Text style={styles.pickerText}>
          {pdfs ? "PDF Selected" : "Select PDF"}
        </Text>
      </TouchableOpacity>

      {/* Add Topic Button */}
      <TouchableOpacity
        disabled={loading}
        style={styles.addButton}
        onPress={onAddNewTopics}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.addButtonText}>Add New Topic</Text>
        )}
      </TouchableOpacity>
      <Toast position="top" bottomOffset={20} />
    </View>
  );
};

export default AddTopic;

const styles = StyleSheet.create({
  title: {
    fontFamily: "outfit-bold",
    fontSize: 25,
    color: Colors.primary,
  },
  subtitle: {
    fontFamily: "outfit",
    color: "gray",
    marginBottom: 20,
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
  pickerText: {
    fontSize: 16,
    fontFamily: "outfit",
    color: Colors.primary,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 17,
    backgroundColor: "#fff",
    marginTop: 10,
    borderColor: Colors.primary,
    fontFamily: "outfit",
  },
  addButton: {
    padding: 15,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  addButtonText: {
    textAlign: "center",
    fontFamily: "outfit-medium",
    color: "#fff",
  },
});

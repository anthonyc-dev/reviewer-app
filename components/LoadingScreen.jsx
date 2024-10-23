import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import NetInfo from "@react-native-community/netinfo";

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const router = useRouter();

  // Check network connectivity on component mount
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    // Clean up the event listener
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isConnected) {
      // Simulate a loading process
      const timer = setTimeout(() => {
        setLoading(false);
        router.push("/login");
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      Alert.alert(
        "No Internet",
        "Please check your internet connection and try again."
      );
    }
  }, [isConnected, router]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ImageBackground
          source={require("../assets/images/bg-image.jpg")}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#000" />
            <Text style={styles.text}>
              {isConnected ? "" : "Waiting for connection..."}
            </Text>
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    position: "absolute",
  },
  text: {
    marginTop: 10,
    color: "white",
    fontSize: 15,
    fontWeight: "outfit-medium",
  },
});

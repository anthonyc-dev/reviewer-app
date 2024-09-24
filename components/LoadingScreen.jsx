import React, { useState, useEffect } from "react";
import { StyleSheet, View, ImageBackground, Text } from "react-native";
import * as Progress from "react-native-progress"; // Import the progress bar library
import { useRouter } from "expo-router"; // Import useRouter

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0.0);
  const router = useRouter(); // Initialize the router

  // Simulate a loading process by updating progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 1) {
          return prev + 0.1; // Increment the progress
        }
        return prev; // Return the current progress
      });
    }, 500); // Update progress every 500ms

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  // Effect to navigate when progress reaches 100%
  useEffect(() => {
    if (progress >= 1) {
      router.push("/login"); // Navigate to the login screen
    }
  }, [progress, router]); // Depend on progress and router

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/bg-image.jpg")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 150,
          }}
        >
          <Progress.Bar
            progress={progress}
            width={200} // Adjust the width of the bar
            color="#0f23f0"
            unfilledColor="#ffffff"
            height={2}
          />
          <Text style={styles.text}>Loading {Math.floor(progress * 100)}%</Text>
        </View>
      </ImageBackground>
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
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  text: {
    marginTop: 10, // Add some spacing between the progress bar and text
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});

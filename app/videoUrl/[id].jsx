import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const VideoLecture = () => {
  const { materials } = useLocalSearchParams();
  console.log(materials);
  return (
    <View>
      <Text>VideoLecture</Text>
    </View>
  );
};

export default VideoLecture;

const styles = StyleSheet.create({});

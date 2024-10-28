import { StyleSheet } from "react-native";
import React from "react";
import { Link, Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the back arrow icon
import { Colors } from "../../constants/Colors";

const TopicLayout = () => {
  const router = useRouter(); // Use the router for navigation

  return (
    <Stack>
      <Stack.Screen
        name="topicList"
        options={{
          title: " Topic List",
          headerStyle: {
            backgroundColor: Colors.secondary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "outfit-bold",
          },
          // // Adding a back button in the header
          // headerLeft: () => (
          //   <Link href={"/search"}>
          //     <Ionicons
          //       name="arrow-back"
          //       size={24}
          //       color="#fff"
          //       style={{ marginLeft: 50 }} // Adjust margin if needed
          //       onPress={() => router.back()} // Go back to the previous screen
          //     />
          //   </Link>
          // ),
        }}
      />
    </Stack>
  );
};

export default TopicLayout;

const styles = StyleSheet.create({});

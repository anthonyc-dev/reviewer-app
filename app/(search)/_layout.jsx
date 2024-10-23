import { StyleSheet } from "react-native";
import React from "react";
import { Link, Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Make sure Ionicons is imported correctly
import { Colors } from "../../constants/Colors";

const SearchLayout = () => {
  const router = useRouter(); // To handle back navigation

  return (
    <Stack>
      <Stack.Screen
        name="search"
        options={{
          title: "Search",
          headerStyle: {
            backgroundColor: Colors.secondary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <Link href={"/home"}>
              <Ionicons
                name="arrow-back"
                size={24}
                color="#fff"
                style={{ marginLeft: 16 }}
                onPress={() => router.back()} // Use router.back() to go back
              />
            </Link>
          ),
        }}
      />
    </Stack>
  );
};

export default SearchLayout;

const styles = StyleSheet.create({});

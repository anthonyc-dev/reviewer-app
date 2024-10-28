import React from "react";
import { Tabs } from "expo-router";
import { Entypo, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Colors } from "../../constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: Colors.secondary,
          borderTopLeftRadius: 20, // Add top-left corner radius
          borderTopRightRadius: 20, // Keep top-right corner sharp if desired
          overflow: "hidden", // Ensure that the corner radius is a
        },
        tabBarLabelStyle: {
          fontFamily: "outfit", // Apply font family to tab labels
          fontSize: 14, // Set font size (adjust as needed)
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <Fontisto name="player-settings" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

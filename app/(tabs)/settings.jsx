import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";

const settingsOptions = [
  { id: "1", title: "Profile", icon: "person" },
  { id: "2", title: "Notifications", icon: "notifications" },
  { id: "3", title: "Privacy", icon: "lock-closed" },
  { id: "4", title: "About", icon: "information-circle" },
  { id: "5", title: "Logout", icon: "log-out" },
];

const Settings = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Settings",
      headerStyle: {
        backgroundColor: Colors.secondary,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontFamily: "outfit-bold",
      },
    });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.optionContainer}>
      <Ionicons
        name={item.icon}
        size={24}
        color={Colors.primary}
        style={styles.icon}
      />
      <Text style={styles.optionText}>{item.title}</Text>
      <AntDesign
        name="right"
        size={20}
        color={Colors.primary}
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <FlatList
        data={settingsOptions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 28,
    fontFamily: "outfit-bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  icon: {
    marginRight: 15, // Space between icon and text
  },
  optionText: {
    flex: 1, // Pushes the arrow icon to the right
    fontSize: 18,
    color: "#333",
    fontFamily: "outfit",
  },
  arrowIcon: {
    marginLeft: "auto", // Ensures arrow is on the far right
  },
});

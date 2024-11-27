import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Switch,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useNavigation, useRouter } from "expo-router";

const settingsOptions = [
  { id: "1", title: "Language", value: "English", type: "text" },
  { id: "2", title: "Location", value: "Los Angeles, CA", type: "text" },
  { id: "3", title: "Email Notifications", type: "toggle" },
  { id: "4", title: "Push Notifications", type: "toggle" },
  { id: "5", title: "Contact Us", type: "link" },
  { id: "6", title: "Report Bug", type: "link" },
  { id: "7", title: "Rate in App Store", type: "link" },
  { id: "8", title: "Terms and Privacy", type: "link" },
];

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [settingsClickCount, setSettingsClickCount] = useState(0);

  const router = useRouter();
  const navigation = useNavigation();

  const handleSettingsPress = () => {
    setSettingsClickCount((prevCount) => {
      const newCount = prevCount + 1;

      if (newCount === 1) {
        // Navigate to admin route on the 10th press
        router.push("/adminSide");
        return 0; // Reset the count after navigation
      }

      return newCount; // Increment the count
    });
  };

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

  const renderItem = ({ item }) => {
    if (item.type === "text") {
      return (
        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>{item.title}</Text>
          <Text style={styles.optionValue}>{item.value}</Text>
        </View>
      );
    } else if (item.type === "toggle") {
      return (
        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>{item.title}</Text>
          <Switch
            value={
              item.title === "Email Notifications"
                ? emailNotifications
                : pushNotifications
            }
            onValueChange={(value) =>
              item.title === "Email Notifications"
                ? setEmailNotifications(value)
                : setPushNotifications(value)
            }
          />
        </View>
      );
    } else {
      return (
        <TouchableOpacity style={styles.optionContainer}>
          <Text style={styles.optionText}>{item.title}</Text>
          <AntDesign name="right" size={20} color={Colors.primary} />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.headerContainer}>
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity> */}
        {/* <Text style={styles.headerTitle}>Settings</Text>
        <TouchableOpacity>
          <Ionicons name="share-social" size={24} color="black" />
        </TouchableOpacity> */}
      </View>
      <Text style={styles.sectionHeader}>ACCOUNT</Text>
      <TouchableOpacity
        style={styles.profileContainer}
        onPress={handleSettingsPress}
      >
        <Ionicons name="person-circle" size={50} color={Colors.primary} />
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john.doe@mail.com</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.sectionHeader}>PREFERENCES</Text>
      <FlatList
        data={settingsOptions.slice(0, 4)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <Text style={styles.sectionHeader}>RESOURCES</Text>
      <FlatList
        data={settingsOptions.slice(4)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>App Version 2.24 #50491</Text>
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  profileTextContainer: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "outfit",
  },
  optionValue: {
    fontSize: 16,
    color: "#666",
    fontFamily: "outfit",
  },
  logoutButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  logoutText: {
    color: "red",
    fontSize: 16,
    fontWeight: "600",
  },
  versionText: {
    fontSize: 12,
    color: "#aaa",
    textAlign: "center",
    marginTop: 15,
  },
});

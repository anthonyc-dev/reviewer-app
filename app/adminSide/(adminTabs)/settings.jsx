import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Using MaterialIcons from Expo for cool icons

const Settings = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Admin Settings</Text>
      </View>

      {/* Account Settings */}
      <TouchableOpacity
        style={styles.settingCard}
        onPress={() => alert("Account Settings")}
      >
        <MaterialIcons name="account-circle" size={24} color="#007BFF" />
        <Text style={styles.settingText}>Account Settings</Text>
      </TouchableOpacity>

      {/* Notification Settings */}
      <TouchableOpacity
        style={styles.settingCard}
        onPress={() => alert("Notification Settings")}
      >
        <MaterialIcons name="notifications" size={24} color="#007BFF" />
        <Text style={styles.settingText}>Notifications</Text>
      </TouchableOpacity>

      {/* Privacy Settings */}
      <TouchableOpacity
        style={styles.settingCard}
        onPress={() => alert("Privacy Settings")}
      >
        <MaterialIcons name="lock" size={24} color="#007BFF" />
        <Text style={styles.settingText}>Privacy</Text>
      </TouchableOpacity>

      {/* General Settings */}
      <TouchableOpacity
        style={styles.settingCard}
        onPress={() => alert("General Settings")}
      >
        <MaterialIcons name="settings" size={24} color="#007BFF" />
        <Text style={styles.settingText}>General Settings</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity
        style={styles.logoutCard}
        onPress={() => alert("Logging out")}
      >
        <MaterialIcons name="logout" size={24} color="#FF6347" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  settingCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  settingText: {
    fontSize: 18,
    marginLeft: 15,
    color: "#333",
  },
  logoutCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    borderColor: "#FF6347",
    borderWidth: 1,
    shadowColor: "#FF6347",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutText: {
    fontSize: 18,
    marginLeft: 15,
    color: "#FF6347",
  },
});

export default Settings;

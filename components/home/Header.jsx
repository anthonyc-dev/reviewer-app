import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const CoolHeader = () => {
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.secondary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          }}
          style={{
            width: 45,
            height: 45,
            borderRadius: 99,
          }}
        />
        <View>
          <Text
            style={{
              color: "#fff",
              fontFamily: "outfit",
            }}
          >
            Welcome,
          </Text>
          <Text
            style={{
              fontSize: 19,
              color: "#fff",
              fontFamily: "outfit-medium",
            }}
          >
            John Doe
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 10,
          marginTop: 15,
          borderRadius: 8,
        }}
      >
        <Ionicons name="search" size={24} color={Colors.primary} />
        <TextInput
          placeholder="Search..."
          style={{
            fontFamily: "outfit",
            fontSize: 16,
          }}
        ></TextInput>
      </View>
      <StatusBar
        style="light"
        backgroundColor="#0F014B"
        translucent={false}
        barStyle="light-content"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.secondary, // Cool blue background
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10, // Rounded corners for a modern look
    marginHorizontal: 10,
    marginTop: 30,
    shadowColor: "#000", // Shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Shadow for Android
  },
  headerText: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "outfit-bold",
  },
  iconContainer: {
    padding: 5,
  },
});

export default CoolHeader;

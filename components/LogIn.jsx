import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AuthLogin = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 20,
        }}
      >
        LogIn
      </Text>
    </View>
  );
};

export default AuthLogin;

const styles = StyleSheet.create({});

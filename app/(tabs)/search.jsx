import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Search from "../(search)/search";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";

const SearchFuntion = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Search",
      headerStyle: {
        backgroundColor: Colors.secondary,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontFamily: "outfit-bold",
      },
    });
  }, []);
  return <Search />;
};

export default SearchFuntion;

const styles = StyleSheet.create({});

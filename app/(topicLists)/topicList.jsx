import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { Link, useNavigation } from "expo-router";

const categories = [
  {
    id: "1",
    title: "Introduction to Criminology",
    icon: "book-outline",
  },
  {
    id: "2",
    title: "Theories of Crime Causation",
    icon: "book-outline",
  },
  {
    id: "4",
    title: "Professional Conduct and Ethical",
    icon: "book-outline",
  },
  {
    id: "5",
    title: "Juvenile Deliquency and Juvenile",
    icon: "book-outline",
  },
  {
    id: "6",
    title: "Dispute Resolution and Crisis/Incident Management",
    icon: "book-outline",
  },
  {
    id: "7",
    title: "Human Behavior and Victimonology",
    icon: "book-outline",
  },
];

const TopicLists = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Topic List",
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
    <Link href={"/topic"} asChild>
      <TouchableOpacity style={styles.categoryContainer}>
        <View style={styles.categoryContent}>
          <Ionicons
            name={item.icon}
            size={24}
            color={Colors.primary}
            style={styles.icon}
          />
          <Text style={styles.categoryText}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Topic List</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TopicLists;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f4f8",
  },
  header: {
    fontSize: 30,
    fontFamily: "outfit-bold",
    marginBottom: 20,
    textAlign: "center",
    color: Colors.primary,
    letterSpacing: 1,
  },
  categoryContainer: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#171717",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 2, // Android shadow
    transform: [{ scale: 1 }],
    transition: "transform 0.2s",
  },
  categoryContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
    color: Colors.primary,
  },
  categoryText: {
    fontSize: 18,
    color: "#4a4a4a",
    fontFamily: "outfit",
  },
});

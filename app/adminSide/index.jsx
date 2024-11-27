import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AddTopic from "../../components/addTopic/add-topic";
import { Redirect } from "expo-router";

const Admin = () => {
  return <Redirect href={"/adminSide/list"} />;
};

export default Admin;

const styles = StyleSheet.create({});

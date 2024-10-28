import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { router } from "expo-router";

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        icon={({ color, size }) => (
          <FontAwesome name="home" size={24} color={color} />
        )}
        label={"Home"}
        onPress={() => {
          router.push("/home");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <Feather name="search" size={24} color={color} />
        )}
        label={"search"}
        onPress={() => {
          router.push("/search");
        }}
      />
    </DrawerContentScrollView>
  );
};

const Layout = () => {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="search" options={{ headerShown: true }} />
    </Drawer>
  );
};

export default Layout;

const styles = StyleSheet.create({});

import React, { useEffect, useState } from "react";
import { Tabs, useRouter } from "expo-router";
import { FontAwesome, Feather, Fontisto } from "@expo/vector-icons";
import { Colors } from "../../../constants/Colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BottomNavigation } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // tabBarActiveTintColor: Colors.primary,
        // tabBarStyle: {
        //   // height: 65,
        //   // paddingBottom: 10,
        //   shadowColor: "#000",
        //   shadowOpacity: 0.2,
        //   shadowOffset: { width: 0, height: 5 },
        //   shadowRadius: 10,
        //   elevation: 10,
        //   overflow: "hidden",
        //   backgroundColor: Colors.secondary,
        // },
        // tabBarLabelStyle: {
        //   fontFamily: "outfit",
        //   fontSize: 14,
        //   fontWeight: "600",
        // },
        // tabBarIconStyle: {
        //   marginTop: 5,
        // },
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          barStyle={{ backgroundColor: Colors.secondary }} // Change the tab bar color to Colors.secondary
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            const iconColor = focused ? Colors.primary : color; // Use Colors.primary when focused

            if (options.tabBarIcon) {
              return options.tabBarIcon({
                focused,
                color: iconColor,
                size: 24,
              });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
          // Set label color to Colors.primary
          labelStyle={{
            color: Colors.primary,
          }}
        />
      )}
    >
      <Tabs.Screen
        name="list"
        options={{
          tabBarLabel: "List",
          tabBarIcon: ({ color }) => (
            <FontAwesome6
              name="list-check"
              size={24}
              color={Colors.secondary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          tabBarLabel: "Add",
          tabBarIcon: ({ color }) => (
            <AntDesign name="addfolder" size={24} color={Colors.secondary} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <Fontisto
              name="player-settings"
              size={24}
              color={Colors.secondary}
            />
          ),
        }}
      />
    </Tabs>
  );
}

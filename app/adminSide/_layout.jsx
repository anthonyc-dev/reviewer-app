import { useFonts } from "expo-font";
import { Link } from "expo-router";
import { Stack } from "expo-router";
import { Text } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(adminTabs)" />
    </Stack>
  );
}

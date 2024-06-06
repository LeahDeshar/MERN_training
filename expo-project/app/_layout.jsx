import { StyleSheet } from "react-native";
import React from "react";
import { ThemeProvider } from "../constants/ThemeProvider";
import { Stack } from "expo-router";
import HomeScreen from "./home/HomeScreen";
const Layout = () => {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="home/HomeScreen" options={{ headerShown: false }} />
        <Stack.Screen name="(side)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

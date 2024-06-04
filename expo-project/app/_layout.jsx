import { View, Text, Switch, StyleSheet, useColorScheme } from "react-native";
import React, { useState } from "react";
import { ThemeProvider } from "../constants/ThemeProvider";
import HomeScreen from "./home/HomeScreen";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
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

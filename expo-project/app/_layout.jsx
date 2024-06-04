import { View, Text, Switch, StyleSheet, useColorScheme } from "react-native";
import React, { useState } from "react";
import { ThemeProvider } from "../constants/ThemeProvider";
import HomeScreen from "./home/HomeScreen";

const Layout = () => {
  return (
    <ThemeProvider>
      <View style={styles.container}>
        <HomeScreen />
      </View>
    </ThemeProvider>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

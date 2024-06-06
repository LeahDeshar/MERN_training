import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../constants/ThemeProvider";

const Home = () => {
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

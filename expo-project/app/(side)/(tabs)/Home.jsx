import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../../constants/ThemeProvider";
import HomeScreen from "../../home/HomeScreen";

const Home = () => {
  const { colors, setScheme, dark } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text>Home</Text>
      <HomeScreen />
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

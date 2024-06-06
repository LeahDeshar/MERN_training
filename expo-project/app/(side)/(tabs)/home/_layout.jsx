import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../../../constants/ThemeProvider";
const HomeScreen = () => {
  const { colors, setScheme, dark } = useTheme();
  const navigator = useRouter();
  return (
    <View>
      <Button
        title={`Switch to ${dark ? "Light" : "Dark"} Theme`}
        onPress={() => setScheme(dark ? "light" : "dark")}
      />
      <Button onPress={() => navigator.push("(side)")} title="click" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
});

export default HomeScreen;

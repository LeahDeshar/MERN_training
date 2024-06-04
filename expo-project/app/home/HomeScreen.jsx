import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useTheme } from "../../constants/ThemeProvider";
const HomeScreen = () => {
  const { colors, setScheme, dark } = useTheme();

  return (
    <View>
      <Button
        title={`Switch to ${dark ? "Light" : "Dark"} Theme`}
        onPress={() => setScheme(dark ? "light" : "dark")}
      />
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

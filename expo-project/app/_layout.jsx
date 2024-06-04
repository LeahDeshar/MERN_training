import { View, Text, Switch, StyleSheet, useColorScheme } from "react-native";
import React, { useState } from "react";
import ThemeProvider from "../constants/ThemeProvider";

const Layout = () => {
  // const [toggle, setToggle] = useState(false);
  // const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Text>Theme Changer</Text>

        {/* <Switch value={colorScheme == "dark"} onChange={toggleColorScheme} /> */}
      </View>
    </ThemeProvider>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

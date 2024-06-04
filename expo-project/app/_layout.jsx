import { View, Text, Switch, StyleSheet, useColorScheme } from "react-native";
import React, { useState } from "react";

const Layout = () => {
  const [toggle, setToggle] = useState(false);
  const { colorScheme, toggleColorScheme } = useColorScheme();
  console.log(colorScheme);
  return (
    <View style={styles.container}>
      <Text>Theme Changer</Text>

      <Switch value={colorScheme == "dark"} onChange={toggleColorScheme} />
    </View>
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

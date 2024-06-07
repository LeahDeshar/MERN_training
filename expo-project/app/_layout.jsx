import { StyleSheet } from "react-native";
import React from "react";
import { ThemeProvider } from "../constants/ThemeProvider";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../store/store";
const Layout = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Stack>
          {/* <Stack.Screen
          name="(side)/home/HomeScreen"
          options={{ headerShown: false }}
        /> */}
          <Stack.Screen name="(side)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

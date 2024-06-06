import "react-native-gesture-handler";
import * as React from "react";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Home",
          title: "",
        }}
      />
      {/* <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Settings",
          title: "",
        }}
      /> */}
    </Drawer>
  );
}

import "react-native-gesture-handler";
import * as React from "react";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="settings"
        options={{ drawerLabel: "Settings" }}
        component={Settings}
      />
    </Drawer>
  );
}

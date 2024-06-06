import "react-native-gesture-handler";
import * as React from "react";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer screenOptions={{ headerShown: false }}>
      {/* <Drawer.Screen
        name="(side)/(tabs)/Setting"
        options={{ drawerLabel: "Settings" }}
      /> */}
      <Drawer.Screen name="(side)/(tabs)/Settings" />
    </Drawer>
  );
}

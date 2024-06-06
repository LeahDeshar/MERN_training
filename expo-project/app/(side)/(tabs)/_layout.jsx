import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerLeft: () => <DrawerToggleButton tintColor="#000" />,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={focused ? "blue" : "grey"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={24}
              color={focused ? "blue" : "grey"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Content"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "pencil" : "pencil-outline"}
              size={24}
              color={focused ? "blue" : "grey"}
            />
          ),
        }}
      />
    </Tabs>
  );
}

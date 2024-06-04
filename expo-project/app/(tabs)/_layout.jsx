import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
export default function TabLayout() {
  return (
    <Tabs>
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
      <Tabs.Screen name="Settings" />
    </Tabs>
  );
}

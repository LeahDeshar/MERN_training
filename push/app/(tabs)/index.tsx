import { Image, StyleSheet, Platform, View, Button, Text } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation, useRouter } from "expo-router";

export default function HomeScreen() {
  const navigation = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        AIRBNB MAPS
      </Text>
      <Button
        title="PUSH NOTIFICATION"
        onPress={() => navigation.push("/NotiScreen")}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

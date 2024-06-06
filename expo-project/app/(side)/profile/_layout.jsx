import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(0,0,0,0.5)", "transparent"]}
        style={styles.background}
      />

      <Text style={styles.text}>Profile Page</Text>
      <LinearGradient
        // Background Linear Gradient
        colors={["transparent", "rgba(0,0,0,0.4)"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 200,
          bottom: 0,
        }}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d62b2b5b",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  button: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    backgroundColor: "rgba(255,255,255,0.3)",
    fontSize: 15,
    color: "#000",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
});

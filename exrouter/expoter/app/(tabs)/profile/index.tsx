import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function ProfileIndex() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Text style={styles.text}>Welcome to the profile section!</Text>
      <Link href="/profile/1233">
        <Text style={styles.link}>Go to Profile Details</Text>
      </Link>
      <Link href="/profile/modal" style={styles.link}>
        Open modal
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  header: {
    fontSize: 24,
  },
  text: {
    marginVertical: 10,
  },
  link: {
    marginTop: 10,
  },
});

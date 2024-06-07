import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const Settings = () => {
  const count = useSelector((state) => state.counter.value);
  return (
    <View>
      <Text>Settings</Text>
      <Text>Count: {count}</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});

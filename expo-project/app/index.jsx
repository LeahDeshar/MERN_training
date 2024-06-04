import { View, Text } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

const index = () => {
  return (
    <View>
      <Redirect to="/home" />
    </View>
  );
};

export default index;

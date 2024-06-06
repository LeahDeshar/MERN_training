import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ContentScreen from "../../home/ContentScreen";
import { useTheme } from "../../../constants/ThemeProvider";

const Content = () => {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ContentScreen />
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({});

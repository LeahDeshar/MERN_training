import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../constants/ThemeProvider";

const ContentScreen = () => {
  const { colors } = useTheme();

  return (
    <View>
      <Text>ContentScreen</Text>
      <Text style={[styles.text, { color: colors.text }]}>Another Page</Text>
    </View>
  );
};

export default ContentScreen;

const styles = StyleSheet.create({});

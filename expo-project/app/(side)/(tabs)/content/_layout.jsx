import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../../../constants/ThemeProvider";
import Counter from "../../../../components/Counter";

const ContentScreen = () => {
  const { colors } = useTheme();

  return (
    <View>
      <Text>ContentScreen</Text>
      <Text style={[styles.text, { color: colors.text }]}>Another Page</Text>
      <Counter />
    </View>
  );
};

export default ContentScreen;

const styles = StyleSheet.create({});

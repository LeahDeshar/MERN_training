import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

const ProfileDetails = () => {
  const { params } = useLocalSearchParams();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text>ProfileDetails {params}</Text>

      {/* add text */}
      <Text>
        Test the dynamic routing of expo router.............................
      </Text>
    </View>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({});

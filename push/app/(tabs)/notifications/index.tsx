import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";

const NotificationHomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Notifications</Text>

      <Button
        title="Schedule test notifications"
        onPress={schedulePushNotification}
      />
    </View>
  );
};

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Check out the new Tinder Swipe Animation! 📬",
      body: "Here is the notification body",
      data: { data: "goes here", url: "/day6/tinder" },
      sound:
        "https://notificationsounds.com/soundfiles/2b2b5c4b2e0e3d1e7b3b5c4b2e0e3d1e_8.mp3",
    },

    trigger: { seconds: 5 },
  });
}
export default NotificationHomeScreen;

const styles = StyleSheet.create({});

// import { Button, StyleSheet, Text, View } from "react-native";
// import React from "react";
// import { Link, Stack, useRouter } from "expo-router";

// const Profile = () => {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#891414",
//       }}
//     >
//       <Stack>
//         <Stack.Screen
//           name="index"
//           options={{
//             headerTitle: "Profile",
//           }}
//         />
//       </Stack>
//     </View>
//   );
// };

// export default Profile;

// const styles = StyleSheet.create({});

import { Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function ProfileLayout() {
  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerTitle: "Profile" }}>
        <Stack.Screen name="index" />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
          }}
        />
        {/* <Stack.Screen name="[params]" /> */}
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#891414",
    // justifyContent: "center",
    // alignItems: "center",
  },
});

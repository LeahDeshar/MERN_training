// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Pressable,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { Link, useLocalSearchParams, useRouter } from "expo-router";

// export default function ProfileIndex() {
//   const { user, allUsers } = useLocalSearchParams();
//   const [result, setResult] = useState(null);
//   const currUser = JSON.parse(user);
//   const users = JSON.parse(allUsers);
//   const navigation = useRouter();

//   console.log("users", users);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Profile</Text>
//       <Text style={styles.text}>
//         Chat with {currUser?.user?.role === "coach" ? "trainee" : "coach"}
//       </Text>

//       <Text>{currUser?.user?.role}</Text>

//       {users?.users && (
//         <View>
//           <Text>Users</Text>
//           {users?.users?.map(
//             (peps) =>
//               peps.role !== currUser?.user.role && (
//                 <Pressable
//                   key={peps._id}
//                   onPress={() => {
//                     navigation.navigate({
//                       pathname: "/profile/[params]",
//                       params: {
//                         user: JSON.stringify(currUser),
//                         otherUser: JSON.stringify(peps),
//                       },
//                     });
//                   }}
//                   style={{
//                     padding: 10,
//                     borderWidth: 1,
//                     borderColor: "black",
//                     margin: 5,
//                   }}
//                 >
//                   <Text>{peps.username}</Text>
//                 </Pressable>
//               )
//           )}
//         </View>
//       )}
//       <Link href="/profile/modal" style={styles.link}>
//         Open modal
//       </Link>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "white",
//   },
//   header: {
//     fontSize: 24,
//   },
//   text: {
//     marginVertical: 10,
//   },
//   link: {
//     marginTop: 10,
//   },
// });
import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";

export default function ProfileIndex() {
  const { user, allUsers } = useLocalSearchParams();
  const [parsedUser, setParsedUser] = React.useState(null);
  const [parsedUsers, setParsedUsers] = React.useState([]);

  const navigation = useRouter();

  // Parse user and allUsers only once to avoid re-parsing on each render
  React.useEffect(() => {
    try {
      setParsedUser(JSON.parse(user));
      const usersData = JSON.parse(allUsers);
      setParsedUsers(usersData?.users || []);
    } catch (error) {
      console.error("Failed to parse user data:", error);
    }
  }, [user, allUsers]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Text style={styles.text}>
        Chat with {parsedUser?.user?.role === "coach" ? "trainee" : "coach"}
      </Text>

      <Text>Role: {parsedUser?.user?.role}</Text>

      {parsedUsers.length > 0 && (
        <View>
          <Text>Available Users</Text>
          {parsedUsers.map(
            (person) =>
              // Display opposite role only
              person.role !== parsedUser?.user?.role && (
                <Pressable
                  key={person._id}
                  onPress={() =>
                    navigation.navigate({
                      pathname: "/profile/[params]",
                      params: {
                        user: JSON.stringify(parsedUser),
                        otherUser: JSON.stringify(person),
                      },
                    })
                  }
                  style={styles.userContainer}
                >
                  <Text>{person.username}</Text>
                </Pressable>
              )
          )}
        </View>
      )}

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
    color: "blue",
  },
  userContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    margin: 5,
  },
});

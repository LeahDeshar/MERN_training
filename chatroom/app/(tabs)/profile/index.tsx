import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";

export default function ProfileIndex() {
  const { user, allUsers } = useLocalSearchParams();
  const [result, setResult] = useState(null);
  const currUser = JSON.parse(user);

  const [users, setUsers] = useState(null);
  // useEffect(() => {
  //   const getAllUsers = async () => {
  //     try {
  //       // fetch and also send the token
  //       const response = await fetch(
  //         "http://192.168.1.6:8080/api/v1/user/get-all-users",
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${currUser?.token}`,
  //           },
  //         }
  //       );

  //       const data = await response.json();
  //       console.log("Fetched users", data);
  //       setUsers(data.users);
  //     } catch (error) {}
  //   };
  //   getAllUsers();
  // }, [currUser]);

  console.log("users", users);
  console.log("currUser", currUser?.token);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Text style={styles.text}>Welcome to the profile section!</Text>

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

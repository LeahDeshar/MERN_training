import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  Pressable,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import LoginScreen from "../LoginScreen";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
const SOCKET_SERVER_URL = "http://192.168.1.6:8080";
export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [result, setResult] = useState(null);

  const navigation = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://192.168.1.6:8080/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Assuming the server returns userId and token
        console.log(data);
        setResult(data);
        // navigation.navigate("/chat", { user: data.user });
        // navigation.navigate("/profile/[params]", {
        //   params: { userId: data._id },
        // });
        // navigation.navigate("Chat", { user: data });
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  const [users, setUsers] = useState(null);
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        // fetch and also send the token
        const response = await fetch(
          "http://192.168.1.6:8080/api/v1/user/get-all-users",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${result?.token}`,
            },
          }
        );
        // const response = await fetch(
        //   "http://192.168.1.6:8080/user/get-all-users"
        // );

        const data = await response.json();
        console.log("Fetched users", data);
        setUsers(data.users);
      } catch (error) {}
    };
    getAllUsers();
  }, [result]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text>Hello</Text>
      <LoginScreen
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        handleLogin={handleLogin}
      />

      {/* pass the user response to /chat/ */}

      <Link
        // href={`/profile?data=${encodeURIComponent(JSON.stringify(result))}`}
        href={`/profile/${result}`}
      >
        <Text style={{}}>Go to Profile Details</Text>
      </Link>

      {users && (
        <View>
          <Text>Users</Text>
          {users.map((peps) => (
            <Pressable
              key={peps._id}
              onPress={() => {
                navigation.navigate({
                  pathname: "/profile/[params]",
                  params: {
                    user: JSON.stringify(result),
                    otherUser: JSON.stringify(peps),
                  },
                });
              }}
            >
              <Text>{peps.email}</Text>
            </Pressable>
          ))}
        </View>
      )}
      {!users && <Text>Loading...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

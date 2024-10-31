import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://192.168.1.6:8080";
const socket = io(SOCKET_SERVER_URL);
const ChatScreen = ({ userId, conversationId }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // console.log(userId);
  const { params } = useLocalSearchParams();

  useEffect(() => {
    // Join user’s room
    socket.emit("join", userId);

    // Listen for incoming messages
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("newMessage");
    };
  }, [userId]);

  const sendMessage = () => {
    if (text.trim()) {
      socket.emit("sendMessage", {
        conversationId,
        senderId: userId,
        text,
      });
      setText("");
    }
  };

  return (
    <View style={{ padding: 20, backgroundColor: "white", flex: 1 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Text>{item.text}</Text>}
      />
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Type your message"
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});

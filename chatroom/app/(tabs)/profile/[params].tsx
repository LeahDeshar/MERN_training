import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://192.168.1.6:8080";
const socket = io(SOCKET_SERVER_URL);

const ProfileDetails = () => {
  const { user, otherUser } = useLocalSearchParams();
  const currUser = JSON.parse(user);
  const OtherUser = JSON.parse(otherUser);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const userId = currUser.user._id;

  useEffect(() => {
    // Join the conversation
    socket.emit("join", userId, OtherUser._id);

    // Listen for the conversation ID
    socket.on("conversationId", (id) => {
      setConversationId(id);
      // Fetch all messages when the conversation is set
      socket.emit("allMessageOfUser", { conversationId: id });
    });

    // Listen for incoming messages
    socket.on("receiveMessages", ({ conversationId, messages }) => {
      console.log(`Messages for conversation ${conversationId}:`, messages);

      // [{"__v": 0, "_id": "6723bfd280100f8c32a8cef7", "conversationId": "67238fe7c7f730b81ce823ea", "senderId": "672374d29ea238cadf7560f7", "text": "Star", "timestamp": "2024-10-31T17:35:14.852Z"}]
      setMessages((prevMessages) => [...prevMessages, ...messages]);
    });

    // Clean up the socket listeners on component unmount
    return () => {
      socket.off("receiveMessages");
      socket.off("conversationId");
    };
  }, [userId, OtherUser._id]);

  const sendMessage = () => {
    if (text.trim()) {
      // Create a new message object to append immediately
      const newMessage = {
        senderId: { _id: userId, username: currUser.user.username }, // Include username for display
        text,
      };

      // Update the messages state immediately for the sender
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Emit the message to the server
      socket.emit("sendMessage", {
        conversationId,
        senderId: userId,
        text,
      });

      // Clear the input field
      setText("");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <View style={{ marginTop: 20 }}>
        <Text>CHAT group id {conversationId}</Text>
        <View style={{ padding: 20, backgroundColor: "white" }}>
          <ScrollView
            contentContainerStyle={{ backgroundColor: "red" }}
            inverted // To show the latest messages at the bottom
          >
            {messages.map((message, index) => {
              const isCurrentUser = message.senderId._id === userId;
              return (
                <View
                  key={index}
                  style={{
                    alignSelf: isCurrentUser ? "flex-end" : "flex-start",
                    backgroundColor: isCurrentUser ? "lightblue" : "lightgray",
                    borderRadius: 10,
                    marginVertical: 5,
                    padding: 10,
                    maxWidth: "80%",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>
                    {isCurrentUser
                      ? currUser.user.username
                      : OtherUser.username}
                  </Text>
                  <Text>{message.text}</Text>
                </View>
              );
            })}
          </ScrollView>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Type your message"
            style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
          />
          <Button title="Send" onPress={sendMessage} />
        </View>
      </View>
    </View>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({});

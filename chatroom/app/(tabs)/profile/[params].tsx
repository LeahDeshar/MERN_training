import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
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

  const scrollViewRef = useRef(); // For auto-scrolling

  useEffect(() => {
    socket.emit("join", userId, OtherUser._id);

    socket.on("conversationId", (id) => {
      setConversationId(id);
      socket.emit("allMessageOfUser", { conversationId: id });
    });

    socket.on("receiveMessages", ({ conversationId, messages }) => {
      console.log(`Messages for conversation ${conversationId}:`, messages);
      setMessages((prevMessages) => [...prevMessages, ...messages]);
    });

    return () => {
      socket.off("receiveMessages");
      socket.off("conversationId");
    };
  }, [userId, OtherUser._id]);

  const sendMessage = () => {
    if (text.trim()) {
      const newMessage = {
        senderId: { _id: userId, username: currUser.user.username },
        text,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      socket.emit("sendMessage", {
        conversationId,
        senderId: userId,
        text,
      });

      setText("");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <View style={styles.chatContainer}>
        <Text style={styles.chatHeader}>Chat with {OtherUser.username}</Text>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
          contentContainerStyle={styles.messagesContainer}
        >
          {messages.map((message, index) => {
            const isCurrentUser = message.senderId._id === userId;
            return (
              <View
                key={index}
                style={[
                  styles.messageBubble,
                  isCurrentUser
                    ? styles.currentUserBubble
                    : styles.otherUserBubble,
                ]}
              >
                <Text style={styles.senderName}>
                  {isCurrentUser ? currUser.user.username : OtherUser.username}
                </Text>
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
            );
          })}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderTopWidth: 1,
            borderColor: "#d3d3d3",
            padding: 10,
            backgroundColor: "white",
          }}
        >
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Type your message"
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#d3d3d3",
              borderRadius: 20,
              paddingHorizontal: 15,
              marginRight: 10,
              height: 40,
            }}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  chatHeader: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  messagesContainer: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  messageBubble: {
    borderRadius: 15,
    padding: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  currentUserBubble: {
    backgroundColor: "#daf8e3",
    alignSelf: "flex-end",
  },
  otherUserBubble: {
    backgroundColor: "#e3e3e3",
    alignSelf: "flex-start",
  },
  senderName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {},
  input: {},
  sendButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

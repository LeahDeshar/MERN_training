import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import io from "socket.io-client";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import EmojiKeyboard from "rn-emoji-keyboard"; // Import emoji keyboard

const SOCKET_SERVER_URL = "http://192.168.1.6:8080";
const socket = io(SOCKET_SERVER_URL);

const ProfileDetails = () => {
  const { user, otherUser } = useLocalSearchParams();
  const currUser = JSON.parse(user);
  const OtherUser = JSON.parse(otherUser);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false); // State for showing the emoji keyboard
  const [conversationId, setConversationId] = useState(null);
  const userId = currUser.user._id;

  const scrollViewRef = useRef();

  useEffect(() => {
    socket.emit("join", userId, OtherUser._id);

    socket.on("conversationId", (id) => {
      setConversationId(id);
      socket.emit("allMessageOfUser", { conversationId: id });
    });

    socket.on("receiveMessages", ({ conversationId, messages }) => {
      setMessages((prevMessages) => [...prevMessages, ...messages]);
    });

    return () => {
      socket.off("receiveMessages");
      socket.off("conversationId");
    };
  }, [userId, OtherUser._id]);

  const sendMessage = (isLike = false) => {
    const messageText = isLike ? "👍" : text.trim();
    if (messageText) {
      const newMessage = {
        senderId: { _id: userId, username: currUser.user.username },
        text: messageText,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      socket.emit("sendMessage", {
        conversationId,
        senderId: userId,
        text: messageText,
      });

      if (!isLike) setText("");
    }
  };

  // Function to add selected emoji to the text input
  const addEmoji = (emoji) => {
    setText((prevText) => prevText + emoji.emoji);
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

        <View style={styles.inputContainer}>
          {showEmojiKeyboard && (
            <EmojiKeyboard
              onEmojiSelected={addEmoji}
              open={showEmojiKeyboard}
              enableRecentlyUsed
              enableSearchBar
              enableCategoryChangeGesture
              onClose={() => setShowEmojiKeyboard(false)}
              theme={{
                backdrop: "transparent",
              }}
              categoryOrder={[
                "recently_used",
                "smileys_emotion",
                "people_body",
                "animals_nature",
                "food_drink",
                "travel_places",
                "activities",
                "objects",
                "symbols",
                "flags",
                "search",
              ]}
            />
          )}
          <TouchableOpacity
            onPress={() => setShowEmojiKeyboard(!showEmojiKeyboard)}
          >
            <AntDesign name="smileo" size={28} color="#4CAF50" />
          </TouchableOpacity>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Type your message"
            style={styles.input}
          />
          <TouchableOpacity onPress={() => sendMessage(text ? false : true)}>
            {text ? (
              <FontAwesome name="send" size={28} color="#4CAF50" />
            ) : (
              <AntDesign name="like1" size={28} color="#4CAF50" />
            )}
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#d3d3d3",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    height: 40,
  },
  emojiKeyboard: {
    position: "absolute",
    bottom: 50,
    width: "100%",
  },
});

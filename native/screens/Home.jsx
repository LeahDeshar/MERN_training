import { View, Text, TouchableOpacity } from "react-native";
import EmptyState from "../components/EmptyState";
import ProgressBar from "../components/ProgressBar";
import { Uploading } from "../components/Uploading";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {} from "firebase/firestore";

const Home = () => {
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  async function uploadImage(uri, fileType) {
    const response = await fetch(uri);
    const blob = await response.blob();
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {image && <Uploading progress={20} />}
      {/* <Uploading progress={20} /> */}
      <EmptyState />
      <TouchableOpacity
        onPress={pickImage}
        style={{
          position: "absolute",
          bottom: 90,
          right: 30,
          width: 44,
          height: 44,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 25,
        }}
      >
        <Ionicons name="image" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={pickVideo}
        style={{
          position: "absolute",
          bottom: 150,
          right: 30,
          width: 44,
          height: 44,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 25,
        }}
      >
        <Ionicons name="videocam" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import EmptyState from "../components/EmptyState";
import ProgressBar from "../components/ProgressBar";
import { Uploading } from "../components/Uploading";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db, storage } from "../firebaseConfig";
import { Video } from "expo-av";
const Home = () => {
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState([]);
  // useEffect(() => {
  //   const unsubscribe = onSnapshot(collection(db, "files"), (snapshot) => {
  //     snapshot.docChanges().forEach((change) => {
  //       if (change.type === "added") {
  //         console.log("New file", change.doc.data());
  //         setFiles((prevFiles) => [...prevFiles, change.doc.data()]);
  //       }
  //     });
  //   });
  //   return () => unsubscribe();
  // }, []);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "files"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const newFile = change.doc.data();
          // Check if the file already exists in the state
          const existingFileIndex = files.findIndex(
            (file) => file.url === newFile.url
          );
          if (existingFileIndex === -1) {
            console.log("New file", newFile);
            // Add the new file to the state only if it doesn't already exist
            setFiles((prevFiles) => [...prevFiles, newFile]);
          }
        }
      });
    });
    return () => unsubscribe();
  }, [files]);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await uploadImage(result.assets[0].uri, "image");
    }
  };
  async function pickVideo() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await uploadImage(result.assets[0].uri, "video");
      // await saveRecord("image");
    }
  }

  async function uploadImage(uri, fileType) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, "Stuff/" + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);
    // listen for event
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress.toFixed());
        console.log(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          // save record
          await saveRecord(fileType, downloadURL, new Date().toISOString());
          setImage("");
          setVideo("");
        });
      }
    );
  }
  async function saveRecord(fileType, url, createdAt) {
    try {
      const docRef = await addDoc(collection(db, "files"), {
        fileType,
        url,
        createdAt,
      });
      console.log("document saved correctly", docRef.id);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 20,
      }}
    >
      <Text
        style={{
          marginTop: 50,
          fontSize: 30,
          fontWeight: "bold",
          paddingBottom: 20,
        }}
      >
        Files
      </Text>
      {files.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={files}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => {
            if (item.fileType === "image") {
              return (
                <Image
                  source={{ uri: item.url }}
                  style={{
                    width: "35%",
                    height: 100,
                    // flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              );
            } else {
              return (
                <Video
                  source={{
                    uri: item.url,
                  }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  resizeMode="cover"
                  // isLooping
                  style={{ width: "35%", height: 100 }}
                  useNativeControls
                />
              );
            }
          }}
          numColumns={3}
          contentContainerStyle={{ gap: 2 }}
          columnWrapperStyle={{ gap: 2 }}
        />
      )}
      {image && <Uploading image={image} video={video} progress={progress} />}
      {/* <Uploading progress={20} /> */}
      {/* <EmptyState /> */}
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
        onPress={pickVideo}
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

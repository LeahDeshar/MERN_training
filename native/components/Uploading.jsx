import { Image, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur"; // Import BlurView from expo-blur
import { Video } from "expo-av";

export function Uploading({ image, video, progress }) {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        },
      ]}
    >
      <BlurView // Use BlurView from expo-blur
        intensity={10}
        style={StyleSheet.absoluteFill}
      >
        <View
          style={{
            width: "70%",
            alignItems: "center",
            paddingVertical: 16,
            rowGap: 12,
            borderRadius: 14,
            backgroundColor: "rgba(255, 255, 255, 0.5)", // Adjust background color and opacity as needed
          }}
        >
          {/* {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
                borderRadius: 6,
              }}
            />
          )}
          {video && (
            <Video
              source={{
                uri: video,
              }}
              videoStyle={{}}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="contain"
              style={{ width: 200, height: 200 }}
            />
          )} */}
          <Text style={{ fontSize: 12 }}>Uploading...</Text>
          {/* <ProgressBar progress={progress} /> */}
          <View
            style={{
              height: 1,
              borderWidth: StyleSheet.hairlineWidth,
              width: "100%",
              borderColor: "#00000020",
            }}
          />
          <TouchableOpacity>
            <Text style={{ fontWeight: "500", color: "#3478F6", fontSize: 17 }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );
}

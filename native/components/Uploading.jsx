import { Image, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur"; // Import BlurView from expo-blur
import { Video } from "expo-av";
import ProgressBar from "./ProgressBar";

export function Uploading({ image, video, progress }) {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        },
      ]}
    >
      <BlurView // Use BlurView from expo-blur
        intensity={20}
        style={[
          StyleSheet.absoluteFill,
          { flex: 1, justifyContent: "center", alignItems: "center" },
        ]}
        tint="systemThinMaterialDark"
      >
        <View
          style={{
            width: "70%",
            alignItems: "center",
            paddingVertical: 16,
            rowGap: 12,
            borderRadius: 14,
            backgroundColor: "rgb(255, 255, 255)", // Adjust background color and opacity as needed
          }}
        >
          {image && (
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
          )}
          <Text style={{ fontSize: 12 }}>Uploading...</Text>
          <ProgressBar progress={progress} />
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

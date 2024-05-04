import { View, Text } from "react-native";
import React from "react";
import { Rect, Svg } from "react-native-svg";

const ProgressBar = ({ progress }) => {
  const barWidth = 230;
  const progressWidth = (progress / 100) * barWidth;
  return (
    <View>
      <Svg width={barWidth} height={"7"}>
        <Rect
          width={barWidth}
          height={"100%"}
          fill={"#eee"}
          rx={4.5}
          ry={4.5}
        />
        <Rect
          width={progressWidth}
          height={"100%"}
          fill={"#000"}
          rx={4.5}
          ry={4.5}
        />
      </Svg>
    </View>
  );
};

export default ProgressBar;

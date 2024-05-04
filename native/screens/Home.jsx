import { View, Text } from "react-native";
import EmptyState from "../components/EmptyState";
import ProgressBar from "../components/ProgressBar";
import { Uploading } from "../components/Uploading";

const Home = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Uploading />
      {/* <EmptyState /> */}
      <ProgressBar progress={20} />
    </View>
  );
};

export default Home;

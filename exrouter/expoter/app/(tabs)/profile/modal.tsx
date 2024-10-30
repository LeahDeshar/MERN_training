import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const ModalScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is a Modal Screen!</Text>
      <Button title="Close" onPress={() => router.back()} />
    </View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  text: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 20,
  },
});

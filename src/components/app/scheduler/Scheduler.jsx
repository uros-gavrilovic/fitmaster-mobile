import { StyleSheet, Text, View } from "react-native";
import CustomAppBar from "../../reusable/menu/CustomAppBar";

export default function Scheduler() {
  return (
    <View>
      <CustomAppBar />

      <Text variant="headlineMedium">Scheduler!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

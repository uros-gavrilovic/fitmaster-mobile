import { StyleSheet, Text, View } from "react-native";

export default function Scheduler() {
  return (
    <View style={styles.container}>
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

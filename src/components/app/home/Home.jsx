import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useState } from "react";
import CustomAppBar from "../../reusable/menu/CustomAppBar";

export default function Home() {
  return (
    <View>
      <CustomAppBar />

      <Text variant="headlineMedium">Home!</Text>
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

import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import CustomAppBar from "../../reusable/menu/CustomAppBar";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <CustomAppBar />
      <Text variant="headlineMedium">Home!</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

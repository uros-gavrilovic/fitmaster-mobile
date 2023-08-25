import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useEffect, useState } from "react";
import CustomAppBar from "../../reusable/menu/CustomAppBar";
import CustomSnackbar from "../../reusable/notifications/CustomSnackbar";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <CustomAppBar />
      <CustomSnackbar
        message={"Test Notification"}
        icon="camera"
        duration={3000} // 3 seconds
        open={open}
        setOpen={setOpen}
      />

      <Button
        onPress={() => {
          setOpen(true);
        }}
      >
        CLICK ME
      </Button>
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

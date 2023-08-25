import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useState } from "react";
import CustomConfirmModal from "../../reusable/modals/CustomConfirmModal";

export default function Home() {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  return (
    <View>
      <CustomConfirmModal
        title={"TEST TITLE"}
        message={"Lorem Ipsum"}
        open={openLogoutModal}
        setOpen={setOpenLogoutModal}
      />

      <Button
        onPress={() => {
          setOpenLogoutModal(true);
        }}
      >
        TEST
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

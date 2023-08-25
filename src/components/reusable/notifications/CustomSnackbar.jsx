import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Snackbar } from "react-native-paper";

export default function CustomSnackbar(props) {
  const { message, icon, duration, open, setOpen, t } = props || {};

  const onDismissSnackBar = () => setOpen(false);

  return (
    <View style={styles.container}>
      <View style={styles.snackbarContainer}>
        <Snackbar
          icon={icon}
          duration={duration}
          visible={open}
          onDismiss={onDismissSnackBar}
          action={{
            label: "X",
            onPress: () => {
              onDismissSnackBar();
            },
          }}
        >
          {message}
        </Snackbar>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
  },
  snackbarContainer: {},
});

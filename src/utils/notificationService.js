import { Snackbar } from "react-native-paper";
import React, { useState } from "react";

export default function createNotification(message, durationInSeconds = 5) {
  // State for controlling Snackbar visibility
  const [snackbarVisible, setSnackbarVisible] = useState(true);

  // Function to dismiss the Snackbar
  const dismissSnackbar = () => {
    setSnackbarVisible(false);
  };

  // Show the Snackbar
  return (
    <Snackbar
      visible={snackbarVisible}
      onDismiss={dismissSnackbar}
      duration={durationInSeconds * 1000} // Convert seconds to milliseconds
    >
      {message}
    </Snackbar>
  );
}

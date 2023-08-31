import * as React from "react";
import { StyleSheet } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

const CustomDialog = (props) => {
  const { open, setOpen, children, t } = props || {};

  return (
    <Portal>
      <Dialog
        style={{ borderRadius: 10 }}
        visible={open}
        onDismiss={() => {
          setOpen(false);
        }}
      >
        {children}
      </Dialog>
    </Portal>
  );
};

export default CustomDialog;

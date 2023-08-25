import * as React from "react";
import { StyleSheet } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

const MyComponent = (props) => {
  const { title, message, icon, yesAction, noAction, open, setOpen, t } =
    props || {};

  const handleYes = () => {
    yesAction();
    setOpen(false);
  };

  const handleNo = () => {
    noAction?.();
    setOpen(false);
  };

  return (
    <Portal>
      <Dialog
        visible={open}
        onDismiss={() => {
          setOpen(false);
        }}
      >
        <Dialog.Icon icon={icon} />
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{message}</Text>
        </Dialog.Content>
        <Dialog.Actions
          style={{
            flexDirection: "row",
          }}
        >
          <Button mode="outlined" style={{ flex: 1 }} onPress={handleNo}>
            No
          </Button>
          <Button mode="contained" style={{ flex: 1 }} onPress={handleYes}>
            Yes
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});

export default MyComponent;

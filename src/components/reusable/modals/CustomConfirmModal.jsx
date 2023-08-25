import React from "react";
import { Modal, StyleSheet, Pressable, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function CustomConfirmModal(props) {
  // DEPRECATED: Use CustomConfirmDialog instead.

  const { title, message, yes_action, no_action, open, setOpen, t } =
    props || {};

  const handleYes = () => {
    yes_action();
    setOpen(false);
  };

  const handleNo = () => {
    no_action?.();
    setOpen(false);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          setOpen(!open);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText} variant="titleLarge">
              {title}
            </Text>
            <Text style={styles.modalText}>{message}</Text>
            <View style={styles.modalButtons}>
              <Button icon="thumb-down" mode="outlined" onPress={handleNo}>
                No
              </Button>
              <Button icon="thumb-up" mode="contained" onPress={handleYes}>
                Yes
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

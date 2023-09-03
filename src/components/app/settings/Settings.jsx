import CustomAppBar from "../../reusable/menu/CustomAppBar";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { validateField } from "../../../utils/utilFunctions";
import * as userActions from "../../../actions/user";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomConfirmDialog from "../../reusable/modals/CustomConfirmDialog";

export default function Settings() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const initialFormData = {
    firstname: user?.firstName || "",
    lastname: user?.lastName || "",
    gender: user?.gender || "",
    address: user?.address || "",
    phonenumber: user?.phoneNumber || "",
    username: user?.username || "",
    password: user?.password || "",
    birthdate: user?.birthDate
      ? new Date(user.birthDate[0], user.birthDate[1] - 1, user.birthDate[2])
      : "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [errorState, setErrorState] = useState({
    firstname: false,
    lastname: false,
    gender: false,
    address: false,
    phonenumber: false,
    username: false,
    password: false,
    birthdate: false,
    newPassword: false,
    newPasswordConfirm: false,
  });

  const genderOptions = ["", "MALE", "FEMALE"];
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [passError, setPassError] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const today = new Date();
  const maximumDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  const onChange = (event, selectedDate) => {
    setShowDatePicker(false);
    setFormData({
      ...formData,
      birthdate: selectedDate,
    });
  };

  const handlePasswordModalOpen = () => {
    setErrorState({
      ...errorState,
      newPassword: false,
      newPasswordConfirm: false,
    });
    setShowPasswordModal(true);
  };

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
  };

  const setToDefault = () => {
    setNewPassword("");
    setNewPasswordConfirm("");
    setPassError("");
  };

  function isSameDate(date1, date2) {
    if (!date1 && !date2) {
      // Both dates are null, consider them as the same
      return true;
    } else if (!date1 || !date2) {
      // One date is null and the other is not, consider them as different
      return false;
    }
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  function isFormModified() {
    for (const key in formData) {
      if (key === "password") continue;
      if (key === "birthdate") {
        // Convert both birthdate values to Date objects
        const initialDate = initialFormData[key]
          ? new Date(initialFormData[key])
          : null;
        const currentDate = formData[key] ? new Date(formData[key]) : null;

        // Check if the day, month, and year components are the same
        if (!isSameDate(initialDate, currentDate)) {
          return true;
        }
      } else {
        if (formData[key] !== initialFormData[key]) {
          return true;
        }
      }
    }
    return false;
  }

  const handleReset = () => {
    setFormData(initialFormData);
  };

  const handleDelete = () => {
    dispatch(
      userActions.deleteMember({
        memberID: user?.memberID,
      })
    );
  };

  const handlePasswordChange = () => {
    const hasDefaultPassword = validateField(
      formData.password,
      "password",
      setErrorState
    );
    const hasFirstNewPassword = validateField(
      newPassword,
      "newPassword",
      setErrorState
    );
    const hasConfirmPassword = validateField(
      newPasswordConfirm,
      "newPasswordConfirm",
      setErrorState
    );
    if (hasDefaultPassword || hasFirstNewPassword || hasConfirmPassword) return;
    if (newPassword === newPasswordConfirm) {
      dispatch(
        userActions.changeMemberPassword({
          memberID: user.memberID,
          oldPassword: formData.password,
          newPassword: newPassword,
        })
      );
      setToDefault();
      setShowPasswordModal(false);
    } else {
      setPassError("Passwords are not matching");
    }
  };

  const handleSubmit = () => {
    const hasFirstName = validateField(
      formData.firstname,
      "firstname",
      setErrorState
    );
    const hasLastName = validateField(
      formData.lastname,
      "lastname",
      setErrorState
    );
    const hasUsername = validateField(
      formData.username,
      "username",
      setErrorState
    );

    if (hasFirstName || hasLastName || hasUsername) return;

    dispatch(
      userActions.updateMember({
        memberId: user?.memberID,
        firstName: formData.firstname,
        lastName: formData.lastname,
        gender: formData.gender,
        address: formData.address,
        phoneNumber: formData.phonenumber,
        username: formData.username,
      })
    );
  };

  return (
    <ScrollView style={styles.container}>
      <CustomAppBar />
      <CustomConfirmDialog
        icon={"logout"}
        title={"Delete account"}
        message={"Are you sure you want to delete your account?"}
        yesAction={handleDelete}
        open={openModal}
        setOpen={setOpenModal}
      />
      <View style={styles.contentContainer}>
        <TextInput
          label="First name"
          style={styles.input}
          value={formData.firstname}
          onChangeText={(text) =>
            setFormData({
              ...formData,
              firstname: text,
            })
          }
        />
        <TextInput
          label="Last name"
          style={styles.input}
          value={formData.lastname}
          onChangeText={(text) =>
            setFormData({
              ...formData,
              lastname: text,
            })
          }
        />
        <Text> Please select gender </Text>
        <Picker
          mode="outlined"
          selectedValue={formData.gender}
          style={styles.input}
          onValueChange={(value) => setFormData({ ...formData, gender: value })}
        >
          {genderOptions.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
        <TextInput
          label="Address"
          style={styles.input}
          value={formData.address}
          onChangeText={(text) =>
            setFormData({
              ...formData,
              address: text,
            })
          }
        />
        <TextInput
          label="Phone number"
          keyboardType="phone-pad"
          style={styles.input}
          value={formData.phonenumber}
          onChangeText={(text) =>
            setFormData({
              ...formData,
              phonenumber: text,
            })
          }
        />
        <TextInput
          label="Username"
          style={styles.input}
          value={formData.username}
          onChangeText={(text) =>
            setFormData({
              ...formData,
              username: text,
            })
          }
        />
        <Button
          title="Show Date Picker"
          mode="contained"
          style={{ color: "white" }}
          onPress={() => setShowDatePicker(true)}
        >
          Choose date
        </Button>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode="date"
            display="default"
            onChange={onChange}
            maximumDate={maximumDate}
          />
        )}
        <TextInput
          label="Birth date"
          style={styles.input}
          editable={false}
          value={
            formData.birthdate ? formData.birthdate.toLocaleDateString() : ""
          }
        />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Button
            mode="contained"
            onPress={handlePasswordModalOpen}
            style={{ width: "50%", color: "white", fontSize: 16 }}
          >
            Change password
          </Button>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          <Button
            mode="contained"
            onPress={handleReset}
            style={{ width: "40%", color: "white", fontSize: 16 }}
          >
            Reset
          </Button>
          <Button
            icon="login"
            mode="contained"
            onPress={handleSubmit}
            disabled={!isFormModified()}
            style={{ width: "65%", color: "white", fontSize: 16 }}
          >
            Confirm changes
          </Button>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Button
            mode="outlined"
            onPress={() => setOpenModal(true)}
            style={{ marginTop: 10, width: "50%" }}
          >
            Delete account
          </Button>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showPasswordModal}
        onRequestClose={handlePasswordModalClose}
        style={{ zIndex: 1 }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Enter New Password:</Text>
            <TextInput
              label="Enter old password"
              style={styles.modalInput}
              secureTextEntry
              error={errorState.password}
              onChangeText={(text) =>
                setFormData({
                  ...formData,
                  password: text,
                })
              }
              required
            />
            <TextInput
              label="Enter new password"
              style={styles.modalInput}
              secureTextEntry
              error={errorState.newPassword}
              onChangeText={(text) => setNewPassword(text)}
              required
            />
            <TextInput
              label="Confirm password"
              style={styles.modalInput}
              secureTextEntry
              error={errorState.newPasswordConfirm}
              onChangeText={(text) => setNewPasswordConfirm(text)}
              required
            />
            <Button
              mode="contained"
              onPress={handlePasswordChange}
              style={{ width: "50%", color: "white", fontSize: 16 }}
            >
              Save
            </Button>
            <Button
              mode="outlined"
              onPress={handlePasswordModalClose}
              style={{ marginTop: 10, width: "50%" }}
            >
              Cancel
            </Button>
            <Text style={{ color: "red", fontSize: 15 }}>{passError}</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 60,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 3,
    padding: 5,
    marginBottom: 10,
  },
});

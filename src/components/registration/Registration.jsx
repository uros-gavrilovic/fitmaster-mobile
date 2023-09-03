import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { validateField } from "../../utils/utilFunctions";
import * as userActions from "../../actions/user";
import { useNavigation } from "@react-navigation/native";

const Registration = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    if (token !== undefined) {
      navigation.navigate("authorized");
    }
  }, [token]);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });

  const [errorState, setErrorState] = useState({
    firstname: false,
    lastname: false,
    username: false,
    password: false,
  });

  const handleRegistration = () => {
    const hasFirstNameError = validateField(
      formData.firstname,
      "firstname",
      setErrorState
    );
    const hasLastNameError = validateField(
      formData.lastname,
      "lastname",
      setErrorState
    );
    const hasUsernameError = validateField(
      formData.username,
      "username",
      setErrorState
    );
    const hasPasswordError = validateField(
      formData.password,
      "password",
      setErrorState
    );
    if (
      hasFirstNameError ||
      hasLastNameError ||
      hasUsernameError ||
      hasPasswordError
    )
      return;

    dispatch(
      userActions.register({
        username: formData.username,
        password: formData.password,
        firstName: formData.firstname,
        lastName: formData.lastname,
      })
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ width: "80%" }}>
        <Text style={{ fontSize: 24, marginBottom: 50, textAlign: "center" }}>
          Registration
        </Text>
        <TextInput
          placeholder="First Name"
          onChangeText={(text) => setFormData({ ...formData, firstname: text })}
          value={formData.firstname}
          error={errorState.firstname}
          mode="outlined"
          required
        />
        <TextInput
          placeholder="Last Name"
          onChangeText={(text) => setFormData({ ...formData, lastname: text })}
          value={formData.lastname}
          error={errorState.lastname}
          mode="outlined"
          required
        />
        <TextInput
          placeholder="Username"
          onChangeText={(text) => setFormData({ ...formData, username: text })}
          value={formData.username}
          error={errorState.username}
          mode="outlined"
          required
        />
        <TextInput
          placeholder="Password"
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          value={formData.password}
          error={errorState.password}
          mode="outlined"
          secureTextEntry
          required
        />
        <Button
          icon="login"
          mode="contained"
          onPress={handleRegistration}
          style={{ marginTop: 15, width: "90%", alignSelf: "center" }}
        >
          Register
        </Button>
      </View>
    </View>
  );
};

export default Registration;

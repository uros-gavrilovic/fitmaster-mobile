import React, { Fragment, useEffect, useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import { validateField } from "../../utils/utilFunctions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as userActions from "../../actions/user";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { ScrollView, View } from "react-native";
import createNotification from "../../utils/notificationService";

const Login = (props) => {
  const { t } = props || {};

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (token !== undefined) {
      navigation.navigate("authorized");
    }
  }, [token]);

  const [inputState, setInputState] = useState({
    username: "test",
    password: "test",
  });
  const [errorState, setErrorState] = useState({
    username: false,
    password: false,
  });

  const handleLogin = () => {
    const hasUsernameError = validateField(
      inputState.username,
      "username",
      setErrorState
    );
    const hasPasswordError = validateField(
      inputState.password,
      "password",
      setErrorState
    );

    if (hasUsernameError || hasPasswordError) return;

    dispatch(
      userActions.login(
        {
          username: inputState.username,
          password: inputState.password,
        },
        t?.messages
      )
    );
  };

  return (
    <ScrollView>
      <Fragment>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon icon={faDumbbell} size={200} beat />
          <Text style={{ fontSize: 30 }}>
            <Text>Fit</Text>
            <Text style={{ fontStyle: "italic" }}>Master</Text>
            <Text style={{ fontSize: 20, baseline: 10 }}>Mobile</Text>
          </Text>
        </View>
        <TextInput
          label="Username"
          mode="outlined"
          error={errorState.username}
          value={inputState.username}
          onChangeText={(text) =>
            setInputState({ ...inputState, username: text })
          }
          style={{ margin: 20 }}
        />
        <TextInput
          label="Password"
          mode="outlined"
          value={inputState.password}
          onChangeText={(text) =>
            setInputState({ ...inputState, password: text })
          }
          style={{ margin: 20 }}
        />
        <Button
          icon="login"
          mode="contained"
          onPress={handleLogin}
          style={{ marginTop: 15, width: "90%", alignSelf: "center" }}
        >
          Sign In
        </Button>
        <Button
          icon="account-plus"
          mode="contained"
          onPress={handleLogin}
          style={{ marginTop: 15, width: "90%", alignSelf: "center" }}
        >
          Register
        </Button>
      </Fragment>
    </ScrollView>
  );
};

export default Login;

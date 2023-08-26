import React, { Fragment, useEffect, useState } from "react";
import { Button, DefaultTheme, Text, TextInput } from "react-native-paper";
import { validateField } from "../../utils/utilFunctions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as userActions from "../../actions/user";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { View } from "react-native";
import withTranslations from "../../utils/HighOrderComponent";

const Login = (props) => {
  const { t } = props || {};

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.user);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

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

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon icon={faDumbbell} size={200} beat />
        <Text style={{ fontSize: 30 }}>
          <Text>Fit</Text>
          <Text style={{ fontStyle: "italic" }}>Master</Text>
          <View>
            <Text
              style={{
                marginTop: 10,
                marginLeft: 10,
                padding: 5,
                color: "white",
                fontSize: 15,
                backgroundColor: DefaultTheme.colors.primary,
                borderRadius: 8,
              }}
            >
              Mobile
            </Text>
          </View>
        </Text>
      </View>
      <TextInput
        label={t?.fields?.username}
        mode="outlined"
        error={errorState.username}
        value={inputState.username}
        onChangeText={(text) =>
          setInputState({ ...inputState, username: text })
        }
        style={{ margin: 20 }}
      />
      <TextInput
        label={t?.fields?.password}
        mode="outlined"
        value={inputState.password}
        onChangeText={(text) =>
          setInputState({ ...inputState, password: text })
        }
        secureTextEntry={secureTextEntry}
        right={
          <TextInput.Icon
            name={secureTextEntry ? "eye-off" : "eye"}
            onPress={toggleSecureEntry}
          />
        }
        style={{ margin: 20 }}
      />
      <Button
        icon="login"
        mode="contained"
        onPress={handleLogin}
        style={{ marginTop: 15, width: "90%", alignSelf: "center" }}
      >
        {t?.buttons?.login}
      </Button>
      <Button
        icon="account-plus"
        mode="contained"
        onPress={handleLogin}
        style={{ marginTop: 15, width: "90%", alignSelf: "center" }}
      >
        {t?.buttons?.register}
      </Button>
    </View>
  );
};

export default withTranslations(Login);

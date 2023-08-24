import { Fragment, useState } from "react";
import { Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { validateField } from "../../utils/utilFunctions";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../actions/user";
// import withTranslations from "../../utils/HighOrderComponent";

const Login = (props) => {
  const { t } = props || {};

  const dispatch = useDispatch();

  const [inputState, setInputState] = useState({
    username: "",
    password: "",
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
    <Fragment>
      <TextInput
        label="Username"
        mode="outlined"
        error={errorState.username}
        value={inputState.username}
        onChangeText={(text) =>
          setInputState({ ...inputState, username: text })
        }
      />
      <TextInput
        label="Password"
        mode="outlined"
        value={inputState.password}
        onChangeText={(text) =>
          setInputState({ ...inputState, password: text })
        }
      />
      <Button icon="login" mode="contained" onPress={handleLogin}>
        Sign In
      </Button>
    </Fragment>
  );
};

// export default withTranslations(Login);
export default Login;

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../components/login/Login";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const SecuredRoute = ({ component: Component, ...rest }) => {
  const { token } = useSelector((state) => state.user);

  return (
    <Stack.Screen
      {...rest}
      component={(props) => (token ? <Component {...props} /> : <Login />)}
    />
  );
};

export default SecuredRoute;

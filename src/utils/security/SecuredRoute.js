import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../components/login/Login";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const SecuredRoute = ({ route }) => {
  const { token } = useSelector((state) => state.user);

  const { securedComponent: SecuredComponent, component: LoginComponent } =
    route.params;

  return (
    <Stack.Screen
      name="home"
      component={(props) =>
        token ? <SecuredComponent {...props} /> : <LoginComponent {...props} />
      }
    />
  );
};

export default SecuredRoute;

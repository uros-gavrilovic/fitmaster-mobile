import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/components/login/Login";
import SecuredRoute from "./src/utils/security/SecuredRoute";
import { useDispatch } from "react-redux";
import { fetchAppInfo } from "./src/actions/user";
import { useEffect } from "react";

const Stack = createStackNavigator();

export default function MainComponent() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="dashboard" component={SecuredRoute} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

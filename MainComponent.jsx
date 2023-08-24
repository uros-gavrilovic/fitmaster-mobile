import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/components/login/Login";
import SecuredRoute from "./src/utils/security/SecuredRoute";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppInfo } from "./src/actions/user";
import { useEffect } from "react";
import Dashboard from "./src/components/app/dashboard/Dashboard";

const Stack = createStackNavigator();

export default function MainComponent() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!token ? (
          <Stack.Screen name="login" component={Login} />
        ) : (
          // whatever screens if user is logged in
          <Stack.Screen name="dashboard" component={Dashboard} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

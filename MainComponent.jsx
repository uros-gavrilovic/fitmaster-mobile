import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/components/login/Login";
import { useSelector } from "react-redux";
import Home from "./src/components/reusable/menu/CustomNavigator";
import { fetchAppInfo } from "./src/actions/user";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Registration from "./src/components/registration/Registration";

const Stack = createStackNavigator();

export default function MainComponent() {
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAppInfo());
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!token ? (
          <Stack.Screen
            name="login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="authorized"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
        )}
        <Stack.Screen name="Registration" component={Registration} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

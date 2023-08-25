import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/components/login/Login";
import { useSelector } from "react-redux";
import Home from "./src/components/reusable/menu/CustomNavigator";

const Stack = createStackNavigator();

export default function MainComponent() {
  const token = useSelector((state) => state.user.token);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!token ? (
          <Stack.Screen name="login" component={Login} />
        ) : (
          <Stack.Screen name="authorized" component={Home} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

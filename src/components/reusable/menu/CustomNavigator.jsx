import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CommonActions } from "@react-navigation/native";
import Scheduler from "../../app/scheduler/Scheduler";
import Settings from "../../app/settings/Settings";
import Home from "../../app/home/Home";
import Workout from "../../app/workout/Workout";
import withTranslations from "../../../utils/HighOrderComponent";

const Tab = createBottomTabNavigator();

const CustomNavigator = (props) => {
  const { t } = props || {};

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: t?.tabs?.home,
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="scheduler"
        component={Scheduler}
        options={{
          tabBarLabel: t?.tabs?.scheduler,
          tabBarIcon: ({ color, size }) => {
            return <Icon name="calendar" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="start-workout"
        component={Workout}
        options={{
          tabBarLabel: t?.tabs?.start_workout,
          tabBarIcon: ({ color, size }) => {
            return <Icon name="plus-circle" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          tabBarLabel: t?.tabs?.settings,
          tabBarIcon: ({ color, size }) => {
            return <Icon name="cog" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomNavigationBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default withTranslations(CustomNavigator);

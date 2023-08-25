import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CommonActions } from "@react-navigation/native";
import Scheduler from "../../app/scheduler/Scheduler";
import Settings from "../../app/settings/Settings";
import Home from "../../app/home/Home";
import CustomConfirmModal from "../modals/CustomConfirmModal";

const Tab = createBottomTabNavigator();

export default function CustomBottomNavigator(props) {
  const { t } = props || {};

  // const [openLogoutModal, setOpenLogoutModal] = useState(false);

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
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="scheduler"
        component={Scheduler}
        options={{
          tabBarLabel: "Scheduler",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="calendar" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="cog" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="logout"
        component={() => {
          return null;
        }}
        options={{
          tabBarLabel: "Log Out",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="logout" size={size} color={color} />;
          },
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            console.log("Log out");
            e.preventDefault(); // Prevent default action

            // Open the logout modal
            // setOpenLogoutModal(true);
          },
        })}
      />
    </Tab.Navigator>
  );
}

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

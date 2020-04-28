import React from "react";
import { Button, Text } from "expo-ui-kit";
import { createStackNavigator } from "@react-navigation/stack";
import styles from "./index.style";
import Signup from "./Signup";
import Login from "./Login";
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";

const Stack = createStackNavigator();

const AuthStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        headerTransparent: true,
        headerTitle: null,
        headerLeft: () => {
          return (
            <Button
              primary
              padding
              marginHorizontal
              onPress={() => navigation.navigate("App")}
            >
              <Text white small>
                MENU
              </Text>
            </Button>
          );
        },
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default AuthStack;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import styles from "./index.style";
import AppNavigation from "./AppNavigation";
import AuthStack from "./../components/Auth/index";
import { AsyncStorage } from "react-native";
import request from "./../utils/axios";
import axios from "axios";
import { URL } from "./../configs/end-points-url";
import { setUser, setUserFromAsyncStorage } from "./../redux/actions/user";
import { SplashScreen } from "expo";
import { Text } from "expo-ui-kit";

const Stack = createStackNavigator();

const AppContainer = () => {
  const [state, setState] = useState({
    userToken: null,
    isLoading: true,
    error: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    isLogin();
    return () => {};
  }, []);

  const isLogin = async () => {
    let userToken = null;

    // Check user from Async Storage, If user exist, setToken.
    try {
      userToken = await AsyncStorage.getItem("userToken");
    } catch (e) {
      userToken = null;
    }

    if (userToken == null) {
      setState({ ...state, isLoading: false });
      return;
    }

    // Create new axios request. getUser and save store
    request.server = axios.create({
      headers: {
        Authorization: "Bearer " + userToken,
        "Content-Type": "application/json",
      },
    });

    try {
      const response = await request.server.get(URL.GET_USER());
      const data = response.data;

      console.log("GO HERE HEHE");

      // If exist user, userToken is right, return to App Screen
      // and dispatch User Information to Store;
      if (data.user) {
        setState({ ...state, isLoading: false, userToken: userToken });
        dispatch(setUser(data.user));
      } else {
        throw new Error("Can not retrive user !");
      }
    } catch (error) {
      // If error by Network, userToken is wrong, return to App Container
      // and dispatch User Information from AsyncStore to store
      setState({ ...state, isLoading: false, userToken: null });
      dispatch(setUserFromAsyncStorage());
    }
  };

  if (state.isLoading) {
    return <Text>"Hihi"</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={"none"}>
        <Stack.Screen name="App" component={AppNavigation} />
        <Stack.Screen name="Auth" component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;

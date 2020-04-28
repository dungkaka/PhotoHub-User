import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import styles from "./index.style";
import AppNavigation from "./AppNavigation";
import AuthStack from "./../components/Auth/index";
import { AsyncStorage, Text } from "react-native";
import request from "./../utils/axios";
import axios from "axios";
import { URL } from "./../configs/end-points-url";
import { setUser, setUserFromAsyncStorage } from "./../redux/actions/user";
import SpashScreen from "./../components/Common/SplashScreen/index";
import { useDidMountEffect } from "./../utils/custom-hook";

const Stack = createStackNavigator();

const AppContainer = () => {
  const login = useSelector((store) => store.login);

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

  useDidMountEffect(() => {
    if (login.status == "log-out") {
      setState({ ...state, isLoading: true });
      dispatch({ type: "RESET_DATA" });
      setTimeout(() => setState({ ...state, isLoading: false }), 2500);
    }
  }, [login.status]);
  console.log("RENDER LAI NE");

  const isLogin = async () => {
    let userToken = null;

    // Check user from Async Storage, If user exist, setToken. Else, do nothing, directly go app.
    try {
      userToken = await AsyncStorage.getItem("userToken");
    } catch (e) {
      userToken = null;
    }

    if (userToken == null) {
      setTimeout(() => setState({ ...state, isLoading: false }), 2500);
      return;
    }

    // Create new axios request. getUser and save store
    request.server = axios.create({
      // timeout: 5,
      headers: {
        Authorization: "Bearer " + userToken,
        "Content-Type": "application/json",
      },
    });

    try {
      const response = await request.server.get(URL.GET_USER());
      const data = response.data;

      // If exist user, userToken is right, return to App Screen
      // and dispatch User Information to Store;
      if (data.user) {
        dispatch(setUser(data.user));
        setTimeout(
          () => setState({ ...state, isLoading: false, userToken: userToken }),
          2500
        );
      } else {
        throw new Error("Can not retriev user !");
      }
    } catch (error) {
      // If error by Network, userToken is wrong, return to App Container
      // and dispatch User Information from AsyncStore to store
      dispatch(setUserFromAsyncStorage());
      setTimeout(() => {
        setState({ ...state, isLoading: false, userToken: null });
      }, 2500);
    }
  };

  if (state.isLoading) {
    return <SpashScreen></SpashScreen>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="App" component={AppNavigation} />
        <Stack.Screen name="Auth" component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;

import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, Button, Text } from "react-native";
import { Block } from "expo-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/login";
import { setUserFromServer } from "./../../redux/actions/user";

const Login = (props) => {
  const dispatch = useDispatch();
  const loginState = useSelector((store) => store.login);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (loginState.user != null) {
      dispatch(setUserFromServer());
      props.navigation.navigate("Hub");
    }
    return () => {};
  }, [loginState.user]);

  console.log(loginState);

  return (
    <Block center middle>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Sign in"
        onPress={() => {
          dispatch(login({ username, password }));
        }}
      />
      <Text>{JSON.stringify(loginState.user)}</Text>
    </Block>
  );
};

export default Login;

const styles = StyleSheet.create({});

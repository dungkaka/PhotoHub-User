import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Block } from "expo-ui-kit";
import { useGoBackHandler } from "../../utils/custom-hook";

const Signup = (props) => {
  useGoBackHandler(props.navigation);

  return (
    <Block center middle>
      <Text> Signup </Text>
    </Block>
  );
};

export default Signup;

const styles = StyleSheet.create({});

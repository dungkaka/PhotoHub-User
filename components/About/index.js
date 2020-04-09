import React from "react";
import { StyleSheet, View } from "react-native";
import { Block } from "expo-ui-kit";
import { Button, Text } from "expo-ui-kit/src";

const About = ({ navigation }) => {
  console.log("ABOUT NE");
  return (
    <Block center middle>
      <Text> About </Text>
      <Button
        onPress={() => {
          navigation.navigate("Image Detail", { dung: "HANDAA" });
        }}
      >
        <Text white>GO PHOTOHUB</Text>
      </Button>
    </Block>
  );
};

export default About;

const styles = StyleSheet.create({});

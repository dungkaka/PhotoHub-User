import React from "react";
import { StyleSheet, View } from "react-native";
import { Block } from "expo-ui-kit";
import { Button, Text } from "expo-ui-kit/src";

const About = ({ navigation }) => {
  console.log("ABOUT NE");
  return (
    <View
      style={{
        marginTop: 100,
        backgroundColor: "pink",
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={{
            height: 200,
            backgroundColor: "blue",
            flex: 0.5,
          }}
        >
          {/* <View style={{ flex: 1 }}></View>
          <View style={{ flex: 0.5, backgroundColor: "black" }}></View> */}
        </View>
        <View style={{ backgroundColor: "red", flex: 1 }}></View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Button
          style={{ flex: 0.5 }}
          onPress={() => {
            navigation.navigate("Image Detail", { dung: "HANDAA" });
          }}
        >
          <Text white>GO PHOTOHUB</Text>
        </Button>
      </View>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({});

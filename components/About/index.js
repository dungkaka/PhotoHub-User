import React from "react";
import { StyleSheet, View } from "react-native";
import { Block } from "expo-ui-kit";
import { Button, Text } from "expo-ui-kit/src";

const About = ({ navigation }) => {
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
        ></View>
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: "pink",
              shadowColor: "#000",
              shadowOffset: {
                width: 20,
                height: 10,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          />
        </View>
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

import React from "react";
import { View } from "react-native";
import { Button, Text } from "expo-ui-kit/src";
import { useNavigation, useRoute } from "@react-navigation/native";

const ImageDetail = () => {
  const navigation = useNavigation();
  // route fo from HubContainer
  const route = useRoute();
  const { name, likes, id, tags, dung } = route.params || {};

  console.log("Image Detail Render");
  return (
    <View>
      <Text> {name} </Text>
      <Text> {likes} </Text>
      <Text> {dung} </Text>
      <Text> {tags} </Text>
      <Button
        onPress={() => {
          navigation.navigate("Hub");
        }}
      >
        <Text white> NAVIGATE HOME </Text>
      </Button>

      <Button
        onPress={() => {
          navigation.navigate("Hub", { hehe: "234" });
        }}
      >
        <Text white> NAVIGATE PARAMS HOME </Text>
      </Button>

      <Button
        onPress={() => {
          navigation.navigate("Image Detail");
        }}
      >
        <Text white> NAVIGATE DETAIL </Text>
      </Button>

      <Button
        onPress={() => {
          navigation.navigate("Image Detail", { dung: Math.random() });
        }}
      >
        <Text white> NAVIGATE PARAMS DETAIL </Text>
      </Button>

      <Button
        onPress={() => {
          navigation.push("Image Detail");
        }}
      >
        <Text white> PUSH DETAIL </Text>
      </Button>

      <Button
        onPress={() => {
          navigation.replace("Image Detail");
        }}
      >
        <Text white> REPLACE DETAIL </Text>
      </Button>
    </View>
  );
};

export default ImageDetail;

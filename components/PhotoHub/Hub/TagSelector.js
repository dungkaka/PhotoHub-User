import React from "react";
import { View, Text } from "react-native";
import { Button, Block } from "expo-ui-kit/src";

const TagSelector = ({ navigation }) => {
  return (
    <Block middle center>
      <Button
        onPress={() =>
          navigation.navigate("HubContainer", {
            tags: ["adult"],
          })
        }
      >
        <Text> GO TO HUB </Text>
      </Button>
      <Button
        onPress={() =>
          navigation.navigate("HubContainer", {
            tags: ["123", "582"],
          })
        }
      >
        <Text> GO TO HUB </Text>
      </Button>
    </Block>
  );
};

export default TagSelector;

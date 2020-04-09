import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "expo-ui-kit";
import Hub from "./Hub/index";
import ImageDetail from "./ImageDetail/index";
import { createStackNavigator } from "@react-navigation/stack";
import Animated from "react-native-reanimated";
import styles from "./index.style";

const Stack = createStackNavigator();

const PhotoHub = ({ navigation, style }) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: false,
          headerTitle: null,
          headerLeft: () => {
            return (
              <Button
                primary
                padding
                marginHorizontal
                onPress={() => navigation.openDrawer()}
              >
                <Text white small>
                  MENU
                </Text>
              </Button>
            );
          },
        }}
      >
        <Stack.Screen name="Hub" component={Hub} />
        <Stack.Screen name="Image Detail" component={ImageDetail} />
      </Stack.Navigator>
    </Animated.View>
  );
};

export default PhotoHub;

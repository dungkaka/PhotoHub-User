import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "expo-ui-kit";
import Hub from "./Hub/index";
import ImageDetail from "./ImageDetail/index";
import { createStackNavigator } from "@react-navigation/stack";
import Animated from "react-native-reanimated";
import styles from "./index.style";
import ImageZoom from "./ImageDetail/ImageZoom";
import { color } from "./../../utils/f";

const Stack = createStackNavigator();

const PhotoHub = ({ navigation, style }) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator headerMode="float">
        <Stack.Screen
          options={{
            title: null,
            headerTransparent: true,
          }}
          name="Hub"
          component={Hub}
        />
        <Stack.Screen
          name="Image Detail"
          component={ImageDetail}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerBackground: () => (
              <View
                style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.3)" }}
              />
            ),
            headerTintColor: color.gray10,
          }}
        />
        <Stack.Screen
          name="Image Zoom"
          component={ImageZoom}
          options={{
            title: null,
            headerShown: true,
            headerTransparent: true,
            headerBackground: () => (
              <View
                style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.3)" }}
              />
            ),
            headerTintColor: color.gray10,
          }}
        />
      </Stack.Navigator>
    </Animated.View>
  );
};

export default PhotoHub;

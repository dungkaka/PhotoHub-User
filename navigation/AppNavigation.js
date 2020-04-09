import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./index.style";

// import the screen
import About from "../components/About/index";
import PhotoHub from "../components/PhotoHub/index";
import Animated from "react-native-reanimated";

const Drawer = createDrawerNavigator();

export default () => {
  const [progress, setProgress] = useState(new Animated.Value(0));

  // create animation for screen scale
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8]
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 10]
  });

  const animatedStyle = { borderRadius, transform: [{ scale }] };

  return (
    <LinearGradient style={{ flex: 1 }} colors={["pink", "red"]}>
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        contentContainerStyle={{ flex: 1 }}
        drawerStyle={styles.drawerStyles}
        drawerContentOptions={{
          activeBackgroundColor: "transparent",
          activeTintColor: "white",
          inactiveTintColor: "white"
        }}
        sceneContainerStyle={{ backgroundColor: "transparent" }}
        initialRouteName="PhotoHub"
        drawerContent={props => {
          setProgress(props.progress);
          return <DrawerContent {...props} />;
        }}
      >
        <Drawer.Screen name="PhotoHub">
          {props => <PhotoHub {...props} style={animatedStyle} />}
        </Drawer.Screen>
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </LinearGradient>
  );
};

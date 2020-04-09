import React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import HubContainer from "./HubContainer";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TagSelector from "./TagSelector";

const Drawer = createDrawerNavigator();

const Container = () => {
  const dimensions = useWindowDimensions();
  const widthDrawer = Math.ceil(0.6 * dimensions.width);

  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerType={dimensions.width > 900 ? "permanent" : "front"}
      drawerStyle={{
        width: widthDrawer,
      }}
      drawerContent={(props) => {
        return <TagSelector {...props} />;
      }}
    >
      <Drawer.Screen
        name="HubContainer"
        component={HubContainer}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default Container;

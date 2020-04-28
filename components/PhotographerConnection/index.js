import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MapContainer from "./Map/index";
import Animated from "react-native-reanimated";
import styles from "./index.styles";
import { AntDesign } from "@expo/vector-icons";
import Home from "./Home/index";
import Search from "./Search/index";
import ChatContainer from "./Chat/index";

const Stack = createStackNavigator();

const PhotographerConnection = ({ navigation, style }) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator headerMode="float">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerLeft: ({ onPress }) => (
              <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={{
                  opacity: 0.8,
                  marginLeft: 20,
                  marginTop: 10,
                  // backgroundColor: "white",
                  padding: 10,
                  borderRadius: 10,
                  shadowColor: "black",
                  shadowOpacity: 0.8,
                  shadowRadius: 5,
                  elevation: 5,
                  alignContent: "center",
                }}
              >
                <AntDesign name="menufold" size={26} color="white"></AntDesign>
              </TouchableOpacity>
            ),
            headerTransparent: true,
            headerTitle: null,
          }}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapContainer}
          options={{
            headerLeft: ({ onPress }) => (
              <TouchableOpacity
                onPress={() => onPress()}
                style={{
                  opacity: 0.8,
                  marginLeft: 16,
                  backgroundColor: "white",
                  padding: 6,
                  borderRadius: 100,
                  shadowColor: "black",
                  shadowOpacity: 0.8,
                  shadowRadius: 5,
                  elevation: 5,
                  alignContent: "center",
                }}
              >
                <AntDesign name="arrowleft" size={24}></AntDesign>
              </TouchableOpacity>
            ),
            headerTransparent: true,
            headerTitle: null,
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            cardStyle: {
              backgroundColor: "white",
            },
            headerStyle: {
              elevation: 0,
            },
            headerLeft: ({ onPress }) => (
              <TouchableOpacity
                onPress={() => onPress()}
                style={{
                  opacity: 0.8,
                  marginLeft: 16,
                  backgroundColor: "white",
                  padding: 6,
                  borderRadius: 100,
                  shadowColor: "black",
                  shadowOpacity: 0.8,
                  shadowRadius: 5,
                  elevation: 5,
                  alignContent: "center",
                }}
              >
                <AntDesign name="arrowleft" size={24}></AntDesign>
              </TouchableOpacity>
            ),
            headerTransparent: false,
            headerTitle: null,
          }}
        />

        <Stack.Screen
          name="ChatScreen"
          component={ChatContainer}
          options={{
            headerLeft: ({ onPress }) => (
              <TouchableOpacity
                onPress={() => onPress()}
                style={{
                  opacity: 0.8,
                  marginLeft: 16,
                  backgroundColor: "white",
                  padding: 6,
                  borderRadius: 100,
                  shadowColor: "black",
                  shadowOpacity: 0.8,
                  shadowRadius: 5,
                  elevation: 5,
                  alignContent: "center",
                }}
              >
                <AntDesign name="arrowleft" size={24}></AntDesign>
              </TouchableOpacity>
            ),
            headerTransparent: false,
            headerTitle: null,
          }}
        />
      </Stack.Navigator>
    </Animated.View>
  );
};

export default PhotographerConnection;
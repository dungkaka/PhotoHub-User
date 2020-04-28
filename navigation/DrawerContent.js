import React from "react";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { Block, Text, Button } from "expo-ui-kit";
import { Image, View, Alert, BackHandler } from "react-native";
import styles from "./index.style";
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

const background = require("./../assets/images/logo-4.png");

const Header = (props) => {
  const navigation = props.rootNavigation;
  const { user } = useSelector((store) => store.user);

  if (user == null) {
    return (
      <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
        <View style={{ flexDirection: "row", height: 30 }}>
          <Image
            source={background}
            style={{ width: "100%", height: "100%" }}
            // resizeMode="center"
          />
        </View>

        <Text white size={14}>
          hdbluetc@gmail.com
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Button
            style={{
              flexDirection: "row",
              backgroundColor: "lightgray",
              paddingVertical: 5,
              paddingHorizontal: 20,
              marginTop: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
              borderRadius: 15,
              borderWidth: 1,
              borderColor: "white",
            }}
            onPress={() => {
              // props.navigation.closeDrawer();
              navigation.navigate("Auth");
            }}
          >
            <AntDesign
              name="login"
              color="white"
              size={20}
              style={{ marginRight: 5 }}
            />
            <Text style={{ color: "white" }}> LOGIN </Text>
          </Button>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
        <View style={{ flexDirection: "row", height: 30 }}>
          <Image
            source={background}
            style={{ width: "100%", height: "100%" }}
            // resizeMode="center"
          />
        </View>
        <Text white title>
          {user.name ? user.name : user.username}
        </Text>
        <Text white size={12}>
          {user.email}
        </Text>
      </View>
    );
  }
};

const DrawerContent = (props) => {
  const navigation = props.navigation;
  const dispatch = useDispatch();

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start",
          marginVertical: 40,
        }}
      >
        <View
          styles={{
            flex: 10,
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Header {...props}></Header>

          <DrawerItem
            label="PhotoHub"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            icon={() => (
              <MaterialCommunityIcons
                name="image-search"
                color="white"
                size={20}
                style={{ marginRight: -16 }}
              />
            )}
            onPress={() => navigation.jumpTo("PhotoHub")}
          />
          <DrawerItem
            label="Collection"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            icon={() => (
              <MaterialCommunityIcons
                name="image-album"
                color="white"
                size={20}
                style={{ marginRight: -16 }}
              />
            )}
            onPress={() => navigation.jumpTo("Collection")}
          />

          <DrawerItem
            label="Booking"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            icon={() => (
              <FontAwesome5
                name="map-marked-alt"
                color="white"
                size={20}
                style={{ marginRight: -16 }}
              />
            )}
            onPress={() => navigation.jumpTo("PhotographerConnection")}
          />

          <DrawerItem
            label="About"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            icon={() => (
              <MaterialCommunityIcons
                name="information-variant"
                color="white"
                size={20}
                style={{ marginRight: -16 }}
              />
            )}
            onPress={() => navigation.jumpTo("About")}
          />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <DrawerItem
            label="Logout"
            labelStyle={[
              styles.drawerLabel,
              { color: "white", marginBottom: 5 },
            ]}
            icon={() => <AntDesign name="logout" color="white" size={20} />}
            onPress={() => {
              Alert.alert(
                "Alert",
                "Are you sure to logout !",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => dispatch({ type: "LOGOUT" }),
                  },
                ],

                { cancelable: false }
              );
            }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

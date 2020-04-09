import React from "react";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { Block, Text, Button } from "expo-ui-kit";
import { Image } from "react-native";
import styles from "./index.style";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const Header = (props) => {
  const user = useSelector((store) => store.user);

  if (user.user == null) {
    return (
      <Block flex={0.4} margin={20} bottom>
        <Image
          source={{
            uri:
              "https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png",
            height: 60,
            width: 60,
            scale: 0.5,
          }}
          resizeMode="center"
          style={styles.avatar}
        />
        <Button
          title="Login"
          onPress={() => props.navigation.navigate("Auth")}
        ></Button>
        <Text white title>
          React UI Kit
        </Text>
        <Text white size={9}>
          contact@react-ui-kit.com
        </Text>
      </Block>
    );
  } else {
    return (
      <Block flex={0.4} margin={20} bottom>
        <Text white title>
          {user.user.username}
        </Text>
        <Text white size={9}>
          {user.user.email}
        </Text>
      </Block>
    );
  }
};

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{ flex: 1 }}
    >
      <Block>
        <Header {...props}></Header>

        <DrawerItem
          label="PhotoHub"
          labelStyle={styles.drawerLabel}
          style={styles.drawerItem}
          icon={() => (
            <AntDesign
              name="dashboard"
              color="white"
              size={16}
              style={{ marginRight: -16 }}
            />
          )}
          onPress={() => props.navigation.navigate("PhotoHub")}
        />
        <DrawerItem
          label="Image Detail"
          labelStyle={styles.drawerLabel}
          style={styles.drawerItem}
          icon={() => (
            <AntDesign
              name="message1"
              color="white"
              size={16}
              style={{ marginRight: -16 }}
            />
          )}
          onPress={() => props.navigation.navigate("Image Detail")}
        />
        <DrawerItem
          label="About"
          labelStyle={styles.drawerLabel}
          style={styles.drawerItem}
          icon={() => (
            <AntDesign
              name="message1"
              color="white"
              size={16}
              style={{ marginRight: -16 }}
            />
          )}
          onPress={() => props.navigation.navigate("About")}
        />
      </Block>

      <Block flex={false}>
        <DrawerItem
          label="Logout"
          labelStyle={{ color: "white" }}
          icon={() => <AntDesign name="logout" color="white" size={16} />}
          onPress={() => alert("Are your sure to logout?")}
        />
      </Block>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

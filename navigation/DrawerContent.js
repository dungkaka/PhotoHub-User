import React from "react";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { Block, Text, Button } from "expo-ui-kit";
import { Image, View } from "react-native";
import styles from "./index.style";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const Header = (props) => {
  const user = useSelector((store) => store.user);

  if (user.user == null) {
    return (
      <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
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
        <Text white title>
          PHOTOHUB
        </Text>
        <Text white size={12}>
          hdbluetc@gmail.com
        </Text>
        <View style={{ flex: 0, flexDirection: "row" }}>
          <Button
            style={{
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
            onPress={() => props.navigation.navigate("Auth")}
          >
            <Text style={{ color: "white" }}> LOGIN </Text>
          </Button>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
        <Text white title>
          {user.user.username}
        </Text>
        <Text white size={10}>
          {user.user.email}
        </Text>
      </View>
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
              <AntDesign
                name="dashboard"
                color="white"
                size={18}
                style={{ marginRight: -16 }}
              />
            )}
            onPress={() => props.navigation.navigate("PhotoHub")}
          />
          <DrawerItem
            label="Collection"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            icon={() => (
              <AntDesign
                name="message1"
                color="white"
                size={18}
                style={{ marginRight: -16 }}
              />
            )}
            onPress={() => props.navigation.navigate("Collection")}
          />
          <DrawerItem
            label="About"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            icon={() => (
              <AntDesign
                name="message1"
                color="white"
                size={18}
                style={{ marginRight: -16 }}
              />
            )}
            onPress={() => props.navigation.navigate("About")}
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
            labelStyle={{ color: "white" }}
            icon={() => <AntDesign name="logout" color="white" size={18} />}
            onPress={() => alert("Are your sure to logout?")}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;

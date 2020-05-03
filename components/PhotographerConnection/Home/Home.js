import React from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const W = Dimensions.get("window").width;
const H = Dimensions.get("window").height;

const ICON_SIZE = 26;

const HeaderBlock = () => (
  <View>
    <LinearGradient
      colors={["#f48fb1", "#ff4081"]}
      style={styles.headerBlock}
    />
  </View>
);

const Item = ({ text, icon, color1, color2, onPress }) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <LinearGradient
      start={{ x: 0.0, y: 0.25 }}
      end={{ x: 0.5, y: 1.0 }}
      locations={[0, 0.75]}
      colors={[color1, color2]}
      style={styles.iconContainer}
    >
      {icon}
    </LinearGradient>
    <View style={styles.textContainer}>
      <Text style={[styles.text, { color: color2 }]}>{text}</Text>
    </View>
  </TouchableOpacity>
);

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle="light-content" /> */}
      <View style={styles.container}>
        <HeaderBlock />

        <View flex={1} style={{ backgroundColor: "transparent" }}></View>
        <View style={styles.headerTextContainer}>
          <View height={20} />
          <Text style={styles.headerText}>SEARCH CAMERAMAN</Text>
          <View height={5} />
          <Text style={styles.subHeaderText}>Let's have fun !</Text>
        </View>

        <View style={styles.block}>
          <View style={styles.row}>
            <Item
              onPress={() => navigation.navigate("MapScreen")}
              color1="#81d4fa"
              color2="#039be5"
              text="General"
              icon={
                <AntDesign
                  name="appstore1"
                  size={ICON_SIZE}
                  style={styles.icon}
                />
              }
            />
            <Item
              onPress={() => navigation.navigate("ChatActive")}
              color1="#b39ddb"
              color2="#651fff"
              text="Active Chat"
              icon={
                <FontAwesome name="bus" size={ICON_SIZE} style={styles.icon} />
              }
            />
          </View>
          <View style={styles.row}>
            <Item
              onPress={() => navigation.navigate("ChatInActive")}
              color1="#f48fb1"
              color2="#ff4081"
              text="History"
              icon={
                <FontAwesome
                  name="shopping-bag"
                  size={ICON_SIZE}
                  style={styles.icon}
                />
              }
            />
            <Item
              color1="#ffcc80"
              color2="#ff6d00"
              text="Bills"
              icon={
                <FontAwesome
                  name="file-text"
                  size={ICON_SIZE}
                  style={styles.icon}
                />
              }
            />
          </View>
          {/* <View style={styles.row}>
            <Item
              color1="#90caf9"
              color2="#2962ff"
              text="Entertainment"
              icon={
                <FontAwesome
                  name="youtube-play"
                  size={ICON_SIZE}
                  style={styles.icon}
                />
              }
            />
            <Item
              color1="#a5d6a7"
              color2="#00c853"
              text="Grocery"
              icon={
                <SvgIcon color="white" size={ICON_SIZE} data={groceryData} />
              }
            />
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1B2E",
  },

  headerBlock: {
    position: "absolute",
    marginLeft: -W * 0.5,
    marginTop: H * 0.65,
    width: W * 1.2,
    height: H * 0.5,
    backgroundColor: "#ff4081",
    borderRadius: 60,
    transform: [{ rotateX: "0deg" }, { rotateZ: "-45deg" }],
  },

  headerTextContainer: { margin: 30 },
  headerText: { color: "white", fontSize: 24, fontWeight: "700" },
  subHeaderText: { color: "white", fontSize: 16, fontWeight: "400" },

  block: {
    justifyContent: "flex-end",
  },

  row: {
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  iconContainer: {
    marginTop: 16,
    height: 64,
    width: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    color: "#ffffff",
  },

  itemContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: W / 2 - 30,
    height: W / 2 - 20,
    backgroundColor: `rgba(40, 43, 71, 0.9)`,
    borderRadius: 24,
  },

  textContainer: {
    paddingVertical: 12,
  },

  text: { fontWeight: "700" },
});

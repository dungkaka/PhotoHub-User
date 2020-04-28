import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { delay } from "../../../utils/f";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./index.styles";
const window = Dimensions.get("window");

const ModalSearch = ({ visible }) => {
  const navigation = useNavigation();
  const refSearch = useRef();
  const [reLoad, setReLoad] = useState(false);

  useEffect(() => {
    switchModal(visible);
  }, [visible]);

  const switchModal = async (visible) => {
    switch (visible) {
      case true:
        refSearch.current.snapTo(0);
        await delay(100);
        setReLoad(!reLoad);
        break;
      case false:
        refSearch.current.snapTo(1);
        await delay(100);
        setReLoad(!reLoad);
        break;
      default:
        break;
    }
  };

  const renderSearch = () => (
    <View
      style={{
        height: window.height * 0.3,
        width: "100%",
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("Search")}
        style={styles.inputContainer}
      >
        <MaterialCommunityIcons
          name="lastpass"
          style={styles.inputIcon}
        ></MaterialCommunityIcons>
        <Text style={styles.input}> Location </Text>
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => (
    <View
      style={{ height: 640, width: "100%", backgroundColor: "blue" }}
    ></View>
  );

  return (
    <View
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
      }}
    >
      <BottomSheet
        ref={refSearch}
        // initialSnap={visible ? 1 : 2}
        snapPoints={["30%", 0]}
        renderContent={renderContent}
        renderHeader={renderSearch}
        enabledGestureInteraction={false}
        enabledBottomInitialAnimation={true}
      />
    </View>
  );
};

export default ModalSearch;

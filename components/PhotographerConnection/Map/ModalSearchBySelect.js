import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import { useFocusEffect } from "@react-navigation/native";
import { delay, color } from "../../../utils/f";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { stickRef } from "./createRefModal";
const window = Dimensions.get("window");

const ModalSearchbySelect = forwardRef(({ reset, searchRegion }, ref) => {
  const refSearch = useRef();

  // const onBackPress = useCallback(() => {
  //   reset();
  //   return true;
  // });

  // useFocusEffect(() => {
  //   // BackHandler.addEventListener("hardwareBackPress", onBackPress);

  //   return () =>
  //     BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  // }, []);

  useImperativeHandle(ref, () => ({
    async open() {
      await delay(350);
      refSearch.current.snapTo(0);
    },
    async close() {
      await delay(100);
      refSearch.current.snapTo(1);
    },
  }));

  const renderSearch = () => (
    <View
      style={{
        padding: 10,
        height: window.height * 0.3,
        width: "100%",
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 1,
      }}
    >
      <TouchableOpacity
        onPress={() => reset()}
        style={{
          opacity: 0.8,
          marginLeft: 5,
          padding: 6,
          alignContent: "center",
        }}
      >
        <AntDesign name="arrowleft" size={26}></AntDesign>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => searchRegion()}>
        <View
          style={[
            styles.typeLocation,
            { borderColor: "transparent", backgroundColor: color.greenBlue },
          ]}
        >
          <Entypo
            name="home"
            style={[styles.typeIcon, { color: "white" }]}
          ></Entypo>
          <Text style={[styles.type, { color: "white" }]}> Your Location </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => (
    <View
      style={{ height: 500, width: "100%", backgroundColor: "white" }}
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
        initialSnap={1}
        snapPoints={["30%", 0]}
        renderContent={renderContent}
        renderHeader={renderSearch}
        enabledGestureInteraction={false}
        enabledBottomInitialAnimation={true}
      />
    </View>
  );
});

export default stickRef(ModalSearchbySelect);

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "white",
    flex: 1,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    padding: 30,
    elevation: 10,
  },
  typeLocation: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: color.gray0,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: color.gray2,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  typeIcon: {
    paddingHorizontal: 10,
    fontSize: 22,
    color: color.blueModern2,
  },
  type: {
    fontSize: 14,
    color: color.gray5,
  },
});

import React, { useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  FlatList,
} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const ModalResult = ({ reset, nears }) => {
  const navigation = useNavigation();
  const refSearch = useRef();

  useEffect(() => {
    const onBackPress = () => {
      reset();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, []);

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
    </View>
  );

  const renderContent = () => (
    <View style={{ height: 640, width: "100%", backgroundColor: "blue" }}>
      <FlatList
        style={{ margin: 4 }}
        numColumns={2}
        keyExtractor={(item) => item.locationId}
        data={nears}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              console.log("GO GO GO");
              navigation.navigate("ChatScreen", { photographer: item });
            }}
          >
            <Text style={{ backgroundColor: "green", margin: 10, padding: 10 }}>
              {item.photographerInfor.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
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
        snapPoints={["80%", "50", "30%"]}
        renderContent={renderContent}
        renderHeader={renderSearch}
        enabledBottomInitialAnimation={true}
      />
    </View>
  );
};

export default ModalResult;

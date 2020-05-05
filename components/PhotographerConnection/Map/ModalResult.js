import React, {
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  View,
  Text,
  Dimensions,
  BackHandler,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { stickRef } from "./createRefModal";
import { delay } from "../../../utils/f";
import { color } from "./../../../utils/f";
import CustomLinearGradient from "./../../Common/LinearGradient/index";
import { TouchableOpacity } from "react-native-gesture-handler";
import { haversine_distance } from "./../../../utils/map";
const window = Dimensions.get("window");
const avatar_1 =
  "https://firebasestorage.googleapis.com/v0/b/photohub-e7e04.appspot.com/o/avatar%2Favatar_1.jpg?alt=media&token=3efbdede-a9ca-4bd6-95f3-9cd9383e6379";

const ModalResult = forwardRef(
  ({ reset, nears, labelSearch, locationSearch }, ref) => {
    const navigation = useNavigation();
    const refSearch = useRef();

    useFocusEffect(
      useCallback(() => {
        const onBackPress = () => {
          reset();
          return true;
        };
        BackHandler.addEventListener("hardwareBackPress", onBackPress);

        return () =>
          BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      }, [])
    );

    const renderResult = (photographer) => {
      const { name, age, gender, address } = photographer.photographerInfor;
      const distance = haversine_distance(locationSearch, photographer);

      return (
        <View style={styles.containerResult}>
          <CustomLinearGradient>
            <View style={styles.result}>
              {/* Image and detail of photogeapher */}
              <View style={styles.topResult}>
                <Image
                  style={styles.image}
                  source={{
                    uri: avatar_1,
                  }}
                ></Image>

                <View style={styles.contentResult}>
                  <Text
                    style={{ fontWeight: "bold", fontSize: 20, color: "white" }}
                  >
                    Name: {name}
                  </Text>
                  <Text
                    style={{
                      color: color.gray8,
                      fontStyle: "italic",
                      color: "white",
                    }}
                  >
                    {gender} - {age}
                  </Text>
                </View>
              </View>

              {/* Distane and go to connect */}
              <View style={styles.bottomResult}>
                <View style={styles.distance}>
                  <Text style={styles.numberDistance}>
                    {" "}
                    {(1000 * distance).toFixed(0)}
                  </Text>
                  <Text style={styles.unit}> metter</Text>
                </View>

                <TouchableOpacity
                  style={styles.buttonConnect}
                  onPress={() => {
                    navigation.push("Chat", {
                      photographer: {
                        ...photographer.photographerInfor,
                        id: photographer.photographerId,
                      },
                      location: photographer,
                      distance: distance,
                    });
                  }}
                >
                  <Text style={styles.textConnect}>Connect</Text>
                </TouchableOpacity>
              </View>
            </View>
          </CustomLinearGradient>
        </View>
      );
    };

    const renderSearch = () => (
      <View style={styles.headerContainer}>
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <Entypo
            name="location-pin"
            size={20}
            color={color.blueModern1}
          ></Entypo>
          <Text style={styles.textLabelSearch}>
            {labelSearch ? labelSearch : ""}
          </Text>
        </View>
      </View>
    );

    const renderContent = () => (
      <View style={styles.contentContainer}>
        {nears.length > 0 ? (
          <View>
            <FlatList
              keyboardDismissMode="on-drag"
              keyExtractor={(item) => item.locationId}
              data={nears}
              renderItem={({ item }) => renderResult(item)}
            />
            <FlatList
              keyboardDismissMode="on-drag"
              keyExtractor={(item) => item.locationId}
              data={nears}
              renderItem={({ item }) => renderResult(item)}
            />
            <FlatList
              keyboardDismissMode="on-drag"
              keyExtractor={(item) => item.locationId}
              data={nears}
              renderItem={({ item }) => renderResult(item)}
            />
          </View>
        ) : (
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              letterSpacing: 1,
              marginVertical: 10,
            }}
          >
            Sorry! No Photographer works in this area!
          </Text>
        )}
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
          snapPoints={["80%", "40%"]}
          renderContent={renderContent}
          renderHeader={renderSearch}
          enabledBottomInitialAnimation={true}
          enabledImperativeSnapping={true}
          // enabledGestureInteraction={false}
        />
      </View>
    );
  }
);

export default stickRef(ModalResult, "CLEAN_UP");

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  contentContainer: {
    minHeight: "100%",
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  textLabelSearch: {
    // marginHorizontal: 10,
    // borderRadius: 20,
    // borderColor: color.greenBlue,
    // borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
    color: color.blueModern1,
    flex: 1,
    textAlignVertical: "center",
    maxHeight: 60,
    fontSize: 18,
  },
  containerResult: {
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "transparent",
    overflow: "hidden",
    elevation: 3,
  },
  result: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "column",
  },
  image: {
    borderRadius: 200,
    height: window.width / 6,
    width: window.width / 6,
  },
  contentResult: {
    paddingStart: 15,
    flex: 2,
  },
  topResult: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomResult: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  distance: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  numberDistance: {
    fontSize: 30,
    fontWeight: "bold",
    includeFontPadding: false,
    bottom: -3,
    color: "white",
  },
  unit: {
    color: "white",
    fontStyle: "italic",
    textAlignVertical: "bottom",
  },
  buttonConnect: {
    backgroundColor: color.greenBlue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  textConnect: {
    color: "white",
  },
});

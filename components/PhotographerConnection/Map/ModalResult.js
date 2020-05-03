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
import { AntDesign } from "@expo/vector-icons";
import { stickRef } from "./createRefModal";
import { delay } from "../../../utils/f";
import { color } from "./../../../utils/f";
import CustomLinearGradient from "./../../Common/LinearGradient/index";
import { TouchableOpacity } from "react-native-gesture-handler";
import { haversine_distance } from "./../../../utils/map";
const window = Dimensions.get("window");

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
                    uri:
                      "https://scontent.fhan3-1.fna.fbcdn.net/v/t1.0-9/p960x960/84350278_1095445474128998_221786128275996672_o.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=vF18WmVMXRsAX_gfbxs&_nc_ht=scontent.fhan3-1.fna&_nc_tp=6&oh=b5f9615e2090b88ff1e764e24fcd0b22&oe=5ED0FFE1",
                  }}
                ></Image>

                <View style={styles.contentResult}>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    Name: {name}
                  </Text>
                  <Text style={{ color: color.gray8 }}>
                    {" "}
                    {gender} - {age}
                  </Text>
                </View>
              </View>

              {/* Distane and go to connect */}
              <View style={styles.bottomResult}>
                <View style={styles.distance}>
                  <Text style={styles.numberDistance}>
                    {" "}
                    {(1000 * distance).toFixed(0)}{" "}
                  </Text>
                  <Text style={styles.unit}> metter </Text>
                </View>

                <TouchableOpacity
                  style={styles.buttonConnect}
                  onPress={() => {
                    navigation.navigate("Chat", {
                      photographer: {
                        ...photographer.photographerInfor,
                        id: photographer.photographerId,
                      },
                      location: photographer,
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
        <Text style={styles.textLabelSearch}>
          {labelSearch ? labelSearch : ""}
        </Text>
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
    marginHorizontal: 10,
    borderRadius: 20,
    borderColor: color.greenBlue,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    color: color.greenBlue,
    flex: 1,
    textAlignVertical: "center",
    height: 30,
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
  },
  unit: {
    color: color.gray8,
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

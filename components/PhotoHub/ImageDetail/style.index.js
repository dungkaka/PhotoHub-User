import { StyleSheet } from "react-native";
import { getOrientationAsync } from "expo/build/ScreenOrientation/ScreenOrientation";
import { color } from "./../../../utils/f";

export const styles = StyleSheet.create({
  imageView: {
    flex: 1,
  },
  shawdowBox: {
    shadowColor: "black",
    shadowOffset: {
      width: 3,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0,
    elevation: 1,
  },
  buttonAction: {
    backgroundColor: "lightgray",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  textAction: {
    marginLeft: 5,
    fontSize: 18,
    color: color.purpleDark,
  },
  tag: {
    marginVertical: 5,
    marginHorizontal: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 15,
    backgroundColor: "#e8e8e8",
    fontSize: 12,
    color: "white",
  },

  buttonFooterModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textButtonFooterModal: {
    padding: 15,
    fontSize: 20,
    fontWeight: "bold",
    color: color.purpleDark,
  },
  titleModal: {
    fontSize: 22,
    fontWeight: "bold",
    color: "dimgray",
    paddingBottom: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  collectionElement: {
    flexDirection: "row",
    marginVertical: 8,
    marginHorizontal: 3,
  },
  collectionAdded: {
    borderLeftColor: color.blueModern2,
    borderLeftWidth: 3,
    paddingLeft: 6,
  },
  textCollectionElement: {
    fontSize: 18,
    flex: 1,
    fontWeight: "bold",
    color: color.gray8,
  },
  textCollectionAdded: {
    color: color.blueModern2,
  },
});

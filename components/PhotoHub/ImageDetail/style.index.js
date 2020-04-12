import { StyleSheet } from "react-native";
import { getOrientationAsync } from "expo/build/ScreenOrientation/ScreenOrientation";

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
  },
  textAction: {
    marginLeft: 5,
    fontSize: 18,
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
});

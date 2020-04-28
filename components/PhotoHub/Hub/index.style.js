import { StyleSheet } from "react-native";
import { random_color } from "../../../utils/f";

export const styles = StyleSheet.create({
  imageView: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 4,
    borderColor: "#ebebeb",
    borderWidth: 1,
    overflow: "hidden",
  },
  tagTitle: {
    marginVertical: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "#0785b0",
  },
  tag: {
    margin: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: "#f7f7f7",
  },
  tagIsSelected: {
    borderColor: "red",
  },
  button: {
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 10,
  },
  buttonConfirm: {
    backgroundColor: "#f74f31",
  },
  buttonReset: {
    borderWidth: 1,
    borderColor: "#f74f31",
    backgroundColor: "white",
  },
});

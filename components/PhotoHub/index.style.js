import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    overflow: "hidden",
    shadowColor: "#FFF",
    shadowOffset: {
      width: -8,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    // overflow: 'scroll',
    // borderWidth: 1
  },
});

export default styles;

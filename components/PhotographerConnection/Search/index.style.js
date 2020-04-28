import { StyleSheet, Dimensions } from "react-native";

const { width: WIDTH } = Dimensions.get("window");

export const styles = StyleSheet.create({
  inputContainer: {
    width: WIDTH * 0.8,
    marginVertical: 5,
    paddingVertical: 10,
    backgroundColor: `rgba(255,255,255,0.6)`,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.6)",
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: `rgba(0,0,0,0.7)`,
    paddingHorizontal: 8,
  },
  inputIcon: {
    fontSize: 20,
    color: `rgba(0,0,0,0.4)`,
    paddingHorizontal: 15,
  },
});

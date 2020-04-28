import { StyleSheet } from "react-native";
import { color } from "../../../utils/f";

const styles = StyleSheet.create({
  collectionView: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#ebebeb",
    borderWidth: 1,
    overflow: "hidden",
  },
  titleModal: {
    fontSize: 20,
    fontWeight: "bold",
    color: "dimgray",
    paddingBottom: 10,
    marginBottom: 10,
  },
  buttonFooterModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textButtonFooterModal: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputCreateCollection: {
    marginVertical: 10,
    backgroundColor: color.gray2,
    borderRadius: 15,
    padding: 10,
    fontSize: 20,
    color: "black",
  },
  inputFocusCreateCollection: {
    color: color.gray8,
  },
});

export default styles;

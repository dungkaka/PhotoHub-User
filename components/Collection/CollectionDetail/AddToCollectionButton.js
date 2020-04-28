import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AddToCollection from "../../PhotoHub/ImageDetail/AddToCollection";
import { FontAwesome } from "@expo/vector-icons";

const AddToCollectionButton = ({ image }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.btn}>
      <AddToCollection
        image={image}
        modalVisible={modalVisible}
        openModal={openModal}
        closeModal={closeModal}
      ></AddToCollection>
      <TouchableOpacity onPress={openModal}>
        <FontAwesome name="image" style={styles.btnIcon}></FontAwesome>
      </TouchableOpacity>
    </View>
  );
};

export default AddToCollectionButton;

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  btnIcon: {
    fontSize: 30,
    color: "white",
  },
});

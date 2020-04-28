import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AddToCollection from "./AddToCollection";
import { styles } from "./style.index";

const AddToCollectionButton = ({ image }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <AddToCollection
        image={image}
        modalVisible={modalVisible}
        openModal={openModal}
        closeModal={closeModal}
      ></AddToCollection>
      <TouchableOpacity
        style={[styles.buttonAction, styles.shawdowBox]}
        onPress={openModal}
      >
        <Text style={styles.textAction}> Collection </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddToCollectionButton;

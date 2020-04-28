import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import styles from "./index.style";
import { useDispatch, useSelector } from "react-redux";
import { createCollection } from "../../../redux/actions/collection";
import { useDidMountEffect } from "./../../../utils/custom-hook";
import { color } from "../../../utils/f";

const ModalAddCollection = (props) => {
  const { isVisible, openModal, closeModal, height, width } = props;
  const [inputFocused, setInputFocused] = useState(false);
  const input = useRef();
  const dispatch = useDispatch();
  const [creating, setCreating] = useState(false);
  const collection = useSelector((store) => store.collection);
  const { collections, error } = collection;

  useDidMountEffect(() => {
    if (creating) setCreating(false);
  }, [collection]);

  useDidMountEffect(() => {
    console.log(error);
    if (error == null) {
      closeModal();
    } else {
      // closeModal();
      Alert.alert(
        "Alert",
        error,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],

        { cancelable: false }
      );
    }
  }, [collection]);

  const handleCreateCollection = () => {
    setCreating(true);
    dispatch(createCollection(input.current));
  };

  return (
    <Modal
      style={{ margin: 0 }}
      isVisible={isVisible}
      deviceHeight={height}
      deviceWidth={width}
      swipeDirection={["down", "up"]}
      onSwipeComplete={() => closeModal()}
      // onBackdropPress={() => closeModal()}
      backdropOpacity={0.5}
      swipeThreshold={150}
      onBackButtonPress={() => {
        closeModal();
      }}
      animationInTiming={300}
      animationOutTiming={300}
    >
      <TouchableHighlight
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "80%",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "80%",
            borderRadius: 10,
            padding: 15,
          }}
        >
          <View>
            <Text style={styles.titleModal}>Create Collection</Text>
          </View>

          {/* Input */}
          <View style={{}}>
            <Text style={{ color: "gray" }}>Type name of Collection</Text>
            <TextInput
              placeholder="Your Collection"
              placeholderTextColor="gray"
              selectionColor={color.gray8}
              multiline={true}
              onFocus={(event) => {
                setInputFocused(true);
              }}
              onBlur={(event) => {
                setInputFocused(false);
              }}
              onChangeText={(value) => {
                input.current = value;
                console.log(input.current);
              }}
              style={[
                styles.inputCreateCollection,
                inputFocused ? styles.inputFocusCreateCollection : {},
              ]}
            ></TextInput>
          </View>

          {/* Footer */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              paddingTop: 10,
              borderTopWidth: 1,
              borderTopColor: "lightgray",
            }}
          >
            <TouchableOpacity
              style={styles.buttonFooterModal}
              title="Hide modal"
              onPress={closeModal}
            >
              <Text style={styles.textButtonFooterModal}> Cancel </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonFooterModal}
              title="Hide modal"
              onPress={handleCreateCollection}
            >
              <Text style={styles.textButtonFooterModal}> OK </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableHighlight>
    </Modal>
  );
};

export default ModalAddCollection;

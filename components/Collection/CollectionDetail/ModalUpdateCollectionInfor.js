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
import styles from "./../MyCollection/index.style";
import { useDispatch, useSelector } from "react-redux";
import {
  createCollection,
  updateCollectionInfor,
} from "../../../redux/actions/collection";
import { color } from "../../../utils/f";
import customAlert from "../../Common/CustomAlert";

const ModalUpdateCollectionInfor = (props) => {
  const { isVisible, openModal, closeModal, setLoadingOverLay } = props;
  const [inputFocused, setInputFocused] = useState(false);
  const input = useRef();
  const dispatch = useDispatch();

  const collection = props.collection;

  const handleCreateCollection = () => {
    setLoadingOverLay(true);
    dispatch(
      updateCollectionInfor(
        {
          collection_id: collection.collection_id,
          inforUpdate: {
            name: input.current,
          },
        },
        (data) => {
          setLoadingOverLay(false);
          closeModal();
        },
        (error) => {
          setLoadingOverLay(false);
          customAlert(error);
        }
      )
    );
  };

  return (
    <Modal
      style={{ margin: 0 }}
      isVisible={isVisible}
      backdropOpacity={0.5}
      onBackButtonPress={() => {
        closeModal();
      }}
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
            <Text style={styles.titleModal}>Edit Name</Text>
          </View>

          {/* Input */}
          <View style={{}}>
            <Text style={{ color: "gray" }}>Type name here</Text>
            <TextInput
              placeholder={collection.name}
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

export default ModalUpdateCollectionInfor;

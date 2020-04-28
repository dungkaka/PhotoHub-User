import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { styles } from "./style.index";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getListCollection,
  deleteImageFromCollection,
  addImageToCollection,
} from "./../../../redux/actions/collection";
import Modal from "react-native-modal";
import { useDidMountEffect } from "./../../../utils/custom-hook";
import { FlatList } from "react-native-gesture-handler";
import Spinner from "react-native-loading-spinner-overlay";
import { FontAwesome } from "@expo/vector-icons";

const LoadingIcon = ({ isIconAnimating }) => (
  <ActivityIndicator
    size="large"
    color="#gray"
    style={{ marginVertical: 5 }}
    animating={isIconAnimating}
  />
);

const CollectionElement = ({
  isAdded,
  name,
  collectionId,
  removeFromCollection,
  addToCollection,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (isAdded) removeFromCollection(collectionId);
        else addToCollection(collectionId);
      }}
      style={[styles.collectionElement, isAdded ? styles.collectionAdded : {}]}
    >
      <Text
        style={[
          styles.textCollectionElement,
          isAdded ? styles.textCollectionAdded : {},
        ]}
      >
        {name}{" "}
      </Text>

      <FontAwesome
        style={[
          { justifyContent: "flex-end", fontSize: 20 },
          isAdded ? styles.textCollectionAdded : {},
        ]}
        name="plus-circle"
      />
    </TouchableOpacity>
  );
};

const AddToCollection = ({ image, modalVisible, openModal, closeModal }) => {
  const collection = useSelector((store) => store.collection);
  const dispatch = useDispatch();
  // const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(false);

  useEffect(() => {
    if (!collection.getFirst) {
      setFirstLoading(true);
      dispatch(getListCollection());
    }
  }, []);

  useDidMountEffect(() => {
    if (firstLoading) setFirstLoading(false);
    if (loading) setLoading(false);
  }, [collection]);

  // const openModal = () => {
  //   setModalVisible(true);
  // };

  // const closeModal = () => {
  //   setModalVisible(false);
  // };

  const handleRemoveFromCollection = (collectionId) => {
    setLoading(true);
    dispatch(deleteImageFromCollection(collectionId, image));
  };

  const handleAddToCollection = (collectionId) => {
    setLoading(true);
    dispatch(addImageToCollection(collectionId, image));
  };
  console.log("LOADING", loading);
  return (
    <Modal isVisible={modalVisible}>
      <View style={{ height: "80%" }}>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: "90%",
              borderRadius: 10,
              padding: 15,
              paddingBottom: 0,
            }}
          >
            {/* Title */}
            <View>
              <Text style={styles.titleModal}>Add To Collection</Text>
            </View>

            <FlatList
              style={{ margin: 4, marginBottom: 10 }}
              keyExtractor={(item) => item.collection_id.toString()}
              data={collection.collections}
              renderItem={({ item }) => {
                if (item.name == "Favourite") return null;
                if (item && item.images_snippet) {
                  const imageExist = item.images_snippet.filter(
                    (item) => item.image_id == image.id
                  );
                  const isAdded = imageExist.length > 0;
                  return (
                    <CollectionElement
                      isAdded={isAdded}
                      name={item.name}
                      collectionId={item.collection_id}
                      removeFromCollection={handleRemoveFromCollection}
                      addToCollection={handleAddToCollection}
                    ></CollectionElement>
                  );
                } else return null;
              }}
            />
            {firstLoading ? (
              <LoadingIcon isIconAnimating={firstLoading}></LoadingIcon>
            ) : null}

            {/* Footer */}
            <View
              style={{
                flexDirection: "row",
                borderTopWidth: 1,
                borderTopColor: "lightgray",
              }}
            >
              <TouchableOpacity
                style={styles.buttonFooterModal}
                title="Hide modal"
                onPress={() => {
                  console.log("CLOSE MODAL");
                  closeModal();
                }}
              >
                <Text style={styles.textButtonFooterModal}> Cancel </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddToCollection;

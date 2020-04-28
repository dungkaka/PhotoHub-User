import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Alert, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import ImageThumbnail from "./ImageThumbnail";
import { URL } from "../../../configs/end-points-url";
import { useDidMountEffect } from "./../../../utils/custom-hook";
import request from "../../../utils/axios";
import { useSelector, useDispatch } from "react-redux";
import { color } from "../../../utils/f";
import {
  deleteCollection,
  updateCollectionInfor,
} from "../../../redux/actions/collection";
import Spinner from "react-native-loading-spinner-overlay";
import customAlert from "./../../Common/CustomAlert/index";
import { MaterialCommunityIcons, Feather, AntDesign } from "@expo/vector-icons";
import ModalUpdateCollectionInfor from "./ModalUpdateCollectionInfor";

const CollectionDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const collectionStore = useSelector((store) => store.collection);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { collection_id } = route.params || {};

  const _collection = collectionStore.collections.filter(
    (item) => item.collection_id == collection_id
  );

  const collection = _collection[0] || {};
  const { name, date_create, images_snippet } = collection;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [name]);

  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <Spinner
        visible={loading}
        textStyle={{ color: "black" }}
        cancelable={true}
        animation="fade"
      />

      <View style={{ flex: 1 }}>
        <FlatList
          style={{ marginHorizontal: 5 }}
          numColumns={3}
          keyExtractor={(item) => item.image_id.toString()}
          data={images_snippet}
          renderItem={({ item }) => (
            <ImageThumbnail
              // images_snippet={images_snippet}
              collection_id={collection_id}
              image={item}
              width={200}
              height={120}
              spaceBetween={2}
            ></ImageThumbnail>
          )}
        />
      </View>

      {collection.name != "Favourite" ? (
        <View
          style={{
            position: "absolute",
            // height: 60,
            width: "100%",
            backgroundColor: "white",
            // borderTopLeftRadius: 25,
            // borderTopRightRadius: 25,
            shadowColor: "black",
            shadowOpacity: 1,
            elevation: 50,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {/* Button Share */}
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                padding: 12,
              }}
            >
              <Feather name="share-2" color="black" size={24} />
            </TouchableOpacity>

            {/* Button Edit */}
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: color.greenBlue,
              }}
            >
              <AntDesign name="edit" color="white" size={24}></AntDesign>
            </TouchableOpacity>

            {/* Button Delete */}
            <TouchableOpacity
              onPress={() => {
                customAlert(
                  "Are you sure to delete, you can not redo !",
                  () => {
                    setLoading(true);
                    dispatch(
                      deleteCollection(
                        collection,
                        (data) => {
                          setLoading(false);
                          navigation.goBack();
                        },
                        (error) => {
                          setLoading(false);
                          customAlert(error);
                        }
                      )
                    );
                  },
                  null
                );
              }}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: color.blueModern2,
              }}
            >
              <MaterialCommunityIcons
                name="delete-outline"
                size={26}
                color="white"
              ></MaterialCommunityIcons>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      <ModalUpdateCollectionInfor
        collection={collection}
        isVisible={modalVisible}
        openModal={() => setModalVisible(true)}
        closeModal={() => setModalVisible(false)}
        setLoadingOverLay={(status) => setLoading(status)}
      ></ModalUpdateCollectionInfor>
    </View>
  );
};

export default CollectionDetail;

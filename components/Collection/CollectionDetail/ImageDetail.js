import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { color } from "../../../utils/f";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteImageFromCollection } from "../../../redux/actions/collection";
import { useDidMountEffect } from "./../../../utils/custom-hook";
import AddToCollectionButton from "./AddToCollectionButton";
import ImageViewer from "react-native-image-zoom-viewer";

const ImageDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const collection = useSelector((store) => store.collection);
  const { image, images_snippet, collection_id } = route.params || {};
  const [loading, setLoading] = useState(false);
  const images = [
    {
      url: image.url ? image.url : image.thumbnail_url,
    },
  ];

  useDidMountEffect(() => {
    if (loading) setLoading(false);
    if (collection.error == null && loading == false) {
      console.log("HERE EE");
      navigation.goBack();
    }
  }, [collection, loading]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <View
        style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end" }}
      >
        <View style={{ flex: 1 }}>
          <ImageViewer imageUrls={images} />
          {/* <Image
            source={{
              uri: image.url ? image.url : image.thumbnail_url,
              height: "100%",
              width: "100%",
            }}
            resizeMode="contain"
          ></Image> */}
        </View>
        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: `rgba(0,0,0,0.3)`,
          }}
        >
          <AddToCollectionButton
            image={{ ...image, id: image.image_id }}
          ></AddToCollectionButton>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              Alert.alert(
                "Alert",
                "Are you sure to delete image !",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => {
                      setLoading(true);
                      dispatch(
                        deleteImageFromCollection(collection_id, {
                          ...image,
                          id: image.image_id,
                        })
                      );
                    },
                  },
                ],

                { cancelable: false }
              );
            }}
          >
            <FontAwesome name="trash" style={styles.btnIcon}></FontAwesome>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ImageDetail;

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

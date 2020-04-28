import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import styles from "./index.style";
import { useNavigation } from "@react-navigation/native";

const ImageThumbnail = (props) => {
  const navigation = useNavigation();

  const { height, width, image, spaceBetween, images_snippet, collection_id } = props;
  return (
    <View style={{ flex: 1 / 3, height: height, width: width }}>
      <TouchableOpacity
        style={[styles.imageView, { margin: spaceBetween }]}
        onPress={() =>
          navigation.push("Image Detail Collection", { image, images_snippet, collection_id })
        }
      >
        <Image
          source={{
            uri: image.thumbnail_url,
            height: "100%",
            width: "100%",
          }}
          resizeMode="cover"
        ></Image>
      </TouchableOpacity>
    </View>
  );
};

export default ImageThumbnail;

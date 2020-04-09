import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { styles } from "./index.style";

const ImageThumbnail = (props) => {
  const { thumbnail_url, name, likes } = props.image;
  return (
    <View style={styles.imageView}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Image Detail", item)}
      >
        <Text>
          {" "}
          Name: {name} - {name}
        </Text>
        <Text> likes: {likes} </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageThumbnail;

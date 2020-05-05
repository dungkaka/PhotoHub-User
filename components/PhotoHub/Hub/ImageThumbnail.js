import React from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { styles } from "./index.style";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const ImageThumbnail = (props) => {
  const navigation = useNavigation();

  const { thumbnail_url, name, likes } = props.image;
  return (
    <View style={{ flex: 0.5, height: props.height }}>
      <TouchableOpacity
        style={[styles.imageView, { margin: props.spaceBetween }]}
        onPress={() => navigation.push("Image Detail", { image: props.image })}
      >
        <Image
          style={styles.image}
          source={{
            uri: thumbnail_url,
            height: props.height - 40,
            width: props.width,
          }}
        ></Image>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 8,
          }}
        >
          <Text style={{ color: "dimgray" }}>{name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "dimgray" }}> {likes} </Text>
            <FontAwesome name="heart" color="red"></FontAwesome>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ImageThumbnail;

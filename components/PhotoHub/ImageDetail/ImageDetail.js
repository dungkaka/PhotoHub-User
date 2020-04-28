import React from "react";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import { Button, Text } from "expo-ui-kit/src";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./style.index";

import SimilarItem from "./SimilarItem";
import { random_color } from "../../../utils/f";
import LikeImage from "./LikeImage";
import AddToCollection from "./AddToCollection";
import AddToCollectionButton from "./AddToCollectionButton";

const ImageDetail = () => {
  const navigation = useNavigation();
  // route fo from HubContainer
  const route = useRoute();
  const { image } = route.params || {};
  return (
    <ScrollView>
      <View>
        {/* Image */}
        <Image
          source={{
            uri: image.url,
            width: null,
            height: 350,
            scale: 0.05,
          }}
        ></Image>

        {/* Title Of Image */}
        <View
          style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
        >
          <Text
            style={{
              paddingHorizontal: 8,
              paddingVertical: 2,
              backgroundColor: "#f74f31",
              color: "white",
              borderRadius: 15,
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Popular
          </Text>
          <Text style={{ fontSize: 20, marginLeft: 10 }}>{image.name}</Text>
        </View>

        {/* Detail Of Image */}
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {/* Description and Tag */}
          <View style={{ flex: 1 }}>
            <Text> Tags </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {image.tags.map((item) => {
                return (
                  <Text
                    key={item}
                    style={{ ...styles.tag, backgroundColor: random_color() }}
                  >
                    {" "}
                    {item}{" "}
                  </Text>
                );
              })}
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "stretch",
            }}
          >
            {/* Button Like */}
            <LikeImage imageId={image.id} likeBy={image.like_by}></LikeImage>

            {/* Button Add To Collection */}
            <AddToCollectionButton image={image}></AddToCollectionButton>
          </View>
        </View>
        <SimilarItem></SimilarItem>
      </View>
    </ScrollView>
  );
};

export default ImageDetail;

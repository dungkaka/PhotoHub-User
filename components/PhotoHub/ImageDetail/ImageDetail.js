import React from "react";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import { Button, Text } from "expo-ui-kit/src";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./style.index";
import { FontAwesome } from "@expo/vector-icons";
import SimilarItem from "./SimilarItem";
import { random_color } from "../../../utils/f";

const ImageDetail = () => {
  const navigation = useNavigation();
  // route fo from HubContainer
  const route = useRoute();
  const { name, likes, id, tags, url } = route.params || {};
  return (
    <ScrollView>
      <View>
        {/* Image */}
        <Image
          source={{
            uri: url,
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
            Favorite
          </Text>
          <Text style={{ fontSize: 20, marginLeft: 10 }}>{name}</Text>
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
              {tags.map((item) => {
                return (
                  <Text
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
            <TouchableOpacity style={[styles.buttonAction, styles.shawdowBox]}>
              <FontAwesome name="heart" color="red"></FontAwesome>
              <Text style={styles.textAction}> Like </Text>
            </TouchableOpacity>

            {/* Button Add To Collection */}
            <TouchableOpacity style={[styles.buttonAction, styles.shawdowBox]}>
              <Text style={styles.textAction}> Collection </Text>
            </TouchableOpacity>
          </View>
        </View>
        <SimilarItem></SimilarItem>
      </View>
    </ScrollView>
  );
};

export default ImageDetail;

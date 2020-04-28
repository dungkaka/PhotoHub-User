import React from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import ImageThumbnail from "./../Hub/ImageThumbnail";

const SimilarItem = () => {
  const { listImage } = useSelector((store) => store.listImage);

  return (
    <View>
      <Text style={{ margin: 10, fontWeight: "bold" }}>
        You also may want to see
      </Text>
      <FlatList
        style={{ paddingHorizontal: 10, marginBottom: 10 }}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        data={listImage}
        renderItem={({ item }) => (
          <ImageThumbnail
            image={item}
            width={130}
            height={140}
            spaceBetween={2}
          ></ImageThumbnail>
        )}
        ListFooterComponent={() => {
          return <View style={{ marginEnd: 18 }}></View>;
        }}
      />
    </View>
  );
};

export default SimilarItem;

import React, { useEffect, useState, useRef } from "react";
import { useDidMountEffect } from "./../../../utils/custom-hook";
import { useNavigation } from "@react-navigation/native";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Block } from "expo-ui-kit";
import styles from "../index.style";
import { useDispatch, useSelector } from "react-redux";
import { getListImage } from "../../../redux/actions/list_image";
import { ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { Feather, AntDesign } from "@expo/vector-icons";
import ImageThumbnail from "./ImageThumbnail";

const HubContainer = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { listImage, pageIndex, error } = useSelector(
    (store) => store.listImage
  );

  const [fetching, setFetching] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(true);
  const tags = useRef([]);

  useEffect(() => {
    dispatch(getListImage(tags.current, ""));
  }, []);

  useDidMountEffect(() => {
    console.log("ROUTE CHANGE");
    const routeTags = route.params ? route.params.tags : [];
    if (tags.current != routeTags) {
      tags.current = routeTags;
      handleTagsChange();
    }
  }, [route]);

  useDidMountEffect(() => {
    console.log("LIST_IMAGE_CHANGE");
    if (fetching) setFetching(false);
    if (fetchingMore) setFetchingMore(false);
  }, [listImage]);

  const handleTagsChange = () => {
    handleRefresh();
  };

  const handleRefresh = () => {
    console.log("REFRESH");
    setFetching(true);
    dispatch(getListImage(tags.current, ""));
  };

  const fetchMore = () => {
    console.log("FETCH MORE");
    if (!fetching && !fetchingMore && pageIndex > 0) {
      setFetchingMore(true);
      const afterID = listImage[listImage.length - 1].id;
      dispatch(getListImage(tags.current, afterID));
    }
  };

  console.log("Rendering", pageIndex);

  return (
    <FlatList
      contentContainerStyle={{}}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      data={listImage}
      renderItem={({ item }) => <ImageThumbnail image={item}></ImageThumbnail>}
      onRefresh={handleRefresh}
      refreshing={fetching}
      // extraData={fetching}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.4}
      ListFooterComponent={() => {
        return fetchingMore ? (
          <AntDesign name="dashboard" color="black" size={32} />
        ) : null;
      }}
    />

    // <ScrollView>
    //   <View
    //     style={{
    //       flex: 1,
    //       // flexDirection: "row",
    //       // flexWrap: "wrap",
    //       // alignItems: "flex-start",
    //       // justifyContent: "space-around",
    //     }}
    //   >
    //     {listImage.map((l, i) => (
    //       <ListItem
    //         activeScale={0.95}
    //         key={i}
    //         leftAvatar={{ source: { uri: l.thumbnail_url } }}
    //         title={l.name}
    //         subtitle={l.likes}
    //         bottomDivider
    //         chevron={{ color: "black" }}
    //         onPress={() => {
    //           navigation.navigate("Image Detail", l);
    //         }}
    //       />
    //     ))}
    //   </View>
    // </ScrollView>
  );
};

export default HubContainer;

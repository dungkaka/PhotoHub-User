import React, { useEffect, useState, useRef } from "react";
import { useDidMountEffect } from "./../../../utils/custom-hook";
import { useNavigation } from "@react-navigation/native";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Block } from "expo-ui-kit";
import { styles } from "./index.style";
import { useDispatch, useSelector } from "react-redux";
import { getListImage } from "../../../redux/actions/list_image";
import { ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { Feather, AntDesign } from "@expo/vector-icons";
import ImageThumbnail from "./ImageThumbnail";
import { useHeaderHeight } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";

const HubContainer = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const headerHeight = useHeaderHeight();

  const { listImage, pageIndex, error } = useSelector(
    (store) => store.listImage
  );

  const [fetching, setFetching] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(true);
  const tags = useRef([]);

  useEffect(() => {
    dispatch(getListImage(tags.current, ""));
  }, []);

  // Case Tags selector
  useDidMountEffect(() => {
    console.log("ROUTE CHANGE");
    const routeTags = route.params ? route.params.tags : [];
    if (tags.current != routeTags) {
      tags.current = routeTags;
      handleTagsChange();
    }
  }, [route]);

  // When listImage change, actually completed fetching image, set Loading = false
  useDidMountEffect(() => {
    console.log("LIST_IMAGE_CHANGE");
    if (fetching) setFetching(false);
    if (fetchingMore) setFetchingMore(false);
  }, [listImage]);

  // Case Tags change
  const handleTagsChange = () => {
    handleRefresh();
  };

  // When refersh data of List
  const handleRefresh = () => {
    console.log("REFRESH");
    setFetching(true);
    dispatch(getListImage(tags.current, ""));
  };

  // Fetch more data append to List
  const fetchMore = () => {
    console.log("FETCH MORE");
    if (!fetching && !fetchingMore && pageIndex > 0) {
      setFetchingMore(true);
      const afterID = listImage[listImage.length - 1].id;
      dispatch(getListImage(tags.current, afterID));
    }
  };

  return (
    <View style={{ marginTop: 15, flex: 1 }}>
      {/* Custom Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          margin: 20,
        }}
      >
        <FontAwesome
          name="bars"
          size={24}
          onPress={() => navigation.openDrawer()}
          iconStyle={{ margin: 10, backgroundColor: "transparent" }}
        />
        <Text style={{ fontSize: 20, marginStart: 15 }}> PHOTOHUB</Text>
      </View>

      {/* Filter */}

      <View
        style={{
          margin: 8,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Text>Suggestion:</Text>
        </View>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginEnd: 4,
          }}
          onPress={() => navigation.openDrawer()}
        >
          <Text style={{ color: "steelblue", marginHorizontal: 1 }}>
            {" "}
            Filter{" "}
          </Text>
          <FontAwesome name="filter" size={22} color="steelblue"></FontAwesome>
        </TouchableOpacity>
      </View>

      <FlatList
        style={{ margin: 4 }}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        data={listImage}
        renderItem={({ item }) => (
          <ImageThumbnail
            image={item}
            width={200}
            height={200}
            spaceBetween={4}
          ></ImageThumbnail>
        )}
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
    </View>
  );
};

export default HubContainer;

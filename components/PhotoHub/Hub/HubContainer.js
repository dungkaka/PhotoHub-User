import React, { useEffect, useState, useRef } from "react";
import { useDidMountEffect } from "./../../../utils/custom-hook";
import { useNavigation} from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { styles } from "./index.style";
import { useDispatch, useSelector } from "react-redux";
import { getListImage } from "../../../redux/actions/list_image";
import ImageThumbnail from "./ImageThumbnail";
import { useHeaderHeight } from "@react-navigation/stack";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { color } from "../../../utils/f";

const background = require("./../../../assets/images/logo-2.png");

const LoadingIcon = ({ isIconAnimating }) => (
  <ActivityIndicator
    size="large"
    color="#gray"
    style={{ marginVertical: 5 }}
    animating={isIconAnimating}
  />
);

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
    const routeTags = route.params ? route.params.tags : [];
    if (routeTags) {
      tags.current = routeTags;
      handleTagsChange();
    }
  }, [route]);

  // When listImage change, actually completed fetching image, set Loading = false
  useDidMountEffect(() => {
    if (fetching) setFetching(false);
    if (fetchingMore) setFetchingMore(false);
  }, [listImage]);

  // Case Tags change
  const handleTagsChange = () => {
    handleRefresh();
  };

  // When refersh data of List
  const handleRefresh = () => {
    setFetching(true);
    dispatch(getListImage(tags.current, ""));
  };

  // Fetch more data append to List
  const fetchMore = () => {
    console.log("FETCH_MORE");
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
          justifyContent: "flex-start",
          margin: 20,
        }}
      >
        <FontAwesome
          name="bars"
          size={28}
          onPress={() => navigation.openDrawer()}
          color={color.blueModern1}
          style={{}}
        />
        <Image
          source={background}
          style={{ height: 35, width: "60%" }}
          resizeMode="center"
        />
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
        onEndReachedThreshold={5}
        ListFooterComponent={() =>
          fetchingMore ? (
            <LoadingIcon isIconAnimating={true}></LoadingIcon>
          ) : null
        }
      />
    </View>
  );
};

export default HubContainer;

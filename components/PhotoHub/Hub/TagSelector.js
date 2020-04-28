import React, { useState, useEffect, useMemo, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button, Block } from "expo-ui-kit/src";
import request from "./../../../utils/axios";
import { URL } from "../../../configs/end-points-url";
import { ScrollView } from "react-native-gesture-handler";
import { styles } from "./index.style";
import Tag from "./Tag";

const TagSelector = ({ navigation }) => {
  const [tags, setTags] = useState([]);
  const [resetSelector, setResetSelector] = useState(false);
  const tagSelector = useRef([]);

  const getTags = async () => {
    try {
      const response = await request.server.get(URL.GET_TAGS());
      setTags(response.data.tags);
    } catch (error) {}
  };

  useEffect(() => {
    getTags();
  }, []);

  const onSelectTag = (tag) => {
    // let newSelected = tagsSelector.filter((item) => item);
    let newSelected = tagSelector.current;
    const selected = newSelected.includes(tag.id);
    if (selected) {
      newSelected = newSelected.filter((item) => item != tag.id);
    } else {
      newSelected.push(tag.id);
    }
    // setTagsSelector(newSelected);
    tagSelector.current = newSelected;
  };

  const renderTag = (tag) => {
    return (
      <Tag
        key={tag.id}
        tag={tag}
        onSelect={onSelectTag}
        reset={resetSelector}
      ></Tag>
    );
  };

  const renderListCategory = (item) => {
    return (
      <View
        key={item.category}
        style={{
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#ebebeb",
        }}
      >
        <View>
          <Text style={{ marginBottom: 3, color: "#0785b0" }}>
            {" "}
            {item.categoryName.vi}{" "}
          </Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {item.tags.map((tag) => renderTag(tag))}
        </View>
      </View>
    );
  };


  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ margin: 15 }}>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.tagTitle}> FILTER </Text>
        </View>
        <View>{tags.map((item) => renderListCategory(item))}</View>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginEnd: 10,
          marginTop: -10,
          marginBottom: 10,
        }}
      >
        <Button
          style={[styles.button, styles.buttonReset]}
          onPress={() => {
            setResetSelector(!resetSelector);
            tagSelector.current = [];
          }}
        >
          <Text style={{ color: "#f74f31" }}> RESET </Text>
        </Button>
        <Button
          style={[styles.button, styles.buttonConfirm]}
          onPress={() =>
            navigation.navigate("HubContainer", {
              tags: tagSelector.current,
              fromTagSelector: true,
            })
          }
        >
          <Text style={{ color: "white" }}> CONFIRM </Text>
        </Button>
      </View>
    </View>
  );
};

export default TagSelector;

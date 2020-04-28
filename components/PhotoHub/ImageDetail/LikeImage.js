import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import request from "../../../utils/axios";
import { URL } from "../../../configs/end-points-url";
import { styles } from "./style.index";

const LikeImage = ({ imageId, likeBy }) => {
  const user = useSelector((store) => store.user);
  const [like, setLike] = useState(false);

  useEffect(() => {
    const userId = !!user.user ? user.user.id : "-1";

    if (likeBy.includes(userId)) setLike(true);
  }, []);

  return (
    <TouchableOpacity
      style={[styles.buttonAction, styles.shawdowBox]}
      onPress={async () => {
        setLike(!like);
        if (like == false) {
          try {
            const response = await request.server.post(URL.LIKE_IMAGE(imageId));

            const data = response.data;
            if (data.status == true) {
            } else {
              throw new Error(data.message);
            }
          } catch (error) {
            setLike(!like);
          }
        } else {
          try {
            const response = await request.server.delete(
              URL.UNLIKE_IMAGE(imageId)
            );

            const data = response.data;
            if (data.status == true) {
            } else {
              throw new Error(data.message);
            }
          } catch (error) {
            setLike(!like);
          }
        }
      }}
    >
      <FontAwesome name="heart" color={like ? "red" : "gray"}></FontAwesome>
      <Text style={styles.textAction}> Like </Text>
    </TouchableOpacity>
  );
};

export default LikeImage;

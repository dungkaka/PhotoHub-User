import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import request from "../../../utils/axios";
import { URL } from "../../../configs/end-points-url";
import { useNavigation } from "@react-navigation/native";

const ChatActive = () => {
  const navigation = useNavigation();
  const [listActiveChat, setListActiveChat] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    getListActiveChat();
  }, []);

  const getListActiveChat = async () => {
    try {
      setFetching(true);
      const response = await request.server.get(URL.GET_LIST_ACTIVE_CHAT());
      const data = response.data;

      console.log("DATA", data);

      if (data.status == true) {
        setListActiveChat(data.chatRooms);
        setFetching(false);
      } else throw Error(data.message);
    } catch (error) {
      setFetching(false);
      console.log(error.message);
    }
  };

  return (
    <View>
      <FlatList
        style={{ margin: 4 }}
        numColumns={2}
        keyExtractor={(item) => item.id}
        data={listActiveChat}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Chat", {
                photographer: item.photographer,
              });
            }}
          >
            <Text style={{ backgroundColor: "green", margin: 10, padding: 10 }}>
              {item.photographer.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ChatActive;

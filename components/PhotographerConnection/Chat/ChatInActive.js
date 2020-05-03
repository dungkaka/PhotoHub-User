import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import request from "../../../utils/axios";
import { URL } from "../../../configs/end-points-url";

const ChatInActive = () => {
  const [listInActiveChat, setListInActiveChat] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    getListInActiveChat();
  }, []);

  const getListInActiveChat = async () => {
    try {
      setFetching(true);
      const response = await request.server.get(URL.GET_LIST_INACTIVE_CHAT());
      const data = response.data;

      console.log(data);

      if (data.status == true) {
        setListInActiveChat(data.chatRooms);
        setFetching(false);
      } else throw Error(data.message);
    } catch (error) {
      setFetching(false);
      console.log(error.message);
    }
  };

  return (
    <View>
      <View>
        <FlatList
          style={{ margin: 4 }}
          numColumns={2}
          keyExtractor={(item) => item.id}
          data={listInActiveChat}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ChatScreen", {
                  photographer: item.photographer,
                });
              }}
            >
              <Text
                style={{ backgroundColor: "green", margin: 10, padding: 10 }}
              >
                {item.photographer.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default ChatInActive;

import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { firestoreRef } from "../../../configs/firebase-config";
import { useRoute } from "@react-navigation/native";
import { GiftedChat, Avatar, utils } from "react-native-gifted-chat";
import CustomLinearGradient from "./../../Common/LinearGradient/index";
import { color } from "../../../utils/f";
import { AntDesign } from "@expo/vector-icons";

const { isSameUser, isSameDay } = utils;

const chatRef = firestoreRef.collection("chat");

console.disableYellowBox = true;

const Chat = () => {
  const route = useRoute();
  const user = useSelector((store) => store.user.user);
  const { photographer, location, distance } = route.params ? route.params : {};
  const { name, age, gender, address } = photographer;

  return (
    <View style={{ flex: 1 }}>
      <CustomLinearGradient>
        <View style={styles.result}>
          {/* Image and detail of photogeapher */}
          <View style={styles.topResult}>
            <TouchableOpacity
              onPress={() => onPress()}
              style={{
                opacity: 0.8,
                backgroundColor: "white",
                padding: 6,
                alignContent: "center",
              }}
            >
              <AntDesign name="arrowleft" size={24}></AntDesign>
            </TouchableOpacity>
            <Image
              style={styles.image}
              source={{
                uri:
                  "https://scontent.fhan3-1.fna.fbcdn.net/v/t1.0-9/p960x960/84350278_1095445474128998_221786128275996672_o.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=vF18WmVMXRsAX_gfbxs&_nc_ht=scontent.fhan3-1.fna&_nc_tp=6&oh=b5f9615e2090b88ff1e764e24fcd0b22&oe=5ED0FFE1",
              }}
            ></Image>

            <View style={styles.contentResult}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Name: {name}
              </Text>
              <Text style={{ color: color.gray8 }}>
                {" "}
                {gender} - {age}
              </Text>
            </View>
          </View>

          {/* Distane and go to connect */}
          <View style={styles.bottomResult}>
            <View style={styles.distance}>
              <Text style={styles.numberDistance}>
                {" "}
                {(1000 * distance).toFixed(0)}{" "}
              </Text>
              <Text style={styles.unit}> metter </Text>
            </View>

            <TouchableOpacity
              style={styles.buttonConnect}
              onPress={() => {
                navigation.navigate("Chat", {
                  photographer: {
                    ...photographer.photographerInfor,
                    id: photographer.photographerId,
                  },
                  location: photographer,
                });
              }}
            >
              <Text style={styles.textConnect}>Connect</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomLinearGradient>
      <ChatScreen user={user} photographer={photographer} location={location} />
    </View>
  );
};

const ChatScreen = ({ user, photographer, location }) => {
  const roomChat = useRef();
  const [fetchingRoom, setFetchingRoom] = useState(false);
  const [messages, setMessages] = useState([]);
  const [active, setActive] = useState(true);

  const [error, setError] = useState(false);

  useEffect(() => {
    let unsubcribeChatRoom = () => {};

    const accessRoomchat = async () => {
      setFetchingRoom(true);
      try {
        if (photographer && user) {
          // Check where exist room chat containing user and photographer

          const chatRoomSnapshot = await chatRef
            .where("user.id", "==", user.id)
            .where("photographer.id", "==", photographer.id)
            .get();

          // If no chatRoom exist, create New, and add chat room ref. Elsem just get room chat ref
          if (chatRoomSnapshot.empty) {
            chatRef
              .add({
                createdAt: new Date(),
                active: true,
                user: {
                  id: user.id,
                  name: user.name ? user.name : user.username,
                },
                photographer: {
                  id: photographer.id,
                  name: photographer.name
                    ? photographer.name
                    : photographer.username,
                },
              })
              .then((docRef) => {
                roomChat.current = docRef;
                setFetchingRoom(false);
                unsubcribeChatRoom = roomChat.current
                  .collection("messages")
                  .onSnapshot((snapshot) => {
                    snapshot.docChanges().forEach((change) => {
                      setMessages((preMessage) =>
                        GiftedChat.append(preMessage, change.doc.data())
                      );
                    });
                  });
              });
          } else {
            // Check if the room active or inactive. If active, realtime listen, if inactive, just fetching data.
            const active = chatRoomSnapshot.docs[0].data().active;
            roomChat.current = chatRoomSnapshot.docs[0].ref;
            if (active) {
              setFetchingRoom(false);
              unsubcribeChatRoom = roomChat.current
                .collection("messages")
                .orderBy("createdAt", "desc")
                .onSnapshot((snapshot) => {
                  const newMessages = [];
                  for (let change of snapshot.docChanges()) {
                    newMessages.push({
                      ...change.doc.data(),
                      createdAt: change.doc.data().createdAt.toDate(),
                    });
                  }
                  setMessages((preMessages) =>
                    GiftedChat.append(preMessages, newMessages)
                  );
                });
            } else {
              roomChat.current
                .collection("message")
                .orderBy("createdAt", "desc")
                .get()
                .then((snapshot) => {
                  const messages = [];
                  for (let doc of snapshot.docs) {
                    messages.push(doc.data());
                  }
                  setMessages(messages);
                });
            }
          }
        }
      } catch (error) {
        console.log("ERROR", error.message);
        setError(error.message);
        setFetchingRoom(false);
      }
    };
    accessRoomchat();

    return () => {
      unsubcribeChatRoom();
    };
  }, []);

  const onSend = (message = []) => {
    roomChat.current.collection("messages").add(message[0]);
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user.id,
          name: user.name,
          avatar:
            "https://scontent.fhan3-1.fna.fbcdn.net/v/t1.0-9/p960x960/84350278_1095445474128998_221786128275996672_o.jpg?_nc_cat=111&_nc_sid=85a577&_nc_ohc=vF18WmVMXRsAX_gfbxs&_nc_ht=scontent.fhan3-1.fna&_nc_tp=6&oh=b5f9615e2090b88ff1e764e24fcd0b22&oe=5ED0FFE1",
        }}
        renderTime={() => null}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  result: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "column",
  },
  image: {
    borderRadius: 200,
    height: 50,
    width: 50,
  },
  contentResult: {
    paddingStart: 15,
    flex: 2,
  },
  topResult: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomResult: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  distance: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  numberDistance: {
    fontSize: 30,
    fontWeight: "bold",
    includeFontPadding: false,
    bottom: -3,
  },
  unit: {
    color: color.gray8,
    textAlignVertical: "bottom",
  },
  buttonConnect: {
    backgroundColor: color.greenBlue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  textConnect: {
    color: "white",
  },
});

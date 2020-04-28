import React, { useEffect, useState, useRef } from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { firestoreRef } from "./../../../configs/firebase-config";
import { useRoute } from "@react-navigation/native";
import { GiftedChat } from "react-native-gifted-chat";
import { useDidMountEffect } from "./../../../utils/custom-hook";

const chatRef = firestoreRef.collection("chat");

const ChatScreen = () => {
  console.disableYellowBox = true;
  const user = useSelector((store) => store.user.user);
  const route = useRoute();
  const photographer = route.params ? route.params.photographer : {};
  const roomChat = useRef();
  const [fetchingRoom, setFetchingRoom] = useState(false);
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let unsubcribeChatRoom = () => {};
    const accessRoomchat = async () => {
      setFetchingRoom(true);
      try {
        if (photographer && user) {
          // Check where exist room chat containing user and photographer
          const photographerInfor = photographer.photographerInfor;
          const chatRoomSnapshot = await chatRef
            .where("user.id", "==", user.id)
            .where("photographer.id", "==", photographer.photographerId)
            .get();

          // If no chatRoom exist, create New, and add chat room ref. Elsem just get room chat ref
          if (chatRoomSnapshot.empty) {
            chatRef
              .add({
                createdAt: new Date(),
                user: {
                  id: user.id,
                  name: user.name ? user.name : user.username,
                },
                photographer: {
                  id: photographer.photographerId,
                  name: photographerInfor.name
                    ? photographerInfor.name
                    : photographerInfor.username,
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
            roomChat.current = chatRoomSnapshot.docs[0].ref;
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
                // snapshot.docChanges().forEach((change) => {});
              });
          }
        }
      } catch (error) {
        console.log("ERROR", error.message);
        setError(error.message);
        setFetchingRoom(false);
      }
    };
    accessRoomchat();
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/150/150/any",
        },
      },
    ]);

    return () => {
      unsubcribeChatRoom();
    };
  }, []);

  const accessRoomchat = async () => {
    setFetchingRoom(true);
    try {
      if (photographer && user) {
        // Check where exist room chat containing user and photographer
        const photographerInfor = photographer.photographerInfor;
        const chatRoomSnapshot = await chatRef
          .where("user.id", "==", user.id)
          .where("photographer.id", "==", photographer.photographerId)
          .get();

        // If no chatRoom exist, create New, and add chat room ref
        if (chatRoomSnapshot.empty) {
          chatRef
            .add({
              user: {
                id: user.id,
                name: user.name ? user.name : user.username,
              },
              photographer: {
                id: photographer.photographerId,
                name: photographerInfor.name
                  ? photographerInfor.name
                  : photographerInfor.username,
              },
            })
            .then((docRef) => {
              roomChat.current = docRef;
              setFetchingRoom(false);
            });
        } else {
          roomChat.current = chatRoomSnapshot.docs[0].ref;
          setFetchingRoom(false);
        }
      }
    } catch (error) {
      console.log("ERROR", error.message);
      setError(error.message);
      setFetchingRoom(false);
    }
  };

  const onSend = (message = []) => {
    roomChat.current.collection("messages").add(message[0]);
  };
  console.log("REFREH");
  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user.id,
        }}
      />
    </View>
  );
};

export default ChatScreen;

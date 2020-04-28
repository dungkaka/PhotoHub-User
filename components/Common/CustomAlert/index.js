import React from "react";
import { View, Text, Alert } from "react-native";

const customAlert = (message, onOk, onCancel) => {
  return Alert.alert(
    "Alert",
    message,
    [
      {
        text: "Cancel",
        onPress: () => (onCancel ? onCancel() : {}),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => (onOk ? onOk() : {}),
      },
    ],
    { cancelable: true }
  );
};

export default customAlert;

import React from "react";
import { StyleSheet } from "react-native";
import AppContainer from "./navigation/index";
import { Provider } from "react-redux";
import store from "./redux/store/store";

export default function App() {
  console.log("START APP");
  return (
    <Provider store={store}>
      <AppContainer></AppContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

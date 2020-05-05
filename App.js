import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import AppContainer from "./navigation/index";
import { Provider } from "react-redux";
import store from "./redux/store/store";

export default function App() {
  console.log("START APP");
  return (
    <Provider store={store}>
      <StatusBar
        translucent={true}
        backgroundColor="rgba(0,0,0,0.3)"
        barStyle="default"
        animated={false}
      />
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

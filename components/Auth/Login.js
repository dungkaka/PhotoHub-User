import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  TextInput,
  Button,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/login";
import { setUserFromServer } from "./../../redux/actions/user";
import { color } from "../../utils/f";
import { useDidMountEffect, useGoBackHandler } from "./../../utils/custom-hook";
import Spinner from "react-native-loading-spinner-overlay";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { rainBowGradient } from "./../../utils/gradient";

const { width: WIDTH } = Dimensions.get("window");

const Login = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const loginState = useSelector((store) => store.login);

  const username = useRef("");
  const password = useRef("");

  useGoBackHandler(props.navigation);

  useDidMountEffect(() => {
    if (loading) setLoading(false);
    if (loginState.user != null) {
      dispatch(setUserFromServer());
      // props.navigation.navigate("Hub");

      props.navigation.reset({
        routes: [{ name: "App" }],
      });
    }
    if (loginState.error) {
      Alert.alert(
        "Alert",
        loginState.error,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],

        { cancelable: true }
      );
    }
    return () => {};
  }, [loginState]);

  return (
    <ImageBackground
      source={require("./../../assets/images/background-4.png")}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      resizeMode="cover"
    >
      <Spinner
        visible={loading}
        textStyle={{ color: "black" }}
        cancelable={true}
        animation="fade"
      />

      <View style={{ alignItems: "center" }}>
        <Image
          source={require("./../../assets/images/logo-4.png")}
          resizeMode="center"
          style={{ width: WIDTH * 0.6 }}
        ></Image>
      </View>

      <View>
        <View style={styles.inputContainer}>
          <AntDesign name="user" style={styles.inputIcon}></AntDesign>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={"rgba(0,0,0,0.4)"}
            onChangeText={(value) => (username.current = value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="lastpass"
            style={styles.inputIcon}
          ></MaterialCommunityIcons>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={"rgba(0,0,0,0.4)"}
            onChangeText={(value) => (password.current = value)}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            setLoading(true);
            dispatch(
              login({
                username: username.current,
                password: password.current,
              })
            );
          }}
        >
          <LinearGradient
            colors={rainBowGradient.red}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.btnLogin}
          >
            <AntDesign
              name="login"
              size={24}
              style={{ color: "white" }}
            ></AntDesign>
            <Text style={styles.textLogin}> LOGIN </Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <LinearGradient
              style={styles.btnGoHome}
              colors={rainBowGradient.green}
              start={[0, 0]}
              end={[1, 1]}
            >
              <AntDesign
                name="arrowleft"
                size={24}
                style={{ color: "white" }}
              ></AntDesign>

              <Text style={styles.textGoHome}> BACK </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSignup}
            onPress={() => {
              props.navigation.navigate("Signup");
            }}
          >
            <Text style={styles.textSignup}> SIGNUP </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  inputContainer: {
    width: WIDTH * 0.8,
    marginVertical: 5,
    paddingVertical: 10,
    backgroundColor: `rgba(255,255,255,0.6)`,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 25,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: `rgba(0,0,0,0.7)`,
    paddingHorizontal: 8,
  },
  inputIcon: {
    fontSize: 20,
    color: `rgba(0,0,0,0.4)`,
    paddingHorizontal: 15,
  },
  btnLogin: {
    borderRadius: 25,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowRadius: 5,
    shadowColor: "black",
    shadowOpacity: 1,
  },
  textLogin: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginHorizontal: 10,
    letterSpacing: 1,
  },
  btnSignup: {
    flex: 1,
    marginLeft: 5,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowRadius: 5,
    shadowColor: "black",
    shadowOpacity: 1,
  },
  textSignup: {
    fontSize: 20,
    color: color.greenBlue,
    fontWeight: "bold",
  },
  btnGoHome: {
    flex: 1,
    flexDirection: "row",
    marginRight: 5,
    borderRadius: 25,
    backgroundColor: color.greenBlue,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowRadius: 5,
    shadowColor: "black",
    shadowOpacity: 1,
  },
  textGoHome: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});

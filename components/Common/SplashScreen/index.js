import React, { useState, useEffect } from "react";
import { View, Dimensions, Image, Animated } from "react-native";
import { ImageBackground } from "react-native";

const Logo = require("./../../../assets/images/logo-3.png");
const window = Dimensions.get("window");

const Container = () => {
  const [logoAnimated, setLogoAnimated] = useState(new Animated.Value(0));
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(logoAnimated, {
        toValue: 1,
        tension: 8,
        friction: 2,
        duration: 2000,
      }).start(),
    ]).start(() => {
      setLoadingSpinner(true);
    });
  });

  return (
    <ImageBackground
      source={require("./../../../assets/images/splash.png")}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      resizeMode="cover"
    >
      <Animated.View
        style={{
          opacity: logoAnimated,
          top: logoAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [100, 0],
          }),
        }}
      >
        <Image
          source={Logo}
          resizeMode="center"
          style={{
            width: window.width * 0.6,
          }}
        ></Image>
      </Animated.View>
    </ImageBackground>
  );
};

export default Container;

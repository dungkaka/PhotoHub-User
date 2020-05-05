import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  random_gradient,
  random_rainbowGradient,
} from "./../../../utils/gradient";

const CustomLinearGradient = (props) => {
  const [gradient, setGradident] = useState(["#fff", "#fff"]);

  useEffect(() => {
    setGradident(random_rainbowGradient());
  }, []);

  return (
    <LinearGradient start={[0, 0]} end={[1, 1]} colors={gradient}>
      {props.children}
    </LinearGradient>
  );
};

export default CustomLinearGradient;

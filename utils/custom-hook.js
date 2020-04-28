import { useRef, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";

// Customhook su dung trong function component, giong nhu 1 function binh thuong
// function component, thu tu cua useEffect trong vi du duoi cung tuong ung voi
// function duoc goi truoc hay sau Effect trong thang cha.

export const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export const useGoBackHandler = (navigation) => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.goBack();
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );
};

import { combineReducers } from "redux";
import login from "./login";
import user from "./user";
import listImage from "./list_image";
import collection from "./collection";
import { AsyncStorage } from "react-native";
import request from "../../utils/axios";
import axios from "axios";
import { LOGIN } from "./../../constant/constant";

export const rootReducer = combineReducers({
  login,
  user,
  listImage,
  collection,
  isLogout: (state = "", action) => state,
});

export const appReducer = (state, action) => {
  if (action.type === LOGIN.LOGIN_SUCCESS) {
    state = { login: state.login };
  }
  
  if (action.type === "RESET_DATA") {
    state = undefined;
    AsyncStorage.clear();
    request.server = axios.create({
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return rootReducer(state, action);
};

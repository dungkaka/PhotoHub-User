import { combineReducers } from "redux";
import login from "./login";
import user from "./user";
import listImage from "./list_image";

export const rootReducer = combineReducers({
  login,
  user,
  listImage,
});

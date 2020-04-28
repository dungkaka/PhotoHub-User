import { LOGIN } from "../../constant/constant";
import request from "../../utils/axios";
import * as axios from "axios";
import { URL } from "../../configs/end-points-url";
import { AsyncStorage } from "react-native";

export const login = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(URL.LOGIN(), {
        username: user.username,
        password: user.password,
      });

      const data = response.data;

      if (data.status == true) {
        dispatch(loginSuccess({ user: data.user }));
        AsyncStorage.setItem("userToken", data.access_token);
        AsyncStorage.setItem("user", data.user);

        request.server = await axios.create({
          headers: {
            Authorization: "Bearer " + data.access_token,
            // timeout: 5,
            "Content-Type": "application/json",
          },
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(loginFail(error.message));
    }
  };
};

export const requestLogin = () => ({
  type: LOGIN.LOGIN_REQUEST,
});

export const loginSuccess = ({ user }) => ({
  type: LOGIN.LOGIN_SUCCESS,
  payload: {
    user,
  },
});

export const loginFail = (error) => ({
  type: LOGIN.LOGIN_FAIL,
  payload: {
    error,
  },
});

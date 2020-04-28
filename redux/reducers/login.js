import { LOGIN } from "./../../constant/constant";

const initState = () => {
  return {
    error: null,
    user: null,
    status: null,
  };
};

export default (state = initState(), { type, payload }) => {
  switch (type) {
    case LOGIN.LOGIN_SUCCESS:
      const user = payload.user;
      return {
        ...state,
        user: user,
        error: null,
        status: "log-in",
      };

    case LOGIN.LOGIN_FAIL:
      return {
        ...state,
        error: payload.error,
      };

    case "LOGOUT":
      return {
        ...state,
        status: "log-out",
      };

    default:
      return state;
  }
};

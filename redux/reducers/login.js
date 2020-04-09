import { LOGIN } from "./../../constant/constant";

const initState = () => {
  return {
    loading: false,
    error: null,
    user: null,
  };
};

export default (state = initState(), { type, payload }) => {
  switch (type) {
    case LOGIN.LOGIN_REQUEST:
      return { ...state, loading: true };

    case LOGIN.LOGIN_SUCCESS:
      const user = payload.user;
      return {
        ...state,
        user: user,
        loading: false,
        error: null,
      };

    case LOGIN.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };

    default:
      return state;
  }
};

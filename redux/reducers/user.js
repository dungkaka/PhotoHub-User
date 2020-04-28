const initState = () => {
  return {
    user: null,
    isFetching: false,
    error: "",
  };
};

export default (state = initState(), { type, payload }) => {
  switch (type) {
    case "SET_USER_START":
      return { ...state, isFetching: true };
    case "SET_USER_SUCCESS":
      return {
        ...state,
        user: payload.user,
        isFetching: false,
        error: "",
      };
    case "SET_USER_FAIL":
      return { ...state, isFetching: false, error: payload.error };

    default:
      return state;
  }
};

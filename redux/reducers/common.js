import { FETCH } from "../../constant/constant";

const INIT_STATE = {
  error: "",
  loading: false,
  message: ""
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH.FETCH_START: {
      return { ...state, error: "", message: "", loading: true };
    }
    case FETCH.FETCH_SUCCESS: {
      return { ...state, error: "", message: "", loading: false };
    }
    case FETCH.SHOW_MESSAGE: {
      return { ...state, error: "", message: action.payload, loading: false };
    }
    case FETCH.FETCH_ERROR: {
      return { ...state, loading: false, error: action.payload, message: "" };
    }
    case FETCH.HIDE_MESSAGE: {
      return { ...state, loading: false, error: "", message: "" };
    }
    default:
      return state;
  }
};

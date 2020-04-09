const preUrl = "https://photohub-e7e04.firebaseapp.com/api/v1/";
// const preUrl = "http://localhost:5000/api/v1/";

export const URL = {
  LOGIN: () => {
    return preUrl + "login";
  },

  SIGNUP: () => {
    return preUrl + "signup";
  },

  GET_USER: () => {
    return preUrl + "auth/me";
  },

  GET_TAGS: () => {
    return preUrl + "tags";
  },

  GET_ALL_IMAGE: () => {
    return preUrl + "images";
  },

  GET_LIST_IMAGE_BY_TAG_PAGINATION: () => {
    return preUrl + "images/search/pagination";
  },
};

import { GET_LIST_IMAGE } from "../../constant/constant";
import request from "../../utils/axios";
import * as axios from "axios";
import { URL } from "../../configs/end-points-url";

export const getListImage = (tags, after) => {
  console.log("GO GET LIST IMAGE", after);
  return async (dispatch) => {
    // dispatch(getListImageStart());
    try {
      const response = await axios.post(
        "https://photohub-e7e04.firebaseapp.com/api/v1/images/search/pagination",
        {
          tags,
        },
        {
          params: {
            after: after,
          },
        }
      );

      const data = response.data;

      if (data) {
        dispatch(getListImageSuccess({ listImage: data, after: after }));
      } else {
        throw new Error(data.errors);
      }
    } catch (error) {
      dispatch(getListImageFail(error));
    }
  };
};

export const getListImageSuccess = ({ listImage, after }) => ({
  type: GET_LIST_IMAGE.GET_LIST_IMAGE_SUCCESS,
  payload: {
    listImage,
    after,
  },
});

export const getListImageFail = (error) => ({
  type: GET_LIST_IMAGE.GET_LIST_IMAGE_FAIL,
  payload: {
    error,
  },
});

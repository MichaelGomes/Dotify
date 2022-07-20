import axios from "axios";
import {
  IMAGES_FAIL,
  IMAGES_REQUEST,
  IMAGES_SUCCESS,
} from "../constants/imageConstants";

export const imagesAction = () => async (dispatch) => {
  try {
    dispatch({ type: IMAGES_REQUEST });

    const { data } = await axios.get("/api/files/image");

    dispatch({ type: IMAGES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: IMAGES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

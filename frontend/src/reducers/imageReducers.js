import {
  IMAGES_FAIL,
  IMAGES_REQUEST,
  IMAGES_SUCCESS,
} from "../constants/imageConstants";

export const imagesGetReducer = (state = { images: [] }, action) => {
  switch (action.type) {
    case IMAGES_REQUEST:
      return { loading: true, images: [] };
    case IMAGES_SUCCESS:
      return { loading: false, images: action.payload };
    case IMAGES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

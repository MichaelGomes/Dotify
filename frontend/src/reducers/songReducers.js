import {
  SONG_REMOVE_FAIL,
  SONG_REMOVE_REQUEST,
  SONG_REMOVE_RESET,
  SONG_REMOVE_SUCCESS,
} from "../constants/songConstants";

export const songRemoveReducer = (state = {}, action) => {
  switch (action.type) {
    case SONG_REMOVE_REQUEST:
      return { loading: true };
    case SONG_REMOVE_SUCCESS:
      return { loading: false, success: true };
    case SONG_REMOVE_FAIL:
      return { loading: false, error: action.payload };
    case SONG_REMOVE_RESET:
      return { success: false };
    default:
      return state;
  }
};

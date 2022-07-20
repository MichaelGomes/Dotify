import {
  SONG_REMOVE_FAIL,
  SONG_REMOVE_REQUEST,
  SONG_REMOVE_RESET,
  SONG_REMOVE_SUCCESS,
  SONG_ADD_FAIL,
  SONG_ADD_REQUEST,
  SONG_ADD_RESET,
  SONG_ADD_SUCCESS,
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

export const songAddReducer = (state = {}, action) => {
  switch (action.type) {
    case SONG_ADD_REQUEST:
      return { loading: true };
    case SONG_ADD_SUCCESS:
      return { loading: false, success: action.payload };
    case SONG_ADD_FAIL:
      return { loading: false, error: action.payload };
    case SONG_ADD_RESET:
      return { success: false };
    default:
      return state;
  }
};

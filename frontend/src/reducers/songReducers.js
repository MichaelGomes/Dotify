import {
  SONG_REMOVE_FAIL,
  SONG_REMOVE_REQUEST,
  SONG_REMOVE_RESET,
  SONG_REMOVE_SUCCESS,
  SONG_ADD_FAIL,
  SONG_ADD_REQUEST,
  SONG_ADD_RESET,
  SONG_ADD_SUCCESS,
  SONGS_FAIL,
  SONGS_REQUEST,
  SONGS_SUCCESS,
  SONG_FAIL,
  SONG_REQUEST,
  SONG_SUCCESS,
  SONG_CURRENT_FAIL,
  SONG_CURRENT_REQUEST,
  SONG_CURRENT_SUCCESS,
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

export const songsGetReducer = (state = { songs: [] }, action) => {
  switch (action.type) {
    case SONGS_REQUEST:
      return { loading: true, songs: [] };
    case SONGS_SUCCESS:
      return { loading: false, songs: action.payload };
    case SONGS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const songGetReducer = (state = { song: [] }, action) => {
  switch (action.type) {
    case SONG_REQUEST:
      return { loading: true, song: [] };
    case SONG_SUCCESS:
      return { loading: false, song: action.payload };
    case SONG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const songCurrentIndexReducer = (
  state = { currentSongIndex: [] },
  action
) => {
  switch (action.type) {
    case SONG_CURRENT_REQUEST:
      return { loading: true, currentSongIndex: [] };
    case SONG_CURRENT_SUCCESS:
      return { loading: false, currentSongIndex: action.payload };
    case SONG_CURRENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

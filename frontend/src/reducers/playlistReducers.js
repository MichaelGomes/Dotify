import {
  PLAYLISTS_FAIL,
  PLAYLISTS_REQUEST,
  PLAYLISTS_SUCCESS,
  PLAYLIST_FAIL,
  PLAYLIST_REQUEST,
  PLAYLIST_SUCCESS,
  PLAYLIST_ADD_FAIL,
  PLAYLIST_ADD_REQUEST,
  PLAYLIST_ADD_RESET,
  PLAYLIST_ADD_SUCCESS,
  PLAYLIST_REMOVE_FAIL,
  PLAYLIST_REMOVE_REQUEST,
  PLAYLIST_REMOVE_RESET,
  PLAYLIST_REMOVE_SUCCESS,
} from "../constants/playlistConstants";

export const playlistsGetReducer = (state = { playlists: [] }, action) => {
  switch (action.type) {
    case PLAYLISTS_REQUEST:
      return { loading: true, playlists: [] };
    case PLAYLISTS_SUCCESS:
      return { loading: false, playlists: action.payload };
    case PLAYLISTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const playlistGetReducer = (state = { playlist: [] }, action) => {
  switch (action.type) {
    case PLAYLIST_REQUEST:
      return { loading: true, playlist: [] };
    case PLAYLIST_SUCCESS:
      return { loading: false, playlist: action.payload };
    case PLAYLIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const playlistAddReducer = (state = {}, action) => {
  switch (action.type) {
    case PLAYLIST_ADD_REQUEST:
      return { loading: true };
    case PLAYLIST_ADD_SUCCESS:
      return { loading: false, success: action.payload };
    case PLAYLIST_ADD_FAIL:
      return { loading: false, error: action.payload };
    case PLAYLIST_ADD_RESET:
      return { success: false };
    default:
      return state;
  }
};

export const playlistDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PLAYLIST_REMOVE_REQUEST:
      return { loading: true };
    case PLAYLIST_REMOVE_SUCCESS:
      return { loading: false, success: true };
    case PLAYLIST_REMOVE_FAIL:
      return { loading: false, error: action.payload };
    case PLAYLIST_REMOVE_RESET:
      return { success: false };
    default:
      return state;
  }
};

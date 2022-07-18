import {
  PLAYLISTS_FAIL,
  PLAYLISTS_REQUEST,
  PLAYLISTS_SUCCESS,
  PLAYLIST_FAIL,
  PLAYLIST_REQUEST,
  PLAYLIST_SUCCESS,
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

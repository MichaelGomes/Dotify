import axios from "axios";
import {
  SONG_REMOVE_FAIL,
  SONG_REMOVE_REQUEST,
  SONG_REMOVE_SUCCESS,
  SONG_ADD_FAIL,
  SONG_ADD_REQUEST,
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

export const songRemoveAction = (id, songid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SONG_REMOVE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/playlist/${id}/song/${songid}`, config);

    dispatch({
      type: SONG_REMOVE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: SONG_REMOVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const songAddAction =
  (id, name, album, artists, image, music, duration) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: SONG_ADD_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/playlist/${id}/song`,
        { name, album, artists, image, music, duration },
        config
      );

      dispatch({
        type: SONG_ADD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SONG_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const songsGetAction = () => async (dispatch) => {
  try {
    dispatch({ type: SONGS_REQUEST });

    const { data } = await axios.get("/api/songs");

    dispatch({ type: SONGS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SONGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const songGetAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: SONG_REQUEST });

    const { data } = await axios.get(`/api/songs/${id}`);

    dispatch({ type: SONG_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SONG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const songCurrentIndexAction = (index) => async (dispatch) => {
  try {
    dispatch({ type: SONG_CURRENT_REQUEST });

    dispatch({ type: SONG_CURRENT_SUCCESS, payload: index });
  } catch (error) {
    dispatch({
      type: SONG_CURRENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

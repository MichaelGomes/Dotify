import axios from "axios";
import {
  SONG_REMOVE_FAIL,
  SONG_REMOVE_REQUEST,
  SONG_REMOVE_SUCCESS,
  SONG_ADD_FAIL,
  SONG_ADD_REQUEST,
  SONG_ADD_SUCCESS,
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

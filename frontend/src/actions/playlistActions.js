import axios from "axios";
import {
  PLAYLISTS_FAIL,
  PLAYLISTS_REQUEST,
  PLAYLISTS_SUCCESS,
  PLAYLIST_FAIL,
  PLAYLIST_REQUEST,
  PLAYLIST_SUCCESS,
  PLAYLIST_ADD_FAIL,
  PLAYLIST_ADD_REQUEST,
  PLAYLIST_ADD_SUCCESS,
  PLAYLIST_REMOVE_FAIL,
  PLAYLIST_REMOVE_REQUEST,
  PLAYLIST_REMOVE_SUCCESS,
  PLAYLIST_EDIT_FAIL,
  PLAYLIST_EDIT_REQUEST,
  PLAYLIST_EDIT_SUCCESS,
} from "../constants/playlistConstants";

export const playlistsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PLAYLISTS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/playlist", config);

    dispatch({ type: PLAYLISTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PLAYLISTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const playlistAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PLAYLIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/playlist/${id}`, config);

    dispatch({ type: PLAYLIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PLAYLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const playlistAddAction =
  (name, description, image) => async (dispatch, getState) => {
    try {
      dispatch({ type: PLAYLIST_ADD_REQUEST });

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
        "/api/playlist",
        { name, description, image },
        config
      );

      dispatch({ type: PLAYLIST_ADD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PLAYLIST_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const playlistDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PLAYLIST_REMOVE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/playlist/${id}`, config);

    dispatch({
      type: PLAYLIST_REMOVE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PLAYLIST_REMOVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const playlistEditAction =
  (id, name, description, image) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PLAYLIST_EDIT_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(
        `/api/playlist/${id}`,
        { name, description, image },
        config
      );

      dispatch({
        type: PLAYLIST_EDIT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PLAYLIST_EDIT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

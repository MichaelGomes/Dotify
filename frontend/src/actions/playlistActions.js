import axios from "axios";
import {
  PLAYLISTS_FAIL,
  PLAYLISTS_REQUEST,
  PLAYLISTS_SUCCESS,
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

import axios from "axios";
import {
  SONG_REMOVE_FAIL,
  SONG_REMOVE_REQUEST,
  SONG_REMOVE_SUCCESS,
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

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { playlistAction } from "../actions/playlistActions";
import ProfileButton from "../components/ProfileButton";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import SongTableRow from "../components/SongTableRow";

const PlaylistScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Global State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const playlistGet = useSelector((state) => state.playlistGet);
  const { loading, error, playlist } = playlistGet;

  //useEffect
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (userInfo?.verified === false) {
      navigate("/verify");
    }
    dispatch(playlistAction(id));
  }, [dispatch, id, navigate, userInfo]);

  return (
    <div className="main-content">
      <div className="playlist-screen">
        <ProfileButton />
        {loading && <Loader />}
        {error && <Alert>{error}</Alert>}

        <img
          className="playlist-screen-img"
          src={`/api/files/image/${playlist?.image}`}
          alt="Album Artwork"
        ></img>
        <div className="playlist-header-text inline">
          <h1 className="white ">{playlist?.name}</h1>
          <h2 className="grey">{playlist?.description}</h2>
          {/* <h3 className="grey">{playlistLength} songs</h3> */}
        </div>

        <div className="song-container">
          <i class="fa-solid fa-circle-play pointer"></i>
          <div className="option-dropdown inline">
            <i
              id="playlist-settings"
              class="fa-solid fa-ellipsis pointer options grey white-h"
            ></i>
          </div>
          <div className="grey table">
            <div className="row">
              <p className="number inline">#</p>
              <p className="title inline">TITLE</p>

              <p className="album inline">ALBUM</p>
              <p className="duration inline">DURATION</p>
            </div>
            <>
              {playlist?.songs?.map((song, index) => (
                <SongTableRow key={song._id} index={index} song={song} />
              ))}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistScreen;

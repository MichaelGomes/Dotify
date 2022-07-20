import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { songGetAction, songAddAction } from "../actions/songActions";
import ProfileButton from "../components/ProfileButton";
import Loader from "../components/Loader";
import Alert from "../components/Alert";

const AlbumScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Local State
  const [popupHidden, setPopupHidden] = useState(true);
  const [playlistPopupHidden, setPlaylistPopupHidden] = useState(true);

  //Global State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const songGet = useSelector((state) => state.songGet);
  const { loading, error, song } = songGet;

  const playlistsGet = useSelector((state) => state.playlistsGet);
  const { playlists } = playlistsGet;

  //useEffect
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (userInfo?.verified === false) {
      navigate("/verify");
    }
    dispatch(songGetAction(id));
  }, [dispatch, id, navigate, userInfo]);

  //Functions
  const settingsClick = () => {
    if (popupHidden === true) {
      setPopupHidden(false);
    } else {
      setPopupHidden(true);
    }
  };

  const addToPlaylistPopup = () => {
    setPlaylistPopupHidden(false);
    setPopupHidden(true);
  };

  const closeBtnClick = () => {
    setPlaylistPopupHidden(true);
  };

  const addToPlaylist = (e) => {
    let id = e.target.id;
    let name = song.name;
    let album = song.album;
    let artists = song.artists;
    let image = song.image;
    let music = song.music;
    let duration = song.duration;

    dispatch(songAddAction(id, name, album, artists, image, music, duration));
    setPlaylistPopupHidden(true);
  };

  return (
    <>
      <div className="main-content">
        <div className="album-screen">
          <ProfileButton />
          {loading && <Loader />}
          {error && <Alert>{error}</Alert>}
          <img
            className="album-screen-img"
            src={`/api/files/image/${song?.image}`}
            alt="Album Artwork"
          ></img>
          <div className="playlist-header-text inline">
            <h4 className="white">ALBUM</h4>
            <h1 className="white">{song?.album}</h1>
            <h2 className="grey">{song?.artists}</h2>
          </div>

          <div className="album-song-container">
            <div className="grey table">
              <div className="row">
                <p className="number inline">#</p>
                <p className="title inline">TITLE</p>
                <p className="duration inline">DURATION</p>
              </div>

              <div>
                <div className="row song-table-row pointer">
                  <p className="number inline">1</p>
                  <div className="title inline">
                    <img
                      className="album-screen-img-sm"
                      src={`/api/files/image/${song?.image}`}
                      alt="Album Artwork"
                    ></img>
                    <h5 className="song-info inline">
                      {song?.name} <p>{song?.artists}</p>
                    </h5>
                  </div>
                  <p className="duration inline">
                    {song?.duration}
                    <i
                      class="fa-solid fa-ellipsis hidden"
                      onClick={settingsClick}
                    ></i>
                  </p>

                  {/* Popups */}
                  <div className="album-song-popup inline" id="popup">
                    <p hidden={popupHidden} onClick={addToPlaylistPopup}>
                      Add to Playlist
                    </p>
                  </div>

                  <div
                    className="playlist-popup"
                    id="playlist-popup"
                    hidden={playlistPopupHidden}
                  >
                    <span class="closebtn inline" onClick={closeBtnClick}>
                      &times;
                    </span>
                    <h2 className="white">Add {song?.name} To Playlist</h2>
                    {playlists?.map((playlist) => (
                      <p
                        key={playlist._id}
                        id={playlist._id}
                        className="pointer white-h"
                        onClick={addToPlaylist}
                      >
                        {playlist.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlbumScreen;

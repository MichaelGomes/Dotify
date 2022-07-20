import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  songRemoveAction,
  songAddAction,
  songCurrentIndexAction,
} from "../actions/songActions";
import { playlistCurrentAction } from "../actions/playlistActions";

const SongTableRow = ({ song, index }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  //Local State
  const [hover, setHover] = useState(false);
  const [popupHidden, setPopupHidden] = useState(true);
  const [playlistPopupHidden, setPlaylistPopupHidden] = useState(true);

  //Global State
  const playlistsGet = useSelector((state) => state.playlistsGet);
  const { playlists } = playlistsGet;

  //Functions
  const settingsClick = () => {
    if (popupHidden === true) {
      setPopupHidden(false);
    } else {
      setPopupHidden(true);
    }
  };

  const deleteClick = () => {
    dispatch(songRemoveAction(id, song._id));
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

  const playSong = () => {
    dispatch(songCurrentIndexAction(index));
    dispatch(playlistCurrentAction(id));
  };

  return (
    <>
      <div
        className="row song-table-row pointer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hover ? (
          <i
            id="play"
            class="fa-solid fa-play number white"
            onClick={playSong}
          ></i>
        ) : (
          <p id="number" className="number inline">
            {index + 1}
          </p>
        )}
        <div className="title inline">
          <img
            className="playlist-screen-img-sm"
            src={`/api/files/image/${song.image}`}
            alt="Album Artwork"
          ></img>

          <h5 className="song-info inline">
            {song.name} <p>{song.artists}</p>
          </h5>
        </div>

        <p className="album inline">{song.album}</p>
        <p className="duration inline">
          {song.duration}
          <i class="fa-solid fa-ellipsis hidden" onClick={settingsClick}></i>
        </p>
      </div>

      {/* POPUPS */}

      <div className="song-popup" id="popup">
        <p className="pointer" hidden={popupHidden} onClick={deleteClick}>
          Remove Song
        </p>
        <p
          className="pointer"
          hidden={popupHidden}
          onClick={addToPlaylistPopup}
        >
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
        <h2 className="white">Add {song.name} To Playlist</h2>
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
    </>
  );
};

export default SongTableRow;

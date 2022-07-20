import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { songRemoveAction } from "../actions/songActions";

const SongTableRow = ({ song, index }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  //Local State
  const [hover, setHover] = useState(false);
  const [popupHidden, setPopupHidden] = useState(true);

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

  return (
    <>
      <div
        className="row song-table-row pointer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hover ? (
          <i id="play" class="fa-solid fa-play number white"></i>
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
        <p className="pointer" hidden={popupHidden}>
          Add to Playlist
        </p>
      </div>
    </>
  );
};

export default SongTableRow;

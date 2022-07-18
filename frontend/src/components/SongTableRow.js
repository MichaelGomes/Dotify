import React, { useState } from "react";

const SongTableRow = ({ song, index }) => {
  //Local State
  const [hover, setHover] = useState(false);

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
          <i class="fa-solid fa-ellipsis hidden"></i>
        </p>
      </div>
    </>
  );
};

export default SongTableRow;

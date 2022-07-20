import React from "react";
import { LinkContainer } from "react-router-bootstrap";

const PlaylistCard = ({ playlist, song }) => {
  return (
    <>
      {playlist && (
        <LinkContainer to={`/playlist/${playlist._id}`}>
          <div className="playlist-card inline white pointer">
            <img
              className="inline"
              src={`/api/files/image/${playlist.image}`}
              alt="Album Artwork"
            ></img>
            <h4>{playlist?.name}</h4>
            <h5>{playlist.description}</h5>
          </div>
        </LinkContainer>
      )}
      {song && (
        <LinkContainer to={`/album/${song._id}`}>
          <div className="playlist-card inline white pointer">
            <img
              className="inline"
              src={`/api/files/image/${song.image}`}
              alt="Album Artwork"
            ></img>
            <h4>{song?.album.slice(0, 34)}</h4>
            <h5>{song.artists}</h5>
          </div>
        </LinkContainer>
      )}
    </>
  );
};

export default PlaylistCard;

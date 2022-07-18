import React from "react";
import { LinkContainer } from "react-router-bootstrap";

const PlaylistCardSmall = ({ playlist }) => {
  return (
    <LinkContainer to={`/playlist/${playlist._id}`}>
      <div className="playlist pointer inline">
        <img
          className="inline"
          src={`/api/files/image/${playlist.image}`}
          alt="Album Artwork"
        ></img>
        <h4 className="inline">{playlist?.name}</h4>
      </div>
    </LinkContainer>
  );
};

export default PlaylistCardSmall;

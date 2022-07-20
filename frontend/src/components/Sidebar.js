import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Container } from "react-bootstrap";
import { playlistsAction } from "../actions/playlistActions";

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  //Global State
  const playlistsGet = useSelector((state) => state.playlistsGet);
  const { playlists } = playlistsGet;

  useEffect(() => {
    if (location.pathname === "/") {
      document.getElementById("home").classList.add("white");
      document.getElementById("home").classList.remove("grey");
    }
    dispatch(playlistsAction());
  }, [dispatch, location]);

  return (
    <div className="sidebar">
      <Container>
        <LinkContainer to="/">
          <div className="brand pointer">
            <img
              className="logo"
              src={require("../logo.svg").default}
              alt="logo"
            />
            <h2 className="brand-text">Dotify</h2>
          </div>
        </LinkContainer>
        <ul className="white">
          <LinkContainer to="/">
            <li className="pointer">
              <i class="fa-solid fa-house"></i>
              <p className="inline grey white-h" id="home">
                Home
              </p>
            </li>
          </LinkContainer>
          <LinkContainer to="/search">
            <li className="pointer">
              <i class="fa-solid fa-magnifying-glass"></i>
              <p className="inline grey white-h" id="search">
                Search
              </p>
            </li>
          </LinkContainer>

          <LinkContainer to="/library">
            <li className="pointer">
              <i class="fa-solid fa-book"></i>
              <p className="inline grey white-h" id="library">
                Your Library
              </p>
            </li>
          </LinkContainer>
        </ul>

        <ul className="white">
          <li className="pointer">
            <i class="fa-solid fa-circle-plus"></i>
            <p className="inline grey white-h" id="playlist">
              Create a playlist
            </p>
          </li>
        </ul>

        <hr />
        <ul className="grey playlists">
          {playlists?.map((playlist) => (
            <LinkContainer key={playlist._id} to={`/playlist/${playlist._id}`}>
              <li className="pointer white-h">
                <p>{playlist.name}</p>
              </li>
            </LinkContainer>
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default Sidebar;

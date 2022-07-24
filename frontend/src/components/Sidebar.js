import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Container } from "react-bootstrap";
import { playlistsAction, playlistAddAction } from "../actions/playlistActions";
import { PLAYLIST_ADD_RESET } from "../constants/playlistConstants";

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  //Global State
  const playlistsGet = useSelector((state) => state.playlistsGet);
  const { playlists } = playlistsGet;

  const playlistAdd = useSelector((state) => state.playlistAdd);
  const { success } = playlistAdd;

  useEffect(() => {
    if (location.pathname === "/") {
      document.getElementById("home").classList.add("white");
      document.getElementById("home").classList.remove("grey");
      document.getElementById("search").classList.remove("white");
      document.getElementById("search").classList.add("grey");
      document.getElementById("library").classList.remove("white");
      document.getElementById("library").classList.add("grey");
    } else if (location.pathname === "/search") {
      document.getElementById("search").classList.add("white");
      document.getElementById("search").classList.remove("grey");
      document.getElementById("home").classList.remove("white");
      document.getElementById("home").classList.add("grey");
      document.getElementById("library").classList.remove("white");
      document.getElementById("library").classList.add("grey");
    } else if (location.pathname === "/library") {
      document.getElementById("library").classList.add("white");
      document.getElementById("library").classList.remove("grey");
      document.getElementById("home").classList.remove("white");
      document.getElementById("home").classList.add("grey");
      document.getElementById("search").classList.remove("white");
      document.getElementById("search").classList.add("grey");
    } else {
      document.getElementById("home").classList.remove("white");
      document.getElementById("home").classList.add("grey");
      document.getElementById("search").classList.remove("white");
      document.getElementById("search").classList.add("grey");
      document.getElementById("library").classList.remove("white");
      document.getElementById("library").classList.add("grey");
    }

    dispatch(playlistsAction());
  }, [dispatch, location]);

  //Functions
  const createPlaylist = () => {
    const name = "New Playlist";
    const description = "Enter a description";
    const image = "dee037839514985deb271b2a3f8c16db.jpg";
    dispatch(playlistAddAction(name, description, image));

    //Close Mobile Menu
    hamburgerClose();
  };

  const refresh = () => {
    dispatch(playlistsAction());
    dispatch({ type: PLAYLIST_ADD_RESET });
  };

  //Functions for Mobile Menu
  const hamburgerOpen = () => {
    //Switch Icons
    document.getElementById("bars").classList.add("hidden");
    document.getElementById("close-btn").classList.remove("hidden");
    //Display Sidebar
    document.getElementById("full-sidebar").classList.remove("hidden");
  };

  const hamburgerClose = () => {
    //Switch Icons
    document.getElementById("close-btn").classList.add("hidden");
    document.getElementById("bars").classList.remove("hidden");
    //Hide Sidebar
    document.getElementById("full-sidebar").classList.add("hidden");
  };

  return (
    <>
      {/* Hamburger Menu */}

      <i
        id="bars"
        class="fa-solid fa-bars white hamburger-menu pointer hidden"
        onClick={hamburgerOpen}
      ></i>

      {/* Mobile Sidebar */}
      <div id="full-sidebar" className="full-sidebar hidden">
        <i
          id="close-btn"
          class="fa-solid fa-xmark white hamburger-menu pointer hidden"
          onClick={hamburgerClose}
        ></i>

        <Container>
          <LinkContainer to="/">
            <h1 className="grey white-h pointer" onClick={hamburgerClose}>
              Home
            </h1>
          </LinkContainer>
          <LinkContainer to="/search">
            <h1 className="grey white-h pointer" onClick={hamburgerClose}>
              Search
            </h1>
          </LinkContainer>
          <LinkContainer to="/library">
            <h1 className="grey white-h pointer" onClick={hamburgerClose}>
              Your Library
            </h1>
          </LinkContainer>
          <h1
            className="grey white-h pointer"
            id="playlist"
            onClick={createPlaylist}
          >
            Create a playlist
          </h1>
        </Container>
      </div>

      {/* Desktop Sidebar */}
      <div className="sidebar">
        {success && refresh()}
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
              <p
                className="inline grey white-h"
                id="playlist"
                onClick={createPlaylist}
              >
                Create a playlist
              </p>
            </li>
          </ul>

          <hr />
          <ul className="grey playlists">
            {playlists?.map((playlist) => (
              <LinkContainer
                key={playlist._id}
                to={`/playlist/${playlist._id}`}
              >
                <li className="pointer white-h">
                  <p>{playlist.name}</p>
                </li>
              </LinkContainer>
            ))}
          </ul>
        </Container>
      </div>
    </>
  );
};

export default Sidebar;

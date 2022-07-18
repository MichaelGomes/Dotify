import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container } from "react-bootstrap";

const Sidebar = () => {
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
          <li className="pointer white-h">
            <p>Test List</p>
          </li>
          <li className="pointer white-h">
            <p>Test List</p>
          </li>
          <li className="pointer white-h">
            <p>Test List</p>
          </li>
          <li className="pointer white-h">
            <p>Test List</p>
          </li>
          <li className="pointer white-h">
            <p>Test List</p>
          </li>
          <li className="pointer white-h">
            <p>Test List</p>
          </li>
          <li className="pointer white-h">
            <p>Test List</p>
          </li>
          <li className="pointer white-h">
            <p>Test List</p>
          </li>
        </ul>
      </Container>
    </div>
  );
};

export default Sidebar;

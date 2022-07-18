import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { playlistsAction } from "../actions/playlistActions";
import ProfileButton from "../components/ProfileButton";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import PlaylistCardSmall from "../components/PlaylistCardSmall";

const HomeScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Global State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const playlistsGet = useSelector((state) => state.playlistsGet);
  const { loading, error, playlists } = playlistsGet;

  //useEffect
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (userInfo?.verified === false) {
      navigate("/verify");
    }
    dispatch(playlistsAction());
  }, [navigate, userInfo, dispatch]);

  return (
    <div className="main-content">
      <div className="home-screen white">
        <div className="heading">
          <h1 className="inline">Welcome, {userInfo?.name}</h1>
          <ProfileButton />
        </div>
        {loading && <Loader />}
        {error && <Alert>{error}</Alert>}
        <div className="playlist-container">
          {playlists?.map((playlist) => (
            <PlaylistCardSmall key={playlist._id} playlist={playlist} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;

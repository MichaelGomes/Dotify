import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { playlistsAction } from "../actions/playlistActions";
import ProfileButton from "../components/ProfileButton";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import PlaylistCard from "../components/PlaylistCard";

const LibraryScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  }, [dispatch, navigate, userInfo]);

  return (
    <>
      <div className="main-content">
        <div className="ml-content library-screen">
          <ProfileButton />
          <h2 className="white">Your Playlists</h2>

          {loading && <Loader />}
          {error && <Alert>{error}</Alert>}

          <div className="card-container">
            {playlists?.map((playlist) => (
              <PlaylistCard key={playlist._id} playlist={playlist} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LibraryScreen;

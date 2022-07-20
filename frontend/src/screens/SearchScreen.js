import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { songsGetAction } from "../actions/songActions";
import ProfileButton from "../components/ProfileButton";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import PlaylistCard from "../components/PlaylistCard";

const SearchScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Local State
  const [keyword, setKeyword] = useState("");

  //Global State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const songsGet = useSelector((state) => state.songsGet);
  const { loading, error, songs } = songsGet;

  //useEffect
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (userInfo?.verified === false) {
      navigate("/verify");
    }
    dispatch(songsGetAction());
  }, [dispatch, userInfo, navigate]);

  //Functions
  const preventDefault = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="main-content">
        <div className="ml-content search-screen">
          <ProfileButton />
          <form className="search-bar" onSubmit={preventDefault}>
            <input
              type="search"
              placeholder="Search Artists, Albums or Songs"
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
            ></input>
            <i class="fa-solid fa-magnifying-glass search-icon pointer"></i>
          </form>
          {loading && <Loader />}
          {error && <Alert>{error}</Alert>}
          {keyword === "" ? (
            <>
              <h1 className="white">All Albums</h1>

              <div className="search-card-container">
                {songs?.map((song) => (
                  <PlaylistCard key={song._id} song={song} />
                ))}
              </div>
            </>
          ) : (
            <>
              {keyword !== "" && (
                <>
                  <h1 className="white">Songs</h1>
                  <hr className="white" />
                  <div className="search-card-container">
                    {songs
                      ?.filter(function (song) {
                        let orgName = song.name;
                        let name = orgName.toUpperCase();
                        let search = keyword.toUpperCase();
                        if (name.includes(search)) {
                          return song;
                        }
                        return null;
                      })
                      .map((song) => (
                        <PlaylistCard key={song._id} song={song} />
                      ))}
                  </div>

                  <h1 className="white">Albums</h1>
                  <hr className="white" />
                  <div className="search-card-container">
                    {songs
                      ?.filter(function (song) {
                        let orgAlbum = song.album;
                        let album = orgAlbum.toUpperCase();
                        let search = keyword.toUpperCase();
                        if (album.includes(search)) {
                          return song;
                        }
                        return null;
                      })
                      .map((song) => (
                        <PlaylistCard key={song._id} song={song} />
                      ))}
                  </div>

                  <h1 className="white">Artists</h1>
                  <hr className="white" />
                  <div className="search-card-container">
                    {songs
                      ?.filter(function (song) {
                        let orgArtists = song.artists;
                        let artists = orgArtists.toUpperCase();
                        let search = keyword.toUpperCase();
                        if (artists.includes(search)) {
                          return song;
                        }
                        return null;
                      })
                      .map((song) => (
                        <PlaylistCard key={song._id} song={song} />
                      ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchScreen;

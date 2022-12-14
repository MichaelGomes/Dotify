import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  playlistAction,
  playlistDeleteAction,
  playlistEditAction,
  playlistCurrentAction,
} from "../actions/playlistActions";
import { songCurrentIndexAction } from "../actions/songActions";
import { imagesAction } from "../actions/imageActions";
import { PLAYLIST_EDIT_RESET } from "../constants/playlistConstants";
import { SONG_REMOVE_RESET, SONG_ADD_RESET } from "../constants/songConstants";
import ProfileButton from "../components/ProfileButton";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import SongTableRow from "../components/SongTableRow";

const PlaylistScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Local State
  const [lengthSwitch, setLengthSwitch] = useState(0);
  const [playlistLength, setPlaylistLength] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  //Global State
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const playlistGet = useSelector((state) => state.playlistGet);
  const { loading, error, playlist } = playlistGet;

  const playlistEdit = useSelector((state) => state.playlistEdit);
  const {
    loading: editLoading,
    error: editError,
    success: editSuccess,
  } = playlistEdit;

  const imagesGet = useSelector((state) => state.imagesGet);
  const { error: imagesError, images } = imagesGet;

  const songRemove = useSelector((state) => state.songRemove);
  const { success: songRemoveSuccess } = songRemove;

  const songAdd = useSelector((state) => state.songAdd);
  const { success: addSuccess, error: addError } = songAdd;

  //useEffect
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (userInfo?.verified === false) {
      navigate("/verify");
    }
    setLengthSwitch(0);
    dispatch(playlistAction(id));
  }, [dispatch, id, navigate, userInfo]);

  //Functions
  const getPlaylistLength = () => {
    if (playlist) {
      let songs = playlist?.songs;
      if (songs?.length !== undefined) {
        setPlaylistLength(songs.length);
        setLengthSwitch(1);
      }
    }
  };

  const refresh = () => {
    dispatch({ type: PLAYLIST_EDIT_RESET });
    dispatch({ type: SONG_REMOVE_RESET });
    dispatch({ type: SONG_ADD_RESET });
    dispatch(playlistAction(id));
  };

  const playlistSettings = () => {
    //Toggle Playlist Edit & Delete Buttons
    document.getElementById("edit").classList.toggle("hidden");
    document.getElementById("edit").classList.toggle("inline");
    document.getElementById("delete").classList.toggle("hidden");
    document.getElementById("delete").classList.toggle("inline");
    document.getElementById("playlist-settings").classList.toggle("white");
    document.getElementById("playlist-settings").classList.toggle("grey");
  };

  const playlistEditClick = () => {
    // Hide Playlist Edit & Delete Buttons
    document.getElementById("edit").classList.add("hidden");
    document.getElementById("edit").classList.remove("inline");
    document.getElementById("delete").classList.add("hidden");
    document.getElementById("delete").classList.remove("inline");
    //Display Edit Modal
    document.getElementById("playlist-modal").classList.toggle("hidden");
    // Set State Values
    setName(playlist?.name);
    setDescription(playlist?.description);
    setImage(playlist?.image);
  };

  const playlistDeleteClick = () => {
    dispatch(playlistDeleteAction(id));
    navigate("/");
  };

  //Functions for Edit Playlist Modal
  const imgHover = () => {
    //Display Choose Artwork
    document.getElementById("artwork").classList.toggle("hidden");
    document.getElementById("choose-artwork").classList.toggle("hidden");
  };

  const imgClick = () => {
    //Display Image Modal
    document.getElementById("image-modal").classList.toggle("hidden");
    //Get All Images
    dispatch(imagesAction());
  };

  const editPlaylistSubmit = () => {
    document.getElementById("playlist-modal").classList.toggle("hidden");
    dispatch(playlistEditAction(id, name, description, image));
  };

  //Functions for Edit Image Modal
  const imageModalClose = () => {
    document.getElementById("image-modal").classList.toggle("hidden");
  };

  const newImgClick = (e) => {
    setImage(e.target.name);
    document.getElementById("image-modal").classList.toggle("hidden");
  };

  //Function for Selecting Playlist to Play
  const playPlaylist = () => {
    dispatch(songCurrentIndexAction(0));
    dispatch(playlistCurrentAction(id));
  };

  return (
    <>
      {lengthSwitch === 0 && getPlaylistLength()}
      {editSuccess && refresh()}
      {songRemoveSuccess && refresh()}
      {addSuccess && refresh()}
      <div className="main-content">
        <div className="playlist-screen ml-240">
          <ProfileButton />
          {loading && <Loader />}
          {error && <Alert>{error}</Alert>}
          {editLoading && <Loader />}
          {editError && <Alert>{editError}</Alert>}
          {addError && <Alert>{addError}</Alert>}

          {/* Edit Playlist Modal */}
          <div className="edit-playlist-modal hidden" id="playlist-modal">
            <div className="edit-playlist-modal-content">
              <h2 className="white inline">Edit Playlist</h2>
              <span
                className="white modal-closebtn white-h"
                onClick={playlistEditClick}
              >
                &times;
              </span>
              <div>
                <img
                  id="artwork"
                  className="pointer"
                  src={`/api/files/image/${image}`}
                  alt="Album Artwork"
                  onMouseEnter={imgHover}
                ></img>
                <img
                  id="choose-artwork"
                  className="hidden pointer"
                  src={`/api/files/image/dee037839514985deb271b2a3f8c16db.jpg`}
                  alt="Album Artwork"
                  onMouseLeave={imgHover}
                  onClick={imgClick}
                ></img>

                <input
                  className="inline name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
                <textarea
                  className="inline desc-input"
                  value={description}
                  placeholder="Enter an optional description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <button className="pointer" onClick={editPlaylistSubmit}>
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Edit Image Modal */}
          <div className="edit-image-modal hidden" id="image-modal">
            {imagesError && <Alert>{imagesError}</Alert>}
            <div className="edit-image-modal-content">
              <h3 className="white">Choose a new image</h3>
              <span
                className="white modal-closebtn white-h"
                onClick={imageModalClose}
              >
                &times;
              </span>
              {images?.slice(0, 5).map((image) => (
                <img
                  className="inline pointer"
                  src={`/api/files/image/${image?.filename}`}
                  alt="Album Artwork"
                  name={image?.filename}
                  onClick={newImgClick}
                ></img>
              ))}
            </div>
          </div>

          <img
            className="playlist-screen-img"
            src={`/api/files/image/${playlist?.image}`}
            alt="Album Artwork"
          ></img>
          <div className="playlist-header-text inline">
            <h1 className="white ">{playlist?.name}</h1>
            <h2 className="grey">{playlist?.description}</h2>
            <h3 className="grey">{playlistLength} songs</h3>
          </div>

          <div className="song-container">
            <i
              class="fa-solid fa-circle-play pointer"
              onClick={playPlaylist}
            ></i>
            <div className="option-dropdown inline">
              <i
                id="playlist-settings"
                class="fa-solid fa-ellipsis pointer options grey white-h"
                onClick={playlistSettings}
              ></i>
              <p
                id="edit"
                className="hidden options-select white pointer"
                onClick={playlistEditClick}
              >
                Edit Playlist
              </p>
              <p
                id="delete"
                className="hidden options-select white pointer"
                onClick={playlistDeleteClick}
              >
                Delete Playlist
              </p>
            </div>
            <div className="grey table">
              <div className="row">
                <p className="number inline">#</p>
                <p className="title inline">TITLE</p>

                <p className="album inline">ALBUM</p>
                <p className="duration inline">DURATION</p>
              </div>
              <>
                {playlist?.songs?.map((song, index) => (
                  <SongTableRow key={song._id} index={index} song={song} />
                ))}
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaylistScreen;

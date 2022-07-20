import asyncHandler from "express-async-handler";
import Playlist from "../models/playlistModel.js";

// @desc   Get user playlists
// @route  GET /api/playlist
// @access Private
const getUserPlaylists = asyncHandler(async (req, res) => {
  const playlists = await Playlist.find({ user: req.user });

  res.json(playlists);
});

// @desc   Get single playlist
// @route  GET /api/playlist/:id
// @access Private
const getUserPlaylistById = asyncHandler(async (req, res) => {
  const playlist = await Playlist.findById(req.params.id);

  //User Verification
  if (playlist.user.toString() === req.user._id.toString()) {
    if (playlist) {
      res.json(playlist);
    } else {
      res.status(404);
      throw new Error("Playlist Not Found");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, Incorrect User");
  }
});

// @desc   Add a playlist
// @route  POST /api/playlist/
// @access Private
const addUserPlaylistById = asyncHandler(async (req, res) => {
  const { name, description, image } = req.body;

  //If no Name
  if (!req.body.name || req.body.name.replace(/ /g, "").length === 0) {
    res.status(400);
    throw new Error("No Name Entered");
  }

  //If description longer than 50 characters
  if (req.body.description.length > 50) {
    res.status(400);
    throw new Error("Description reached the character limit of 50");
  }

  const newPlaylist = await Playlist.create({
    user: req.user._id,
    name: name,
    description: description,
    image: image,
  });

  await newPlaylist.save();

  res.json("Playlist Created");
});

// @desc   Remove a playlist
// @route  DELETE /api/playlist/:id
// @access Private
const deleteUserPlaylistById = asyncHandler(async (req, res) => {
  const playlist = await Playlist.findById(req.params.id);

  if (playlist) {
    //User Verification
    if (playlist.user.toString() === req.user._id.toString()) {
      await playlist.remove();
      res.json("Playlist Removed");
    } else {
      res.status(404);
      throw new Error("Incorrect User, Not Authorized");
    }
  } else {
    res.status(404);
    throw new Error("Playlist Not Found");
  }
});

// @desc   Edit a playlist
// @route  PUT /api/playlist/:id
// @access Private
const editUserPlaylistById = asyncHandler(async (req, res) => {
  //If no Name
  if (!req.body.name || req.body.name.replace(/ /g, "").length === 0) {
    res.status(400);
    throw new Error("No Name Entered");
  }

  //If description longer than 50 characters
  if (req.body.description) {
    if (req.body.description.length > 50) {
      res.status(400);
      throw new Error("Description reached the character limit of 50");
    }
  }

  const playlist = await Playlist.findById(req.params.id);

  if (playlist) {
    //User Verification
    if (playlist.user.toString() === req.user._id.toString()) {
      playlist.name = req.body.name || playlist.name;
      playlist.description = req.body.description || playlist.description;
      playlist.image = req.body.image || playlist.image;

      await playlist.save();

      res.json("Playlist has been updated");
    } else {
      res.status(404);
      throw new Error("Incorrect User, Not Authorized.");
    }
  } else {
    res.status(404);
    throw new Error("Playlist Not Found");
  }
});

// @desc   Remove a song from playlist
// @route  DELETE /api/playlist/:id/song/:songid
// @access Private
const deleteSongFromPlaylist = asyncHandler(async (req, res) => {
  const playlist = await Playlist.findById(req.params.id);

  if (playlist) {
    //User Verification
    if (playlist.user.toString() === req.user._id.toString()) {
      playlist.songs.id(req.params.songid).remove();

      await playlist.save();

      res.json("Song has been removed");
    } else {
      res.status(404);
      throw new Error("Incorrect User, Not Authorized");
    }
  } else {
    res.status(404);
    throw new Error("Playlist does not exist");
  }
});

export {
  getUserPlaylists,
  getUserPlaylistById,
  addUserPlaylistById,
  deleteUserPlaylistById,
  editUserPlaylistById,
  deleteSongFromPlaylist,
};

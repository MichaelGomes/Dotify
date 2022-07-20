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

export { getUserPlaylists, getUserPlaylistById, addUserPlaylistById };

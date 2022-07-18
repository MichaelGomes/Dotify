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

export { getUserPlaylists, getUserPlaylistById };

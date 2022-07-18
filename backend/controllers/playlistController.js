import asyncHandler from "express-async-handler";
import Playlist from "../models/playlistModel.js";

// @desc   Get user playlists
// @route  GET /api/playlist
// @access Private
const getUserPlaylists = asyncHandler(async (req, res) => {
  const playlists = await Playlist.find({ user: req.user });

  res.json(playlists);
});

export { getUserPlaylists };

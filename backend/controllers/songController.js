import asyncHandler from "express-async-handler";
import Song from "../models/songModel.js";

// @desc   Fetch all songs
// @route  GET /api/songs
// @access Public
const getSongs = asyncHandler(async (req, res) => {
  const songs = await Song.find({});

  res.json(songs);
});

export { getSongs };

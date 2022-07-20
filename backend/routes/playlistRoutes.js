import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  getUserPlaylists,
  getUserPlaylistById,
  addUserPlaylistById,
  deleteUserPlaylistById,
  editUserPlaylistById,
  deleteSongFromPlaylist,
  addSongToPlaylist,
} from "../controllers/playlistController.js";

//Route /api/playlist

router
  .route("/")
  .get(protect, getUserPlaylists)
  .post(protect, addUserPlaylistById);
router
  .route("/:id")
  .get(protect, getUserPlaylistById)
  .delete(protect, deleteUserPlaylistById)
  .put(protect, editUserPlaylistById);
router.route("/:id/song").post(protect, addSongToPlaylist);
router.route("/:id/song/:songid").delete(protect, deleteSongFromPlaylist);

export default router;

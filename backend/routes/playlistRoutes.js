import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  getUserPlaylists,
  getUserPlaylistById,
  addUserPlaylistById,
} from "../controllers/playlistController.js";

//Route /api/playlist

router
  .route("/")
  .get(protect, getUserPlaylists)
  .post(protect, addUserPlaylistById);
router.route("/:id").get(protect, getUserPlaylistById);

export default router;

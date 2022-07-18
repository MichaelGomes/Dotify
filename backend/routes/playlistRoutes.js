import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import { getUserPlaylists } from "../controllers/playlistController.js";

//Route /api/playlist

router.route("/").get(protect, getUserPlaylists);

export default router;

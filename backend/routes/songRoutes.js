import express from "express";
const router = express.Router();
import { getSongs, getSongById } from "../controllers/songController.js";

//Route /api/songs
router.route("/").get(getSongs);
router.route("/:id").get(getSongById);

export default router;

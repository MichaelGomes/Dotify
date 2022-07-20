import express from "express";
const router = express.Router();
import { getSongs } from "../controllers/songController.js";

//Route /api/songs
router.route("/").get(getSongs);

export default router;

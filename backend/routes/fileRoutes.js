import express from "express";
const router = express.Router();
import {
  getImageByName,
  getImages,
  getAudioByName,
} from "../controllers/fileController.js";

//Route /api/files

//Images
router.get("/image", getImages);
router.get("/image/:filename", getImageByName);

//Audio
router.get("/audio/:filename", getAudioByName);

export default router;

import express from "express";
const router = express.Router();
import { getImageByName, getImages } from "../controllers/fileController.js";

//Route /api/files

//Images
router.get("/image", getImages);
router.get("/image/:filename", getImageByName);

export default router;

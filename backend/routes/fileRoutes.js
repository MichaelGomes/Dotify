import express from "express";
const router = express.Router();
import { getImageByName } from "../controllers/fileController.js";

//Route /api/files

//Images
router.get("/image/:filename", getImageByName);

export default router;

import express from "express";
const router = express.Router();
import { authUser } from "../controllers/userController.js";

//Route /api/users
router.post("/login", authUser);

export default router;

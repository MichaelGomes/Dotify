import express from "express";
const router = express.Router();
import { authUser, registerUser } from "../controllers/userController.js";

//Route /api/users
router.post("/login", authUser);
router.post("/", registerUser);

export default router;

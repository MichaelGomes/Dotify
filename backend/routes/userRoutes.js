import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
} from "../controllers/userController.js";

//Route /api/users
router.post("/login", authUser);
router.post("/", registerUser);
router.route("/profile").get(protect, getUserProfile);

export default router;

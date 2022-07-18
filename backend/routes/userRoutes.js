import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  verifyUserEmailSend,
  verifyAccount,
  resetEmailSend,
  resetUserPassword,
} from "../controllers/userController.js";

//Route /api/users
router.post("/login", authUser);
router.post("/", registerUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.post("/verify", protect, verifyUserEmailSend);
router.get("/verify/:token", protect, verifyAccount);
router.post("/reset/", resetEmailSend);
router.post("/reset/:token", resetUserPassword);

export default router;

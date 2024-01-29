import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import cookieParser from "cookie-parser";
import { protectRouth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(cookieParser());

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);

export default router;

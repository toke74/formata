import express from "express";
import {
  registerUser,
  loginUser,
  refreshTokens,
  logout,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshTokens);
router.post("/logout", logout);

export default router;

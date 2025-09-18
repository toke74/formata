import express from "express";
import { importDocx } from "../controllers/editorController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// POST /api/v1/editor/import-docx
router.post("/import-docx", protect, upload.single("file"), importDocx);

export default router;

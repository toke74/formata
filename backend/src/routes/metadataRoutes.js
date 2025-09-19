import express from "express";
import { uploadCover } from "../controllers/metadataController.js";
// import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

import { requireAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(requireAuth);
router.post("/upload-cover", upload.single("file"), uploadCover);

export default router;

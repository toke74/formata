import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { singleUpload } from "../middlewares/upload.middleware.js";
import { uploadAsset } from "../controllers/asset.controller.js";

const router = express.Router();

router.post("/", requireAuth, singleUpload("file"), uploadAsset);

export default router;

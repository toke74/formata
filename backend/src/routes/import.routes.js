import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { singleUpload } from "../middlewares/upload.middleware.js";
import { importDocx } from "../controllers/import.controller.js";

const router = express.Router();

router.post("/:id/import", requireAuth, singleUpload("file"), importDocx);

export default router;

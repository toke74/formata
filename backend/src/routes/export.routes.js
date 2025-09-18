import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { startExport } from "../controllers/export.controller.js";

const router = express.Router();

router.post("/:id/export", requireAuth, startExport);

export default router;

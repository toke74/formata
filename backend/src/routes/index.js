import express from "express";
import authRoutes from "./auth.routes.js";
import projectRoutes from "./project.routes.js";
import importRoutes from "./import.routes.js";
import assetRoutes from "./asset.routes.js";
import exportRoutes from "./export.routes.js";
import metadataRoutes from "./metadataRoutes.js";
import editorRoutes from "./editorRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/projects", importRoutes); // /projects/:id/import
router.use("/assets", assetRoutes);
router.use("/projects", exportRoutes);
router.use("/metadata", metadataRoutes);
router.use("/editor", editorRoutes);

export default router;

import express from "express";
import {
  createProject,
  listProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(requireAuth);

router.post("/", createProject);
router.get("/", listProjects);
router.get("/:id", getProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;

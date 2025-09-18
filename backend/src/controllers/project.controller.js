import asyncHandler from "../middlewares/asyncHandler.js";
import Project from "../models/Project.model.js";
import { ErrorHandler } from "../utils/errors.js";

// @desc    Create project
// @route   POST /api/v1/projects
// @access  Private
export const createProject = asyncHandler(async (req, res, next) => {
  const { title } = req.body;
  const project = await Project.create({
    ownerId: req.user._id,
    title: title || "Untitled Book",
  });
  res
    .status(201)
    .json({ success: true, message: "Project created", data: { project } });
});

// @desc    Get user's projects
// @route   GET /api/v1/projects
// @access  Private
export const listProjects = asyncHandler(async (req, res, next) => {
  const projects = await Project.find({ ownerId: req.user._id }).select(
    "title metadata updatedAt"
  );
  res.status(200).json({ success: true, data: { projects } });
});

// @desc    Get single project
// @route   GET /api/v1/projects/:id
// @access  Private
export const getProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findOne({
    _id: req.params.id,
    ownerId: req.user._id,
  }).populate("assets");
  if (!project) return next(new ErrorHandler("Project not found", 404));
  res.status(200).json({ success: true, data: { project } });
});

// @desc    Update project meta or style
// @route   PUT /api/v1/projects/:id
// @access  Private
export const updateProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findOneAndUpdate(
    { _id: req.params.id, ownerId: req.user._id },
    { $set: req.body },
    { new: true }
  );
  if (!project) return next(new ErrorHandler("Project not found", 404));
  res
    .status(200)
    .json({ success: true, message: "Project updated", data: { project } });
});

// @desc    Delete project
// @route   DELETE /api/v1/projects/:id
// @access  Private
export const deleteProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findOneAndDelete({
    _id: req.params.id,
    ownerId: req.user._id,
  });
  if (!project) return next(new ErrorHandler("Project not found", 404));
  res.status(200).json({ success: true, message: "Project deleted" });
});

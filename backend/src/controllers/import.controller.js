import asyncHandler from "../middlewares/asyncHandler.js";
import Project from "../models/Project.model.js";
import { uploadFileToCloudinaryLocal } from "../services/cloudinary.service.js";
import { parseDocxToChapters } from "../services/docxParser.service.js";
import { ErrorHandler } from "../utils/errors.js";

// @desc    Import DOCX into project
// @route   POST /api/v1/projects/:id/import
// @access  Private
export const importDocx = asyncHandler(async (req, res, next) => {
  if (!req.file) return next(new ErrorHandler("No file uploaded", 400));
  const project = await Project.findOne({
    _id: req.params.id,
    ownerId: req.user._id,
  });
  if (!project) return next(new ErrorHandler("Project not found", 404));

  // upload to Cloudinary (raw)
  const uploadResult = await uploadFileToCloudinaryLocal(req.file.path, {
    resource_type: "raw",
    folder: "manuscripts",
  });

  // parse docx locally (mammoth)
  const chapters = await parseDocxToChapters(req.file.path);

  // attach parsed chapters to project (replace existing)
  project.chapters = chapters.map((c, idx) => ({ ...c, order: idx + 1 }));
  await project.save();

  res.status(201).json({
    success: true,
    message: "DOCX imported successfully",
    data: { chapters: project.chapters, cloudinary: uploadResult.secure_url },
  });
});

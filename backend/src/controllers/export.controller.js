import asyncHandler from "../middlewares/asyncHandler.js";
import { enqueueExport } from "../services/export.service.js";
import { ErrorHandler } from "../utils/errors.js";

// @desc    Start export job
// @route   POST /api/v1/projects/:id/export
// @access  Private
export const startExport = asyncHandler(async (req, res, next) => {
  const projectId = req.params.id;
  const format = req.body.format || "epub";
  const job = await enqueueExport({
    projectId,
    userId: req.user._id,
    format,
    settings: req.body.settings,
  });
  res
    .status(202)
    .json({
      success: true,
      message: "Export queued",
      data: { jobId: job._id },
    });
});

import asyncHandler from "../middlewares/asyncHandler.js";
import Asset from "../models/Asset.model.js";
import { uploadFileToCloudinaryLocal } from "../services/cloudinary.service.js";
import { ErrorHandler } from "../utils/errors.js";

// @desc    Upload asset (image)
// @route   POST /api/v1/assets
// @access  Private
export const uploadAsset = asyncHandler(async (req, res, next) => {
  if (!req.file) return next(new ErrorHandler("No file uploaded", 400));
  const result = await uploadFileToCloudinaryLocal(req.file.path, {
    resource_type: "image",
    folder: "assets",
  });

  const asset = await Asset.create({
    ownerId: req.user._id,
    filename: req.file.originalname,
    url: result.secure_url,
    resourceType: result.resource_type,
    width: result.width,
    height: result.height,
    mimeType: req.file.mimetype,
    size: req.file.size,
  });

  res.status(201).json({ success: true, message: "Uploaded", data: { asset } });
});

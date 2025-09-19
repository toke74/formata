import asyncHandler from "../middlewares/asyncHandler.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @desc    Upload book cover to Cloudinary
// @route   POST /api/v1/metadata/upload-cover
// @access  Private
export const uploadCover = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  const result = await cloudinary.v2.uploader.upload(req.file.path, {
    folder: "book_covers",
    use_filename: true,
    unique_filename: false,
  });

  res.json({ url: result.secure_url });
});

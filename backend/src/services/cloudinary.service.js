import cloudinary from "../config/cloudinary.js";
import fs from "fs/promises";

export async function uploadFileToCloudinaryLocal(path, options = {}) {
  const res = await cloudinary.uploader.upload(path, {
    resource_type: "auto",
    ...options,
  });
  // cleanup local file
  try {
    await fs.unlink(path);
  } catch (e) {
    // ignore
  }
  return res;
}

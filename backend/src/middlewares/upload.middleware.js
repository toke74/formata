import { upload } from "../config/multer.config.js";

export const singleUpload = (field = "file") => upload.single(field);
export const multipleUpload = (field = "files", maxCount = 5) =>
  upload.array(field, maxCount);

import mongoose from "mongoose";

const AssetSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  filename: String,
  url: String,
  resourceType: String,
  width: Number,
  height: Number,
  mimeType: String,
  size: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Asset", AssetSchema);

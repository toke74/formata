import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema({
  name: String,
  description: String,
  previewUrl: String,
  configuration: Object,
  visibility: { type: String, default: "public" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Template", TemplateSchema);

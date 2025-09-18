import mongoose from "mongoose";

const ExportJobSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  format: {
    type: String,
    enum: ["epub", "mobi", "pdf", "html"],
    default: "epub",
  },
  status: {
    type: String,
    enum: ["queued", "running", "done", "failed"],
    default: "queued",
  },
  resultUrl: String,
  settings: Object,
  error: String,
  createdAt: { type: Date, default: Date.now },
  finishedAt: Date,
});

export default mongoose.model("ExportJob", ExportJobSchema);

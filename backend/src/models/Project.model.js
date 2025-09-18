import mongoose from "mongoose";

const ChapterSchema = new mongoose.Schema({
  title: String,
  content: String, // stored as HTML or structured blocks
  order: Number,
  type: { type: String, default: "chapter" },
});

const ProjectSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, default: "Untitled Book" },
    metadata: {
      subtitle: String,
      authors: [String],
      language: { type: String, default: "English" },
      isbn: String,
      publisher: String,
    },
    chapters: [ChapterSchema],
    assets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Asset" }],
    styleConfig: { type: Object, default: {} },
    visibility: {
      type: String,
      enum: ["private", "public"],
      default: "private",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);

import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tokenHash: String,
  expiresAt: Date,
  revoked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  replacedByToken: String,
});

export default mongoose.model("RefreshToken", schema);

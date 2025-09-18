import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const RefreshTokenSchema = new Schema({
  token: String,
  expiresAt: Date,
  createdAt: { type: Date, default: Date.now },
  revoked: { type: Boolean, default: false },
  replacedByToken: { type: String },
});

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    provider: { type: String, default: "Local" },
    roles: { type: [String], default: ["user"] },
    refreshTokens: [RefreshTokenSchema],
  },
  { timestamps: true }
);

// hash on save if password changed
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", UserSchema);

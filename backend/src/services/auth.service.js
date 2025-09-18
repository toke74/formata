import User from "../models/User.model.js";
import {
  generateTokenPair,
  revokeRefreshToken,
  rotateRefreshToken,
} from "./token.service.js";
import { ErrorHandler } from "../utils/errors.js";

export async function registerUser({ name, email, password }) {
  const exists = await User.findOne({ email });
  if (exists) throw new ErrorHandler("User already exists", 400);
  const user = await User.create({ name, email, password, provider: "Local" });
  // no activation for MVP
  return user;
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new ErrorHandler("Invalid credentials", 401);
  const ok = await user.comparePassword(password);
  if (!ok) throw new ErrorHandler("Invalid credentials", 401);

  const tokens = await generateTokenPair(user);
  return { user, tokens };
}

export async function refreshTokens(oldRefreshToken) {
  return rotateRefreshToken(oldRefreshToken);
}

export async function logout(token) {
  if (!token) return;
  await revokeRefreshToken(token);
}

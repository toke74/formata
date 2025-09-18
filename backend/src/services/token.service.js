import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User.model.js";
import { ErrorHandler } from "../utils/errors.js";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_EXPIRES,
} from "../config/jwt.config.js";

function signAccessToken(user) {
  const payload = { sub: user._id.toString(), roles: user.roles || [] };
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES,
  });
}

function signRefreshToken(user) {
  // for refresh tokens we use a uuid stored hashed in DB for revocation/rotation
  const token = uuidv4();
  // We'll store raw token string on DB in user.refreshTokens for simplicity (production: hash)
  const expiresAt = new Date(Date.now() + msToMs(REFRESH_TOKEN_EXPIRES));
  return { token, expiresAt };
}

function msToMs(expr) {
  // accept '30d', '15m' or ms numeric
  if (typeof expr === "number") return expr;
  const m = expr.match(/^(\d+)([smhd])$/);
  if (!m) return 0;
  const v = Number(m[1]);
  switch (m[2]) {
    case "s":
      return v * 1000;
    case "m":
      return v * 60 * 1000;
    case "h":
      return v * 60 * 60 * 1000;
    case "d":
      return v * 24 * 60 * 60 * 1000;
    default:
      return 0;
  }
}

export async function generateTokenPair(user) {
  const accessToken = signAccessToken(user);
  const refresh = signRefreshToken(user);
  // store refresh token object in user
  user.refreshTokens = user.refreshTokens || [];
  user.refreshTokens.push({
    token: refresh.token,
    expiresAt: refresh.expiresAt,
  });
  await user.save();
  return {
    accessToken,
    refreshToken: refresh.token,
    refreshExpiresAt: refresh.expiresAt,
  };
}

export async function rotateRefreshToken(oldToken) {
  // find user by token
  const user = await User.findOne({ "refreshTokens.token": oldToken });
  if (!user) throw new ErrorHandler("Invalid refresh token", 401);

  const stored = user.refreshTokens.find((rt) => rt.token === oldToken);
  if (!stored || stored.revoked || new Date() > stored.expiresAt) {
    // token reuse detection: revoke all
    user.refreshTokens.forEach((rt) => (rt.revoked = true));
    await user.save();
    throw new ErrorHandler("Refresh token expired or revoked", 401);
  }

  // rotate
  stored.revoked = true;
  const newPair = signRefreshToken(user);
  user.refreshTokens.push({
    token: newPair.token,
    expiresAt: newPair.expiresAt,
  });
  await user.save();

  const accessToken = jwt.sign(
    { sub: user._id.toString(), roles: user.roles },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES,
    }
  );

  return {
    accessToken,
    refreshToken: newPair.token,
    refreshExpiresAt: newPair.expiresAt,
    user,
  };
}

export async function revokeRefreshToken(token) {
  const user = await User.findOne({ "refreshTokens.token": token });
  if (!user) return;
  user.refreshTokens = user.refreshTokens.map((rt) =>
    rt.token === token ? { ...rt, revoked: true } : rt
  );
  await user.save();
}

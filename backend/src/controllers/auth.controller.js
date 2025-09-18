import asyncHandler from "../middlewares/asyncHandler.js";
import * as authService from "../services/auth.service.js";
import { ErrorHandler } from "../utils/errors.js";
import { COOKIE_OPTIONS } from "../utils/constants.js";

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler("Missing required fields", 400));
  }

  const user = await authService.registerUser({ name, email, password });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: { id: user._id, email: user.email, name: user.name },
  });
});

// @desc    Login user & set tokens
// @route   POST /api/v1/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const { user, tokens } = await authService.loginUser({ email, password });

  // set cookies
  res.cookie("access_token", tokens.accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: 1000 * 60 * 15, // 15m or decode from env
    path: "/",
  });

  res.cookie("refresh_token", tokens.refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30d
    path: "/api/v1/auth/refresh",
  });

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: { user: { id: user._id, email: user.email, name: user.name } },
  });
});

// @desc    Refresh tokens using refresh cookie
// @route   POST /api/v1/auth/refresh
// @access  Public (uses cookie)
export const refreshTokens = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies?.refresh_token;
  if (!refreshToken) return next(new ErrorHandler("No refresh token", 401));
  const {
    accessToken,
    refreshToken: newRefresh,
    refreshExpiresAt,
    user,
  } = await authService.refreshTokens(refreshToken);

  res.cookie("access_token", accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: 1000 * 60 * 15,
    path: "/",
  });
  res.cookie("refresh_token", newRefresh, {
    ...COOKIE_OPTIONS,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    path: "/api/v1/auth/refresh",
  });

  res.status(200).json({
    success: true,
    message: "Token refreshed",
    data: { user: { id: user._id, email: user.email, name: user.name } },
  });
});

// @desc    Logout user
// @route   POST /api/v1/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies?.refresh_token;
  if (refreshToken) {
    await authService.logout(refreshToken);
  }

  res.clearCookie("access_token", { path: "/" });
  res.clearCookie("refresh_token", { path: "/api/v1/auth/refresh" });

  res.status(200).json({ success: true, message: "Logged out" });
});

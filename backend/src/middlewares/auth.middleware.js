import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { ACCESS_TOKEN_SECRET } from "../config/jwt.config.js";
import { ErrorHandler } from "../utils/errors.js";

export const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.access_token;
    if (!token) return next(new ErrorHandler("Unauthorized", 401));
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const user = await User.findById(payload.sub).select("-password");
    if (!user) return next(new ErrorHandler("User not found", 401));
    req.user = user;
    next();
  } catch (err) {
    return next(new ErrorHandler("Unauthorized", 401));
  }
};

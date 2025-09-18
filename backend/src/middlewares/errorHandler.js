import { ErrorHandler } from "../utils/errors.js";

export default (err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details || undefined,
    });
  }

  console.error(err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

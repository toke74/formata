import mongoose from "mongoose";
import logger from "./logger.js";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI not set in env");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      // options recommended by mongoose 7 default
    });
    logger.info("MongoDB connected");
  } catch (err) {
    logger.error("MongoDB connection error", err);
    throw err;
  }
};

export default connectDB;

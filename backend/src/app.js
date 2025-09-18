import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";

import apiRoutes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import logger from "./config/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// serve static for health or public
app.use("/public", express.static(path.join(__dirname, "public")));

// mount API routes
app.use("/api/v1", apiRoutes);

// health
app.get("/health", (req, res) => res.json({ status: "ok" }));

// error handler (last)
app.use(errorHandler);

export default app;

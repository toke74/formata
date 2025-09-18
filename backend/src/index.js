import "dotenv/config";
import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";
import logger from "./config/logger.js";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();
    const server = http.createServer(app);

    server.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
      console.log(`Server listening on port ${PORT}`);
    });

    // Optionally start worker from here if you prefer single process dev
    // import('./jobs/worker.js').then(m => m.default());
  } catch (err) {
    logger.error("Startup error", err);
    process.exit(1);
  }
}

start();

/**
 * Minimal worker that polls ExportJob collection for 'queued' jobs and processes them.
 * In production, replace with queue (Bull/BullMQ) and distributed workers.
 */
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import ExportJob from "../models/ExportJob.model.js";
import Project from "../models/Project.model.js";

async function processJob(job) {
  try {
    job.status = "running";
    await job.save();

    // fetch project content
    const project = await Project.findById(job.projectId);
    if (!project) {
      job.status = "failed";
      job.error = "Project not found";
      await job.save();
      return;
    }

    // TODO: Convert project to EPUB/PDF using proper toolchain (Pandoc/Calibre/puppeteer for PDF)
    // For now we simulate a successful export by writing a small JSON to Cloudinary or storing placeholder URL
    job.status = "done";
    job.resultUrl = `export-placeholder://job/${job._id}`;
    job.finishedAt = new Date();
    await job.save();
    console.log("Job processed", job._id);
  } catch (err) {
    console.error("Job error", err);
    job.status = "failed";
    job.error = err.message;
    job.finishedAt = new Date();
    await job.save();
  }
}

async function pollLoop() {
  await connectDB();
  console.log("Worker started, polling for export jobs...");
  while (true) {
    const job = await ExportJob.findOneAndUpdate(
      { status: "queued" },
      { $set: { status: "running" } },
      { new: true }
    );
    if (job) {
      // move to processing
      try {
        await processJob(job);
      } catch (err) {
        console.error("processJob error", err);
      }
    } else {
      // sleep
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  pollLoop().catch((e) => {
    console.error("Worker fatal", e);
    process.exit(1);
  });
}

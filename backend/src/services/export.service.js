// NOTE: real implementation should orchestrate conversion to EPUB/PDF using pandoc/ebook-convert
import ExportJob from "../models/ExportJob.model.js";

export async function enqueueExport({ projectId, userId, format, settings }) {
  const job = await ExportJob.create({
    projectId,
    userId,
    format,
    status: "queued",
    settings,
  });
  // TODO: push to queue system (Bull/BullMQ) or process in worker
  return job;
}

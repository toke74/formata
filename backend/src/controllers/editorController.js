import asyncHandler from "../middlewares/asyncHandler.js";
import mammoth from "mammoth";
import { v4 as uuidv4 } from "uuid";

// @desc    Import DOCX and split into chapters with formatting
// @route   POST /api/v1/editor/import-docx
// @access  Private
export const importDocx = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  try {
    // Extract HTML instead of plain text
    const result = await mammoth.convertToHtml({ path: req.file.path });
    const html = result.value;

    // Split by headings <h1>, <h2>, or "CHAPTER"
    const chapters = splitHtmlIntoChapters(html);

    res.json({ chapters });
  } catch (err) {
    res.status(500);
    throw new Error("Failed to process DOCX file");
  }
});

const splitHtmlIntoChapters = (html) => {
  const parts = html.split(/<h1[^>]*>|<h2[^>]*>|CHAPTER\s+\d+/i);
  let chapters = [];

  parts.forEach((part, i) => {
    if (part.trim()) {
      chapters.push({
        id: uuidv4(),
        title: `Chapter ${i + 1}`,
        content: `<div>${part.trim()}</div>`,
      });
    }
  });

  return chapters;
};

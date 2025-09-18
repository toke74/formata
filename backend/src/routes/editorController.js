import asyncHandler from "express-async-handler";
import mammoth from "mammoth";
import { v4 as uuidv4 } from "uuid";

// @desc    Import DOCX and split into chapters
// @route   POST /api/v1/editor/import-docx
// @access  Private
export const importDocx = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  try {
    // Extract raw text from docx
    const result = await mammoth.extractRawText({ path: req.file.path });
    const text = result.value;

    // Split chapters - here we use "Heading" markers like "Chapter" or line breaks
    const chapters = splitIntoChapters(text);

    res.json({ chapters });
  } catch (err) {
    res.status(500);
    throw new Error("Failed to process DOCX file");
  }
});

// Utility function to split into chapters
const splitIntoChapters = (text) => {
  const lines = text.split("\n");
  let chapters = [];
  let current = { id: uuidv4(), title: "", content: "" };

  lines.forEach((line) => {
    if (/^chapter\s+\d+/i.test(line) || /^CHAPTER/i.test(line)) {
      // Start new chapter
      if (current.content.trim()) {
        chapters.push(current);
      }
      current = {
        id: uuidv4(),
        title: line.trim(),
        content: "",
      };
    } else {
      current.content += line + "\n";
    }
  });

  if (current.content.trim()) {
    chapters.push(current);
  }

  return chapters;
};

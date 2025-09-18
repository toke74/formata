import fs from "fs/promises";
import mammoth from "mammoth";

/**
 * Basic docx parser using mammoth to HTML
 * Returns array of chapters: { title, content, order }
 *
 * This function uses a naive algorithm:
 * - convert docx -> raw text paragraphs
 * - treat paragraphs with all caps / shorter than X words as chapter headings
 * - or paragraphs that match "CHAPTER" etc.
 *
 * For production, extend to preserve runs (bold/italics), lists, images, footnotes.
 */
export async function parseDocxToChapters(filePath) {
  const result = await mammoth.convertToHtml(
    { path: filePath },
    { includeDefaultStyleMap: true }
  );
  const html = result.value; // HTML string

  // naive split: split by <h1> or look for "CHAPTER" or big heading tags
  // mammoth may map headings to <h1>, <h2> — attempt to split using those
  const chapterRegex = /<h1[^>]*>(.*?)<\/h1>/gi;
  const matches = [...html.matchAll(chapterRegex)];
  const chapters = [];
  if (matches.length > 0) {
    // split based on <h1> occurrences
    let lastIndex = 0;
    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      const start = match.index;
      if (i > 0) {
        const prevMatch = matches[i - 1];
        const chunk = html.substring(prevMatch.index, start);
        // extract title from prevMatch
        const title = prevMatch[1].trim();
        chapters.push({
          title,
          content: chunk.trim(),
          order: chapters.length + 1,
        });
      }
      if (i === matches.length - 1) {
        const lastChunk = html.substring(match.index);
        const title = match[1].trim();
        chapters.push({
          title,
          content: lastChunk.trim(),
          order: chapters.length + 1,
        });
      }
    }
  } else {
    // fallback: split by double <p> or by page breaks
    const paras = html
      .split(/<\/p>\s*<p>/i)
      .map((p) => p.replace(/^<p>|<\/p>$/gi, "").trim());
    // group paragraphs into chunks of N paragraphs as chapters (naive)
    const groupSize = 10;
    for (let i = 0; i < paras.length; i += groupSize) {
      const chunk = paras.slice(i, i + groupSize).join("</p><p>");
      chapters.push({
        title: `Chapter ${Math.floor(i / groupSize) + 1}`,
        content: `<p>${chunk}</p>`,
        order: chapters.length + 1,
      });
    }
  }

  return chapters;
}

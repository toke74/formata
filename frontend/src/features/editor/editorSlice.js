import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import EditorService from "./EditorService";

export const importDocx = createAsyncThunk(
  "editor/importDocx",
  async (file) => {
    const data = await EditorService.importDocx(file);
    return data; // { chapters: [...] }
  }
);

const editorSlice = createSlice({
  name: "editor",
  initialState: {
    chapters: [],
    currentChapterId: null,
    previewHtml: "",
    loading: false,
    error: null,
  },
  reducers: {
    addChapter: (state, action) => {
      state.chapters.push(action.payload);
    },
    updateChapter: (state, action) => {
      const { id, content } = action.payload;
      const chapter = state.chapters.find((c) => c.id === id);
      if (chapter) chapter.content = content;
    },
    deleteChapter: (state, action) => {
      state.chapters = state.chapters.filter((c) => c.id !== action.payload);
    },
    setCurrentChapter: (state, action) => {
      state.currentChapterId = action.payload;
    },
    setPreviewHtml: (state, action) => {
      state.previewHtml = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(importDocx.pending, (state) => {
        state.loading = true;
      })
      .addCase(importDocx.fulfilled, (state, action) => {
        state.loading = false;
        state.chapters = action.payload.chapters;
        state.currentChapterId = action.payload.chapters[0]?.id || null;
      })
      .addCase(importDocx.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  addChapter,
  updateChapter,
  deleteChapter,
  setCurrentChapter,
  setPreviewHtml,
} = editorSlice.actions;

export default editorSlice.reducer;

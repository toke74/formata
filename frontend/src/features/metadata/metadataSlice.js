import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MetadataService from "./MetadataService";

export const uploadCover = createAsyncThunk(
  "metadata/uploadCover",
  async (file) => {
    return await MetadataService.uploadCover(file);
  }
);

const metadataSlice = createSlice({
  name: "metadata",
  initialState: {
    title: "",
    author: "",
    language: "English",
    isbn: "",
    publisher: "",
    coverUrl: "",
    loading: false,
    error: null,
  },
  reducers: {
    setMetadata: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadCover.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadCover.fulfilled, (state, action) => {
        state.loading = false;
        state.coverUrl = action.payload.url;
      })
      .addCase(uploadCover.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setMetadata } = metadataSlice.actions;
export default metadataSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
// import projectReducer from "../features/projects/projectSlice";
import editorReducer from "../features/editor/editorSlice";
// import assetReducer from "../features/assets/assetSlice";
// import templateReducer from "../features/templates/templateSlice";
import metadataSlice from "../features/metadata/metadataSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    editor: editorReducer,
    metadata: metadataSlice,
    // projects: projectReducer,
    // assets: assetReducer,
    // templates: templateReducer,
  },
  devTools: true,
});

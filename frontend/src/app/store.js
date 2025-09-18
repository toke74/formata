import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
// import projectReducer from "../features/projects/projectSlice";
// import editorReducer from "../features/editor/editorSlice";
// import assetReducer from "../features/assets/assetSlice";
// import templateReducer from "../features/templates/templateSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // projects: projectReducer,
    // editor: editorReducer,
    // assets: assetReducer,
    // templates: templateReducer,
  },
  devTools: true,
});

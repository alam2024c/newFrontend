import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import progressSlice from "./slices/progressSlice";
import productSlice from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    // dark: darkModeSlice,
    auth: authSlice,
    store: productSlice,
    progress: progressSlice,
  },
});

// progressSlice.js
import { createSlice } from "@reduxjs/toolkit";

const progressSlice = createSlice({
  name: "progress",
  initialState: {
    uploads: [],
  },
  reducers: {
    addUpload: (state, action) => {
      state.uploads.push({
        fileId: action.payload.fileId,
        isLoading: true,
        percentage: 0,
      });
    },
    setPercentage: (state, action) => {
      const { fileId, progress } = action.payload;
      const upload = state.uploads.find((u) => u.fileId === fileId);

      if (upload) {
        upload.percentage = progress;
      }
    },
    finishUpload: (state, action) => {
      const { fileId } = action.payload;
      const uploadIndex = state.uploads.findIndex((u) => u.fileId === fileId);
      if (uploadIndex !== -1) {
        state.uploads.splice(uploadIndex, 1);
      }
    },
  },
});

export const { addUpload, setPercentage, finishUpload } = progressSlice.actions;

export default progressSlice.reducer;

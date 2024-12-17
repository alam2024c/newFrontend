import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL = import.meta.env.VITE_REACT_APP_API_KEY;

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    msg: false,
    signIn: false,
    refrech: 0,
    updateNews: {},
    deleteNew: {},
    updateComment: {},
    deleteComment_id: {},
    deletePost_id: {},
    deleteServicese_id: {},
    updateServicese: {},
    // refrechPostsProductServce,

    // currentUser: null,
  },
  reducers: {
    refrechPostsProductNews: (state, action) => {
      state.updateNews = action.payload;
      console.log(action.payload);
    },
    deletePosts: (state, action) => {
      state.refrech += 1;
      console.log(action.payload);
      state.deletePost_id = action.payload;
    },
    refrechcomment: (state, action) => {
      state.updateComment = action.payload;
    },
    deletecomment: (state, action) => {
      state.deleteComment_id = action.payload;
    },
    refrechServicese: (state, action) => {
      state.updateServicese = action.payload;
    },
    deleteServicese: (state, action) => {
      state.deleteServicese_id = action.payload;
    },
    // refrechPostsProductServce,
  },
});

export const {
  refrechPostsProductNews,
  deletePosts,
  refrechcomment,
  deletecomment,
  refrechServicese,
  deleteServicese,
} = productSlice.actions;
export default productSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
const URL = import.meta.env.VITE_REACT_APP_API_KEY;

//  "http://api.wearher-from-mimi.com/api";
//  "https://wearher-from-mimi.com/api";

export const signUpUser = createAsyncThunk(
  "signUpUser",
  async ({ user, setLoading }, thunkAPI) => {
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(`${URL}/api/register`, user, config);
      //  navigate("/login");
      setLoading(false);
      return res.data;
    } catch (error) {
      // return custom error message from backend if present
      setLoading(false);
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ user, setLoading }, thunkAPI) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(`${URL}/api/login`, user, config);
      // navigator("/home");
      setLoading(false);
      return res.data;
    } catch (error) {
      setLoading(false);
      if (error.response.status == 401) {
        // navigate("/register");
      }
      // return custom error message from backend if present
      setLoading(false);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "logoutUser",
  async (user, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(`${URL}/api/logout`, user, config);
      // navigator("/home");

      localStorage.removeItem("access_token");
    } catch (error) {
      // return custom error message from backend if present
    }
  }
);
const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    msg: false,
    signIn: false,
    refrech: 0,
    email: localStorage.getItem("email-helnet")
      ? localStorage.getItem("email-helnet")
      : "",
    tokenTset: localStorage.getItem("token-helnet")
      ? localStorage.getItem("token-helnet")
      : "",
    current__page: localStorage.getItem("current__page")
      ? localStorage.getItem("current__page")
      : "home",
    update: {},
    updateOffer: {},
    updateContact: {},
    updateJobAdvertisement: {},
    updateJob: {},
    updateMyCourse: {},
    updateComment: {},
    deleteComment_id: {},
    deleteNoti_id: {},
    videoCourse_id: {},
    updateSubComment: {},
    deleteCourse_id: {},
    deleteSubComment_id: {},

    deletePost_id: {},
    deleteMessage_id: {},
    deleteNoti_: {},
    deleteConversation_id: {},
    themeColor: localStorage.getItem("color-helnet")
      ? localStorage.getItem("color-helnet")
      : "purple",
    user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
    token: Cookies.get("access_token") || null,
    loading: false,
    error: false,
    CurrentStudy: JSON.parse(localStorage.getItem("CurrentStudy"))
      ? JSON.parse(localStorage.getItem("CurrentStudy"))
      : "",
    // currentUser: null,
  },
  reducers: {
    loginGoogle: (state, actions) => {
      Cookies.set("user", JSON.stringify(actions.payload), {
        expires: 2,
      });

      // localStorage.setItem("user", JSON.stringify(actions.payload));
      state.user = actions.payload;
    },
    loginStart: (state, actios) => {
      state.token = actios.payload.access_token;
      // localStorage.setItem("access_token", actios.payload.access_token);
      state.user = actios.payload.user;
      Cookies.set("access_token", actios.payload.access_token, { expires: 2 });
      Cookies.set("user", JSON.stringify(actios.payload.user), { expires: 2 });
      // localStorage.setItem("user", JSON.stringify(actios.payload.user));
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      Cookies.set("user", JSON.stringify(action.payload), { expires: 2 });
      // localStorage.setItem("user", JSON.stringify(action.payload));
    },
    loginTokenSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload;
      Cookies.set("access_token", action.payload, { expires: 2 });
      // localStorage.setItem("access_token", action.payload);
    },
    loginFailure: (state, actions) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state, actions) => {
      localStorage.removeItem("user");
      localStorage.removeItem("CurrentStudy");
      localStorage.removeItem("access_token");
      Cookies.remove("access_token");
      Cookies.remove("user");
      state.user = "";
      state.token = "";
      state.CurrentStudy = "";
      state.update = {};
      state.updateComment = {};
      state.updateSubComment = {};
      state.deleteComment_id = {};
      state.deleteSubComment_id = {};
      state.deletePost_id = {};
    },
    CurrentStudy: (state, action) => {
      state.CurrentStudy = action.payload;
    },
    stateCurrent: (state, action) => {
      state.current__page = action.payload;
    },
    deleteSign: (state, action) => {
      state.signIn = false;
    },
    refrechPosts: (state, action) => {
      // state.refrech += 1;
      state.update = action.payload;
    },
    refrechPostsOffer: (state, action) => {
      // state.refrech += 1;
      state.updateOffer = action.payload;
    },
    refrechPostsContact: (state, action) => {
      // state.refrech += 1;
      state.updateContact = action.payload;
    },
    refrechPostsJobAdvertisement: (state, action) => {
      // state.refrech += 1;
      state.updateJobAdvertisement = action.payload;
    },
    refrechPostsJob: (state, action) => {
      // state.refrech += 1;
      state.updateJob = action.payload;
    },
    refrechPostsMyCourse: (state, action) => {
      // state.refrech += 1;
      state.updateMyCourse = action.payload;
    },
    deletePosts: (state, action) => {
      state.refrech += 1;
      state.deletePost_id = action.payload;
    },
    deleteCourse: (state, action) => {
      state.refrech += 1;
      state.deleteCourse_id = action.payload;
    },
    deleteMessage: (state, action) => {
      state.deleteMessage_id = action.payload;
    },
    deleteNoti: (state, action) => {
      state.deleteNoti_id = action.payload;
    },
    deleteVideoCourse: (state, action) => {
      state.videoCourse_id = action.payload;
    },
    deleteConversation: (state, action) => {
      state.deleteConversation_id = action.payload;
    },
    refrechcomment: (state, action) => {
      state.updateComment = action.payload;
    },
    deletecomment: (state, action) => {
      state.deleteComment_id = action.payload;
    },
    refrechSubcomment: (state, action) => {
      state.updateSubComment = action.payload;
    },
    deleteSubcomment: (state, action) => {
      state.deleteSubComment_id = action.payload;
    },
    colorDispacth: (state, action) => {
      state.themeColor = action.payload;
    },
    emailCheck: (state, action) => {
      state.email = action.payload;
      state.tokenTset = action.payload;
    },
    tokenCheck: (state, action) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          state.msg = false;

          // localStorage.setItem("user", JSON.stringify(payload.data));
          // state.user = payload.data;
          state.signIn = true;
        } else {
          state.msg = true;
        }

        state.success = true; // registration successful
      })
      .addCase(signUpUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        if (payload) {
          state.msg = false;
          Cookies.set("access_token", payload.access_token, { expires: 2 });
          Cookies.set("user", JSON.stringify(payload.user), { expires: 2 });
          // localStorage.setItem("user", JSON.stringify(payload.user));
          state.token = payload.access_token;
          // localStorage.setItem("access_token", payload.access_token);
          state.user = payload.user;
        } else {
          state.msg = true;
        }

        state.success = true; // registration successful
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    // ... (add other extraReducers as needed)
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  loginGoogle,
  deleteSign,
  CurrentStudy,
  tokenCheck,
  refrechPosts,
  deletePosts,
  refrechcomment,
  deletecomment,
  deleteSubcomment,
  refrechSubcomment,
  colorDispacth,
  emailCheck,
  stateCurrent,
  refrechPostsOffer,
  refrechPostsContact,
  refrechPostsJobAdvertisement,
  refrechPostsJob,
  loginTokenSuccess,
  deleteMessage,
  deleteConversation,
  deleteNoti,
  refrechPostsMyCourse,
  deleteCourse,
  deleteVideoCourse,
} = authSlice.actions;
export default authSlice.reducer;

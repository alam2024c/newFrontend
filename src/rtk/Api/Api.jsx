import axios from "axios";
import { useSelector } from "react-redux";
import {
  deleteCourse,
  deleteMessage,
  deleteNoti,
  deletePosts,
  deleteSubcomment,
  deleteVideoCourse,
  deletecomment,
  loginSuccess,
  loginTokenSuccess,
  logout,
  refrechPosts,
  refrechcomment,
} from "../slices/authSlice";
import { toast } from "react-toastify";
import { deleteServicese } from "../slices/productSlice";
const URL = import.meta.env.VITE_REACT_APP_API_KEY;

export const getUser = async (token, dispatch) => {
  try {
    const res = await axios.get(`${URL}/api/get-user`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    if (
      res?.data?.status == "token is invalid" ||
      res?.data?.status == "token is Expired"
    ) {
      dispatch(logout());
    } else if (res?.data?.data?.id) {
      dispatch(loginSuccess(res.data.data));
      dispatch(loginTokenSuccess(res?.data?.token?.replace(/"/g, "")));
    }
  } catch (err) {
    if (err?.response?.data?.status == 401) {
      dispatch(logout());
    }
  }
};

export const deletPost = async (token, post_id, dispatch, post) => {
  const data = {
    post_id,
  };
  try {
    const res = await axios.post(
      `${URL}/api/post/delete_post`,
      { post_id },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("تم حذف المنشور");
    if (post?.price) {
      dispatch(deleteServicese({ post_id }));
    } else {
      dispatch(deletePosts({ post_id }));
    }
  } catch (err) {}
};
export const deletMessage = async (token, post_id, dispatch, post) => {
  const data = {
    post_id,
  };
  try {
    const res = await axios.post(
      `${URL}/api/chatify/deleteMessage`,
      { id: post_id },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // toast.success("تم حذف المنشور");

    dispatch(deleteMessage({ post_id }));
  } catch (err) {}
};
export const videoCourse = async (token, post_id, dispatch, post) => {
  try {
    const res = await axios.delete(
      `${URL}/api/courses/${post_id}`,

      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // toast.success("تم حذف المنشور");

    dispatch(deleteVideoCourse({ post_id }));
  } catch (err) {}
};
export const deletNotification = async (token, post_id, dispatch, post) => {
  const data = {
    post_id,
  };
  try {
    const res = await axios.post(
      `${URL}/api/chatify/notification-delete`,
      { id: post_id },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // toast.success("تم حذف المنشور");

    dispatch(deleteNoti({ post_id }));
  } catch (err) {}
};
export const deletPostJob = async (token, post_id, dispatch, post) => {
  const data = {
    post_id,
  };
  try {
    const res = await axios.get(`${URL}/api/content-delete/${post_id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("تم حذف المنشور");
    if (post?.price) {
      dispatch(deleteServicese({ post_id }));
    } else {
      dispatch(deletePosts({ post_id }));
    }
  } catch (err) {}
};
export const deletPostJobAdvertisement = async (
  token,
  post_id,
  dispatch,
  post
) => {
  const data = {
    post_id,
  };
  try {
    const res = await axios.get(`${URL}/api/job-delete/${post_id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("تم حذف المنشور");
    if (post?.price) {
      dispatch(deleteServicese({ post_id }));
    } else {
      dispatch(deletePosts({ post_id }));
    }
  } catch (err) {}
};

export const deletPostOffer = async (token, post_id, dispatch, post) => {
  const data = {
    post_id,
  };
  try {
    const res = await axios.get(`${URL}/api/offer-delete/${post_id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("تم حذف المنشور");
    if (post?.price) {
      dispatch(deleteServicese({ post_id }));
    } else {
      dispatch(deletePosts({ post_id }));
    }
  } catch (err) {}
};
export const deletPostApply = async (token, post_id, dispatch, post) => {
  const data = {
    post_id,
  };
  try {
    const res = await axios.get(`${URL}/api/apply-delete/${post_id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("تم حذف المنشور");
    if (post?.price) {
      dispatch(deleteServicese({ post_id }));
    } else {
      dispatch(deletePosts({ post_id }));
    }
  } catch (err) {}
};
export const deletPostCv = async (token, post_id, dispatch, post) => {
  const data = {
    post_id,
  };
  try {
    const res = await axios.get(`${URL}/api/cv-delete`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("تم حذف المنشور");
    if (post?.price) {
      dispatch(deleteServicese({ post_id }));
    } else {
      dispatch(deletePosts({ post_id }));
    }
  } catch (err) {}
};
export const deletcourse = async (token, id, dispatch, post) => {
  try {
    const res = await axios.delete(`${URL}/api/playlist/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("تم حذف المنشور");
    dispatch(deleteCourse({ id }));
  } catch (err) {}
};

export const deleteComment = async (token, post_id, dispatch, subComment) => {
  try {
    const res = await axios.post(
      `${URL}/api/post/delete_comment`,
      { post_comment_id: post_id },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("تم حذف المنشور");
    if (subComment) {
      dispatch(deleteSubcomment({ post_id }));
    } else {
      dispatch(deletecomment({ post_id }));
    }
  } catch (err) {}
};

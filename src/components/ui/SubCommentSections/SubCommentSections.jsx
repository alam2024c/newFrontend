import React, { useEffect, useState } from "react";
import SingleSubComment from "../singleSubComment/singleSubComment";
import axios from "axios";
import { useSelector } from "react-redux";

function SubCommentSections({ data, showAllReplay }) {
  const [subComments, setSubComments] = useState([]);
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const { token, updateSubComment, deleteSubComment_id } = useSelector(
    (state) => state.auth
  );

  const getAllSubComments = async () => {
    try {
      const results = await axios.post(
        `${URL}/api/post/show_sub_comment`,
        { post_id: data.post_id, parent_comment_id: data.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (results.status === 429) {
        console.log("Too Many Requests. Retrying after some time...");
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        getAllSubComments();
        return;
      }
      console.log(results ,"data");
      results.data.data && setSubComments(results.data.data);
    } catch (error) {
      console.log("get the comments error :" + error);
    }
  };

  const updatePost = (postId, updatedData) => {
    setSubComments((prevItems) =>
      prevItems.map((post) =>
        post.id === postId ? { ...post, ...updatedData } : post
      )
    );
  };

  const addOrUpdatePost = (update) => {
    const commentId = subComments.findIndex(
      (post) => post.parent === update.parent
    );

    if (commentId !== -1) {
      const existingPostIndex = subComments.findIndex(
        (post) => post.id === update.id
      );

      if (existingPostIndex !== -1) {
        // Post found, update it
        updatePost(update.id, update);
      } else {
        // Post not found, add it to the beginning of the array with initial likes count as zero
        setSubComments((prevItems) => [
          { ...update, likes: 0 }, // Initialize likes to zero for a new comment
          ...prevItems,
        ]);
      }
    }
  };

  useEffect(() => {
    addOrUpdatePost(updateSubComment);
  }, [updateSubComment]);

  useEffect(() => {
    getAllSubComments();
  }, [updateSubComment]);

  useEffect(() => {
    const deleteComment_idHandle = (deleteSubComment_id) => {
      setSubComments((prevItems) =>
        prevItems.filter((post) => post.id !== deleteSubComment_id.post_id)
      );
    };

    deleteComment_idHandle(deleteSubComment_id);
  }, [deleteSubComment_id]);

  return (
    <>
      {subComments[0]?.id &&
        subComments.map((e) => <SingleSubComment key={e.id} subComments={e} />)}
    </>
  );
}

export default SubCommentSections;

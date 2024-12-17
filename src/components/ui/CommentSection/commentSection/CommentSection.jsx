/* eslint-disable react/prop-types */

// import { CreateComment, Modal } from "../../ui";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import SinglePost from "../../../singlePost/SinglePost";
import SingleComment from "../../singleComment/SingleComment";
import CreateComment from "../../createComment/CreateComment";
import Modal from "../../modal/Modal";
import { t } from "i18next";

export default function CommentSection({
  post,
  reels,
  isCommentModelOpen,
  closeCommentModal,
  comments,
  setComments,
  setCommentsNumber,
}) {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const { user, token, updateComment, deleteComment_id } = useSelector(
    (state) => state.auth
  );
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getAllComments = async () => {
    try {
      const results = await axios.post(
        `${URL}/api/post/comment?page=${page}`,
        { post_id: post.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (page > 1) {
        setComments((prevItems) => [...prevItems, ...results.data.data]);
      } else {
        setComments([...results.data.data]);
      }

      if (results.data.data.length === 0) {
        setHasMore(false);
      }
      // get all the comments

      // setComments(results.data.data);
      setCommentsNumber(results.data.data.length);
    } catch (error) {}
  };
  const updatePost = (postId, updatedData) => {
    setComments((prevItems) =>
      prevItems.map((post) =>
        post.id === postId ? { ...post, ...updatedData } : post
      )
    );
  };

  const addOrUpdatePost = (update) => {
    const existingPostIndex = comments.findIndex(
      (post) => post.id === updateComment.id
    );

    if (existingPostIndex !== -1) {
      // Post found, update it
      updatePost(updateComment.id, updateComment);
    } else {
      // Post not found, add it to the beginning of the array
      setComments((prevItems) => [updateComment, ...prevItems]);
    }
  };

  useEffect(() => {
    addOrUpdatePost(updateComment);
  }, [updateComment]);

  useEffect(() => {
    getAllComments();
  }, [page]);
  useEffect(() => {
    const deleteComment_idHandle = (deleteComment_id) => {
      setComments((prevItems) =>
        prevItems.filter((post) => post.id !== deleteComment_id.post_id)
      );
    };

    deleteComment_idHandle(deleteComment_id);
  }, [deleteComment_id]);

  return (
    <>
      <Modal
        title={`${post?.user?.first_name} ${post?.user?.last_name}`}
        isOpen={isCommentModelOpen}
        closeModal={closeCommentModal}
        hasCloseButton
        closeButtonLeft
        childrenPadding="px-3 py-0 sm:py-3"
      >
        {/* {!reels && <SinglePost data={post} notPar={true} />} */}

        {comments[0]?.id &&
          comments.map((comment) => (
            <SingleComment
              post={post}
              key={comment.id}
              parent_comment_id={comment.id}
              user={user}
              data={comment}
            />
          ))}

        {comments.length > 0 && (
          <>
            {hasMore && (
              <button onClick={() => setPage((pre) => pre + 1)}>
                عرض المزيد
              </button>
            )}
          </>
        )}
        <div
          className="sticky  mt-2"
          style={{
            background: "#fff",

            minHeight: "60px",
            bottom: "-12px",
            // borderTop: "1px solid",
          }}
        >
          <CreateComment post={post} />
        </div>
      </Modal>
    </>
  );
}

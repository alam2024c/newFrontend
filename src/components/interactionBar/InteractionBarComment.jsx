/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { like, comment, share } from "../../../assets/images/icons";
import ShareModel from "../../shareModel/ShareModel";
import CommentSection from "../../commentSection/CommentSection";
import { useSelector } from "react-redux";
import axios from "axios";

export default function InteractionBarComment({ data }) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [commentsNumber, setCommentsNumber] = useState(0);
  const [isCommentModelOpen, setIsCommentModelOpen] = useState(false);
  const [isShareModelOpen, setIsShareModelOpen] = useState(false);

  function closeCommentModal() {
    setIsCommentModelOpen(false);
  }

  function openCommentModal() {
    setIsCommentModelOpen(true);
  }

  function closeShareModal() {
    setIsShareModelOpen(false);
  }

  function openShareModal() {
    setIsShareModelOpen(true);
  }

  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const { user, token } = useSelector((state) => state.auth);

  const getAllLikes = async () => {
    try {
      const results = await axios.get(`${URL}/api/getwhoLikedPost/${data.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (results.status === 429) {
        // Implement backoff logic here
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        getAllLikes();
        return;
      }

      if (results.data.original.data !== null) {
        // get all the likes
        setLikes(results.data.original.data.data.length);

        // check if the current user liking the post
        const isLikedByCurrentUser = results.data.original.data.data.some(
          (i) => i.id === user.id
        );
        setIsLiked(isLikedByCurrentUser);
      }
    } catch (error) {}
  };

  const likeThePost = async () => {
    if (isLiked) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
    try {
      const results = await axios.post(
        `${URL}/api/postLike`,
        { post_id: data.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (results.data.original.data.like !== undefined) {
        setLikes(JSON.parse(results.data.original.data.like.Likes).length);
      } else {
        setLikes(0);
      }

      setIsLiked(!isLiked);
    } catch (error) {}
  };

  useEffect(() => {
    getAllLikes();
    // likeThePost();
  }, [isLiked]);

  const comments = "12";

  return (
    <>
      <div className="flex gap-4 mt-8 ps-6">
        <button
          className="relative"
          onClick={() => {
            likeThePost();
          }}
        >
          <img
            style={isLiked ? { background: "red" } : { background: "#fff" }}
            src={isLiked ? like : like}
            role="button"
            alt=""
          />

          <span
            className={`absolute top-2 text-xs left-0 translate-x-3 border-4 border-white rounded-full bg-violet-700 text-white ${
              likes > 9 ? "px-2" : "px-1"
            }`}
          >
            {likes > 0 && (likes > 99 ? "+99" : likes)}
          </span>
        </button>

        <button className="relative" onClick={openCommentModal}>
          <span
            className={`absolute top-2 text-xs left-0 translate-x-3 border-4 border-white rounded-full bg-violet-700 text-white ${
              commentsNumber > 9 ? "px-2" : "px-1"
            }`}
          >
            {commentsNumber > 0 &&
              (commentsNumber > 99 ? "+99" : commentsNumber)}
          </span>
          <img src={comment} role="button" alt="" />
        </button>

        <button onClick={openShareModal}>
          <img src={share} role="button" alt="" />
        </button>
      </div>

      <CommentSection
        post={data}
        isCommentModelOpen={isCommentModelOpen}
        closeCommentModal={closeCommentModal}
        setCommentsNumber={setCommentsNumber}
      />

      <ShareModel
        isShareOpen={isShareModelOpen}
        closeShareModal={closeShareModal}
      />
    </>
  );
}

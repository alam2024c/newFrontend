import { useState } from "react";
import { comment, disLike, like, share } from "../../assets/images/icons";
import { useSelector } from "react-redux";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import axios from "axios";
import CommentSection from "../ui/CommentSection/commentSection/CommentSection";
import ShareModel from "../shareModel/ShareModel";
import WhoIsLiked from "./WhoIsLiked";
import { useNavigate } from "react-router-dom";
import { FaRegShareSquare } from "react-icons/fa";

export default function InteractionBar({ data }) {
  const [likes, setLikes] = useState(data.likes);
  const [isLiked, setIsLiked] = useState(data?.liked);
  const [commentsNumber, setCommentsNumber] = useState(data?.comments);
  const [isCommentModelOpen, setIsCommentModelOpen] = useState(false);
  const [isShareModelOpen, setIsShareModelOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
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

  const likeThePost = async () => {
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

      if (results.data.data.like !== undefined) {
        setLikes(JSON.parse(results.data.data.like.Likes).length);
      } else {
        setLikes(0);
      }

      // setIsLiked(!isLiked);
    } catch (error) {}
  };

  const debouncedLikeThePost = _.debounce(likeThePost, 1000); // Adjust the delay as needed

  const handleLikeButtonClick = () => {
    setTimeout(() => {
      if (isLiked) {
        setLikes((prev) => prev - 1);
      } else {
        setLikes((prev) => prev + 1);
      }
      setIsLiked(!isLiked);
    }, 200);
    debouncedLikeThePost();
  };

  const [isOpen, setIsOpen] = useState(false);
  const direction = localStorage.getItem("direction");
  const { t } = useTranslation();
  const likesArray = Array.from({ length: likes }, (_, index) => index);
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <ul
      className="flex justify-between py-4 sm:px-16 px-8"
      onClick={() => {
        if (!user) {
          navigate("/login");
        }
      }}
    >
      <li>
        <button className="flex gap-2" onClick={openCommentModal}>
          <img src={comment} alt="" style={{ width: "30px" }} />
          {commentsNumber > 0 &&
            (commentsNumber > 99 ? "+99" : commentsNumber)}{" "}
        </button>
      </li>

      <li>
        <button className={`flex gap-2 ${isLiked && "text-red-500"}`}>
          <img
            src={isLiked ? like : disLike}
            alt=""
            style={{ width: "30px" }}
            onClick={handleLikeButtonClick}
          />
          <span
            // className={`absolute top-2 text-xs left-1.5 translate-x-3 border-4 border-white rounded-full bg-violet-700 text-white ${
            //   likes > 9 ? "px-2" : "px-1"
            // }`}
            style={{ color: "rgb(239 68 68 / var(--tw-text-opacity))" }}
            onClick={() => setIsOpen(true)}
          >
            {" "}
            {likes > 0 && (likes > 99 ? "+99" : likes)}
          </span>
        </button>
      </li>

      <li>
        <button className="flex gap-2" onClick={openShareModal}>
          {/* <img src={share} alt="" style={{ width: "30px" }} /> */}
          <FaRegShareSquare className="text-2xl" />
          {/* {data.post_shares.length} */}
        </button>
        {isCommentModelOpen && (
          <CommentSection
            post={data}
            isCommentModelOpen={isCommentModelOpen}
            closeCommentModal={closeCommentModal}
            setCommentsNumber={setCommentsNumber}
            setComments={setComments}
            comments={comments}
          />
        )}
        {isOpen && (
          <WhoIsLiked isOpen={isOpen} setIsOpen={setIsOpen} data={data} />
        )}

        <ShareModel
          data={data}
          isShareOpen={isShareModelOpen}
          setIsShareModelOpen={setIsShareModelOpen}
          closeShareModal={closeShareModal}
        />

        {/* <ShareModal isOpen={isShareOpen} closeModal={closeShareModal} /> */}
      </li>
    </ul>
  );
}

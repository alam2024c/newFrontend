/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";

import { t } from "i18next";
import { useEffect, useRef, useState } from "react";
import { person } from "../../../assets/images/icons";
import axios from "axios";
import { useSelector } from "react-redux";
// import { vertical3dots } from "../../../assets/images/icons";
import DropdownComment from "../dropdown/DropdownComment";
import CreateSubComment from "../createSubComment/CreateSubComment";
import SubCommentSections from "../SubCommentSections/SubCommentSections";
import Input from "../input/Input";
import UpdateComment from "../UpdateComment/UpdateComment";
import WhoIsLikedComment from "../../interactionBar/WhoIsLikedComment";
// import WhoIsLikedComment from "../../interactionBar/WhoIsLikedComment";
import { dots } from "../../../assets/icons";

export default function SingleComment({ data, user, parent_comment_id, post }) {
  const [isWriting, setIsWriting] = useState(false);
  const dateObject = new Date(data.updated_at);
  const normalTime = dateObject.toLocaleTimeString();
  const [likes, setLikes] = useState(data?.likes);
  const [isLiked, setIsLiked] = useState(data?.liked);
  const [edit, setEdit] = useState(false);
  const menuRef = useRef();
  const [textWithLineBreak, setTextWithLineBreak] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (data?.text) {
      const formattedText = data.text.split("\n").map((line, lineIndex) => {
        const words = line.split(" ");
        const formattedLine = words.map((word, wordIndex) => {
          const isWordTooLong = word.length > 10;
          const isHashTag = word.startsWith("#");
          const isMentioned =
            data.mention && data.mention.includes(word.trim()); // Check if data.mention exists and includes the word
          console.log(data.mention, "word", word);
          console.log(isMentioned, "isMentioned", "isHashTag=>", isHashTag);
          return isWordTooLong ? (
            <span
              key={`${lineIndex}-${wordIndex}`}
              className={
                isHashTag
                  ? "blue cursor-pointer mention-tag"
                  : isMentioned
                  ? "blue cursor-pointer mention-tag"
                  : "inherit cursor-pointer"
              }
              onClick={() => {
                if (isHashTag) {
                  navigate(`/singlePostTag/${word.slice(1)}`);
                } else if (isMentioned) {
                  navigate(`/profile/${word}`);
                }
              }}
              style={{
                lineBreak: "anywhere",
                color: isHashTag ? "blue" : isMentioned ? "blue" : "inherit",
              }}
            >
              {isWordTooLong ? word + " " : word}
            </span>
          ) : (
            <span
              className={isHashTag || isMentioned ? "cursor-pointer" : ""}
              key={`${lineIndex}-${wordIndex}`}
              onClick={() => {
                if (isHashTag) {
                  navigate(`/singlePostTag/${word.slice(1)}`);
                } else if (isMentioned) {
                  navigate(`/profile/${word}`);
                }
              }}
              style={{
                color: isHashTag ? "blue" : isMentioned ? "blue" : "inherit",
              }}
            >
              {word}{" "}
            </span>
          );
        });
        return <div key={lineIndex}>{formattedLine}</div>;
      });
      setTextWithLineBreak(formattedText);
    }
  }, [data?.text, data?.mention]);
  // useEffect(() => {
  //   const handleClick = (e) => {
  //     if (menuRef?.current?.contains(e.target)) {
  //       // inside click
  //       console.log(true);

  //       return;
  //     } else {
  //       console.log(false);
  //       setEdit(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClick);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClick);
  //   };
  // }, [menuRef]);

  // console.log(parent_comment_id);
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const { token } = useSelector((state) => state.auth);
  const [showAllReplay, setShowAllReplay] = useState(false);

  const commentRef = useRef();

  const handleClickOutside = (event) => {
    if (edit && !commentRef?.current?.contains(event.target)) {
      setEdit(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [edit]);

  const likeTheComment = async () => {
    setTimeout(() => {
      if (isLiked) {
        setLikes((prev) => prev - 1);
      } else {
        setLikes((prev) => prev + 1);
      }
      setIsLiked(!isLiked);
    }, 200);
    try {
      const results = await axios.post(
        `${URL}/api/post/comment_like`,
        { post_comment_id: data.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(results.data.data.like.likes);

      if (results.data.data !== undefined) {
        setLikes(JSON.parse(results.data.data.like.likes).length);
      } else {
        setLikes(0);
      }

      setIsLiked(!isLiked);
    } catch (error) {
      console.log("like error :" + error);
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    // <div key={data.id} className={data.parent === null ? "" : "ms-20"}>
    <div className="d-flex w-full relative ">
      <div key={data.id} className="w-100">
        <div className="flex gap-2 mt-6">
          <Link to={"/profile/" + data?.user_name}>
            {data?.user_image ? (
              <img
                className="rounded-full"
                src={`${URL}/storage/${data?.user_image}`}
                alt=""
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                // onClick={toggleDropdown}
              />
            ) : (
              <img
                className="rounded-full"
                src={user.image ? user.image : person}
                alt="person"
              />
            )}
          </Link>
          <div>
            <Link className="flex" to={"/profile/" + data?.user_name}>
              <p className="text-lg capitalize">
                {data.first_name + " " + data.last_name}
              </p>
              {data.type && (
                <img className="w-4 h-4 m-2" src={data.type} alt="" />
              )}
            </Link>
            <div>
              {edit ? (
                <UpdateComment
                  // ref={menuRef}
                  value={data.text}
                  data={data}
                  setEdit={setEdit}
                />
              ) : (
                <>
                  <p>{textWithLineBreak}</p>
                  {data.image && (
                    <img
                      src={`${URL}/storage/${data.image}`}
                      alt=""
                      style={{ width: "250px", height: "150px" }}
                    />
                  )}
                </>
              )}
            </div>

            <div className="d-flex gap-1 text-stone-400 py-2 align-items-center">
              <button
                className={`h-fit ${isLiked && "text-blue-600"}`}
                onClick={likeTheComment}
              >
                {t("Like") + " ."}
              </button>
              <button
                className={`h-fit ${
                  isWriting ? "text-blue-600 underline" : ""
                }`}
                onClick={() => {
                  setIsWriting(!isWriting);
                  setShowAllReplay(true);
                }}
              >
                {t("Comment")}
              </button>
              {" ."}
              <p className="h-fit " style={{ fontSize: "17px" }}>
                {normalTime + " ."}
              </p>
              <p
                className="text-violet-700 h-fit "
                style={{ fontSize: "17px" }}
                onClick={() => setIsOpen(true)}
              >
                {likes + " " + t("Likes")}
              </p>
            </div>
          </div>
        </div>
        {isWriting && (
          <CreateSubComment
            post={data}
            isReplying={isWriting}
            setIsWriting={setIsWriting}
          />
        )}

        {data.subcomment > 0 ? (
          <>
            {!showAllReplay && (
              <div className="mx-3" onClick={() => setShowAllReplay(true)}>
                عرض كل الردود ({data.subcomment})
              </div>
            )}
            {showAllReplay && (
              <SubCommentSections data={data} showAllReplay={showAllReplay} />
            )}
          </>
        ) : (
          <>
            {/* {showAllReplay && ( */}
            <SubCommentSections data={data} showAllReplay={showAllReplay} />
            {/* )} */}
          </>
        )}

        {isOpen && (
          <WhoIsLikedComment
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            data={data}
          />
        )}
      </div>
      {data?.user_id == user?.id && (
        <div
          className="p-absolute"
          style={{ left: "0px", position: "absolute", marginTop: "10px" }}
        >
          <DropdownComment
            buttonData={<img src={dots} alt="" role="button" />}
            labels={["Edit", "Delete"]}
            post_id={data.id}
            post={data}
            setEdit={setEdit}
          />
        </div>
      )}
    </div>
  );
}

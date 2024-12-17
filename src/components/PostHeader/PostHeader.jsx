import { user } from "/public/fakeData";
import {
  close1,
  edit,
  flags,
  person,
  pin,
  storage,
  trash,
} from "../../assets/images/icons";
import { dots } from "../../assets/icons";
import { Gallery, InteractionBar, PostDetails } from "../";
import { useEffect, useRef, useState } from "react";
import { AudioPlayer, Dropdown } from "../ui";
import VideoPlayer from "../ui/videoPlayer/VideoPlayer";
import { useSelector } from "react-redux";
import Files from "../Files/Files";
import { useTranslation } from "react-i18next";
import { MdPublic } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";

import { useNavigate } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import TextPost from "./TextPost";
function PostHeader({ data, isFullScreen = false, closeModal, notPar }) {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const { user } = useSelector((state) => state.auth);
  const [textWithLineBreak, setTextWithLineBreak] = useState("");

  useEffect(() => {
    if (data?.text) {
      const formattedText = data.text.split("\n").map((line, lineIndex) => {
        const words = line.split(" ");
        const formattedLine = words.map((word, wordIndex) => {
          const isWordTooLong = word.length > 10;
          const isHashTag = word.startsWith("#");
          const isMentioned =
            data.mention && data.mention.includes(word.trim()); // Check if data.mention exists and includes the word
          // console.log(data.mention, "word", word);
          // console.log(isMentioned, "isMentioned", "isHashTag=>", isHashTag);
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

  const dropdownData = [{ name: "report post", image: flags, value: "report" }];
  const dropdownDataMe = [
    { name: "delete post", image: trash, value: "delete" },
    { name: "edit post", image: edit, value: "edit" },
  ];
  const myUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [t, i18n] = useTranslation();

  // console.log("User Data:", user.privacy);
  const privacy = user.privacy;

  const formatDateEnglish = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `Posted in ${formattedHours}:${minutes} ${ampm} ${day}/${month}/${year}`;
  };

  const formatDateArabic = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const ampm = hours >= 12 ? "مساءً" : "صباحًا";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `نشر في ${formattedHours}:${minutes} ${ampm} ${year}/${month}/${day}`;
  };
  const englishDate = formatDateEnglish(data?.created_at);
  const arabicDate = formatDateArabic(data?.created_at);

  return (
    <div className="sm:flex flex-row-reverse w-full justify-between">
      <div className="flex justify-end items-cente gap-4 pt-3">
        {data.post_news ? (
          <p className="text-white bg-[#7CC9D1] px-6 py-2 h-10 rounded-b-full post__type">
            {t("News")}
          </p>
        ) : data.post_expirment ? (
          <p className="text-white bg-[#7CC9D1] px-6 py-2 h-10 rounded-b-full post__type">
            {t("Add Science Experiment")}
          </p>
        ) : data.post_document ? (
          <p className="text-white bg-[#7CC9D1] px-6 py-2 h-10 rounded-b-full post__type">
            {t("Document Check up")}
          </p>
        ) : data.post_trainer ? (
          <p className="text-white bg-[#7CC9D1] px-6 py-2 h-10 rounded-b-full post__type">
            {t("Request for Volunteers or Trainees")}
          </p>
        ) : data.post_scholarship ? (
          <p className="text-white bg-[#7CC9D1] px-6 py-2 h-10 rounded-b-full post__type">
            {t("Scholarship Announcement")}
          </p>
        ) : data.post_project ? (
          <p className="text-white bg-[#7CC9D1] px-6 py-2 h-10 rounded-b-full post__type">
            {t("Project Funding")}
          </p>
        ) : data.post_course ? (
          <p className="text-white bg-[#7CC9D1] px-6 py-2 h-10 rounded-b-full post__type">
            {t("Announcing Course")}
          </p>
        ) : data.post_service ? (
          <p className="text-white bg-[#7CC9D1] px-6 py-2 h-10 rounded-b-full post__type">
            {t("Request for a Scientific Service")}
          </p>
        ) : data.post_donation ? (
          <p className="text-white bg-[#7CC9D1] px-6 py-2 h-10 rounded-b-full post__type">
            {t("Donations")}
          </p>
        ) : data.post_essay ? (
          <p className="text-white bg-[#7CC9D1] px-6 py-2 h-10 rounded-b-full post__type">
            {t("Essay")}
          </p>
        ) : data.post_code ? (
          <p className="text-white bg-[#7CC9D1] px-6 py-2 h-10 rounded-b-full post__type">
            {t("Inquiry Code")}
          </p>
        ) : data.post_research ? (
          <p className="text-white bg-[#7CC9D1] px-6 py-2 h-10 rounded-b-full post__type">
            {t("Scientific Research Summary")}
          </p>
        ) : data.post_congratulation ? (
          <p className="text-white bg-[#7CC9D1] px-6 py-2 h-10 rounded-b-full post__type">
            {t("Add Congratulations")}
          </p>
        ) : data.post_book ? (
          <p className="text-white bg-[#7CC9D1] px-6 py-2 h-10 rounded-b-full post__type">
          {/* change by abdallah */}
            {t("Summary of Book, Novel or Film")}
          </p>
        ) : data.post_story ? (
          <p className="text-white bg-[#7CC9D1] px-6 py-2 h-10 rounded-b-full post__type">
            {t("Add Short Story")}
          </p>
        ) : data.post_product ? (
          <p className="text-white bg-[#7CC9D1] px-6 py-2 h-10 rounded-b-full post__type">
            {t("Offer Commercial Product")}
          </p>
        ) : data.post_event ? (
          <p className="text-white bg-[#7CC9D1] px-6 py-2 h-10 rounded-b-full post__type">
            {t("Announcing for an Event")}
          </p>
        ) : data.post_official ? (
          <p className="text-white bg-[#7CC9D1] px-6 py-2 h-10 rounded-b-full post__type">
            {t("Official Announcement")}
          </p>
        ) : data.post_quotation ? (
          <p className="text-white bg-[#7CC9D1] px-6 py-2 h-10 rounded-b-full post__type">
            {t("Request for Quotation")}
          </p>
        ) : data.post_researcher_story ? (
          <p className="text-white bg-[#7CC9D1] px-6 py-2 h-10 rounded-b-full post__type">
            {t("Researcher Story")}
          </p>
        ) : data.post_questionnaire ? (
          <p className="text-white bg-[#7CC9D1] px-6 py-2 h-10 rounded-b-full post__type">
            {t("Questionnaire")}
          </p>
        ) : (
          data.post_suggest && (
            <p className="text-white bg-[#7CC9D1] px-6 py-2 h-10 rounded-b-full post__type">
              {t("Suggest Collaboration")}
            </p>
          )
        )}
        {/* <button className="h-full" onClick={() => {}}></button> */}
        {!notPar && (
          <Dropdown
            buttonData={<img className="w-5" src={dots} alt="" />}
            data={user?.id == data?.user?.id ? dropdownDataMe : dropdownData}
            post={data}
          />
        )}

        {isFullScreen && (
          <button className="h-full" onClick={closeModal}>
            <img className="w-5" src={close1} alt="" />
          </button>
        )}
      </div>

      <div className="flex gap-2 pt-2">
        <button
          className="w-12 h-12 p-0 rounded-full"
          onClick={() => navigate(`/profile/${data?.user?.user_name}`)}
        >
          <img
            className="w-full h-full"
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              minWidth: "50px",
            }}
            src={
              data?.user?.profile_image
                ? `${URL}/storage/${data?.user?.profile_image}`
                : person
            }
            alt=""
          />
        </button>
        <div>
          <p
            className="flex gap-1 capitalize font-black align-items-center"
            onClick={() => navigate(`/profile/${data?.user?.user_name}`)}
          >
            {data?.classification_id == 23
              ? `${data?.user?.first_name} ${data?.user?.last_name} ${t(
                  "updated profile picture"
                )}`
              : data?.classification_id == 25
              ? ` ${data?.user?.first_name} ${data?.user?.last_name} ${t(
                  "updated profile cover"
                )}`
              : `${data?.user?.first_name} ${data?.user?.last_name}`}
            {/* {} */}
            <span className="font-medium text-gray-400">
              {data?.privacy == "public" ? <MdPublic /> : <FaUserFriends />}
            </span>
            {/* 
            <span className="hidden sm:block text-gray-400">
              {calculateTimeAgo(data.created_at)}
            </span> */}
          </p>

          {/* handle the category mark on the post  */}

          <p className="text-gray-400 flex gap-1">
            {i18n.language == "ar" ? arabicDate : englishDate}
          </p>

          {/* handle the text post  */}

          {/* added by abdallah */}
        </div>
      </div>
    </div>
  );
}

export default PostHeader;

import React, { useEffect, useRef, useState } from "react";
import { AudioRecorder, Button, Modal, Select, Textarea } from "../ui";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Tooltip } from "react-tooltip";

import { person } from "../../assets/images/icons";
import { FaPenToSquare } from "react-icons/fa6";
import SelectedFile from "../ui/selectedfile/selectedFile";
import {
  addUpload,
  finishUpload,
  setPercentage,
} from "../../rtk/slices/progressSlice";
import { refrechPosts } from "../../rtk/slices/authSlice";
import { toast } from "react-toastify";
import axios from "axios";
// import { getDataCategory } from "../posts/getDataPost";
import SelectCategory from "../ui/SelectCategory/SelectCategory";
import { FaFileUpload } from "react-icons/fa";
import { FaMicrophoneAlt } from "react-icons/fa";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { FaFileSignature } from "react-icons/fa6";
import Picker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";

function ModalMain({
  isMainOpen,
  setIsMainOpen,
  post,
  selectedField,
  setSelectedField,
  setHasCategory,
  setchange,
  change,
}) {
  const [formData, setFormData] = useState({});
  const [t, i18n] = useTranslation();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  let api = post ? `update_post/${post.id}` : `create_post`;
  const [text, setText] = useState(post?.text || "");
  const [return_metion, setreturn_metion] = useState(post?.return);
  const [mention, setMention] = useState(post?.mention || []);
  const [photo, setPhoto] = useState([]);
  const [video, setVideo] = useState(post?.video);
  const [loading, setLoading] = useState("");
  const [videoEdit, setVideoEdit] = useState("");
  const [imageEdit, setImageEdit] = useState(
    post?.image?.length > 0 ? post?.image : ""
  );
  const [recordEdit, setrecordEdit] = useState("");
  const [file, setFile] = useState("");
  const [record, setRecord] = useState(post?.audio);
  const [categor_id, setcategor_id] = useState(post?.category_id);
  const [privacy, setPrivacy] = useState(
    user?.profile?.privacy == "private"
      ? user.profile.privacy
      : post?.privacy || "public"
  );
  useEffect(() => {
    setImageEdit(post?.image?.length > 0 ? post?.image : "");
  }, [post?.image]);
  // useEffect(() => {
  // }, [selectedField]);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [selectedValue, setSelectedValue] = useState({});
  useEffect(() => {
    setVideo(post?.video);
    setRecord(post?.audio);
    setText(post?.text);
    setMention(post?.mention);
    setcategor_id(post?.category_id);
    setreturn_metion(post?.return);
  }, [change]);

  // emoji
  const menuRef = useRef();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef?.current?.contains(e.target)) {
        // inside click

        return;
      } else {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [menuRef]);

  const addEmoji = (emojiObject) => {
    let sym = emojiObject.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    if (text) {
      setText(text + emoji);

      setreturn_metion(return_metion + emoji);
    } else {
      setText(emoji);

      setreturn_metion(emoji);
    }
    // setShowEmojiPicker(false);
  };

  //
  const buttons = [
    {
      name: "text",
      className: "my-anchor-text",
      icon: <FaPenToSquare style={{ fontSize: "30px" }} />,
    },
    {
      name: "image",
      className: "my-anchor-image",
      icon: <CiImageOn style={{ fontSize: "30px" }} />,
    },
    {
      name: "video",
      className: "my-anchor-video",
      icon: <MdOutlineSlowMotionVideo style={{ fontSize: "30px" }} />,
    },
    {
      name: "record",
      className: "my-anchor-record",
      icon: <FaMicrophoneAlt style={{ fontSize: "30px" }} />,
    },
    {
      name: "file",
      className: "my-anchor-file",
      icon: <FaFileSignature style={{ fontSize: "30px" }} />,
    },
  ];

  const handleFieldSelection = (fieldName) => {
    setSelectedField(fieldName);
    setIsMainOpen(true);
  };
  const data = new FormData(); //upload text and photo and audio
  async function fetchData() {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      data.append("audio", blob, "audio.wav");
      data.append("classification_id", 4); // تمت إضافة هذا هنا
    } catch (error) {
      console.error("Error fetching audio file:", error);
    }
  }

  if (url) {
    fetchData();
  }
  const handleClick = async (e) => {
    setLoading(true);
    if (categor_id) {
      setIsMainOpen(false);
      setError("");
      data.append("privacy", privacy);
      setIsMainOpen(false);

      data.append("category_id", categor_id);
      if (selectedField == "image") {
        if (photo.length > 0) {
          // create
          data.append("classification_id", 3);
          for (let i = 0; i < photo.length; i++) {
            data.append("image[]", photo[i]);
          }
        } else if (imageEdit?.length > 0) {
          //edit
          data.append("classification_id", 3);
          for (let i = 0; i < imageEdit.length; i++) {
            data.append("image[]", imageEdit[i].image.path);
          }
        }
      } else if (selectedField == "file") {
        if (file.length > 0) {
          // create
          data.append("classification_id", 5);
          for (let i = 0; i < file.length; i++) {
            data.append("file[]", file[i]);
          }
        } else if (imageEdit?.length > 0) {
          //edit
          data.append("classification_id", 3);
          for (let i = 0; i < imageEdit.length; i++) {
            data.append("image[]", imageEdit[i]);
          }
        }
      } else if (selectedField == "record") {
        if (record) {
          data.append("audio", record);
          data.append("classification_id", 4);
        } else if (recordEdit) {
          data.append("audio", record);
          data.append("classification_id", 4);
        }
        //  else if (url) {
        //   if (url) {
        //     fetch(url)
        //       .then((response) => response.blob())
        //       .then((blob) => {
        //         data.append("audio", blob, "audio.wav");
        //       })
        //       .catch((error) => {
        //         console.error("Error fetching audio file:", error);
        //       });
        //     data.append("classification_id", 4);
        //   }
        // }
      }
      if (text) {
        data.append("classification_id", 1);
        data.append("return", return_metion);
        data.append("text", text);
        for (let i = 0; i < mention?.length; i++) {
          data.append("mention[]", mention[i]?.display);
        }
      }

      const fileId = Date.now();
      dispatch(addUpload({ fileId }));
      try {
        const res = await axios.post(
          `${URL}/api/post/${api}`,
          data,

          {
            headers: {
              Accept: "multipart/form-data",
              Authorization: `Bearer ${token}`,
              "Accept-Language": i18n.language,
            },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              dispatch(setPercentage({ fileId, progress }));
            },
          }
        );
        setcategor_id("");
        setLoading(false);
        if (res.data) {
          setTimeout(() => {
            dispatch(refrechPosts(res.data.post));
            dispatch(finishUpload({ fileId }));
            toast.success("تم نشر المنشور");
            setPhoto("");
            setImageEdit("");
            setVideo("");
            setreturn_metion("");
          }, 3000);

          setUrl("");
          setRecord("");
          setText("");
          setIsMainOpen(false);
        }
      } catch (err) {
        setLoading(false);
        setcategor_id("");

        dispatch(finishUpload({ fileId }));
        toast.error(t("A network error occurred"));
        setPhoto("");
        setVideo("");
        setreturn_metion("");

        setRecord("");
        // setUrl("");
        setcategor_id("");
        setText("");
        setIsMainOpen(false);
      }
    } else {
      setLoading(false);
      setcategor_id("");

      setError(t("The type of post must be selected first"));
    }
  };

  //video

  const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
  let uploadedChunks = 0;
  const [progress, setProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  // const handleProgress =
  const totalChunks = Math.ceil(video?.size / CHUNK_SIZE);
  const generateRandomFileName = (length) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomFileName = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomFileName += charset.charAt(randomIndex);
    }
    return randomFileName;
  };
  const [randomFileName, setRandomFileName] = useState(
    generateRandomFileName(10)
  ); // Change the length as needed

  const handleGenerateRandomFileName = () => {
    const newRandomFileName = generateRandomFileName(10); // Change the length as needed
    setRandomFileName(newRandomFileName);
  };
  const handleClickVideo = async () => {
    setLoading(true);
    if (categor_id) {
      setError("");

      await handleGenerateRandomFileName();
      const start = uploadedChunks * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, video.size);
      setIsMainOpen(false);

      // const blob = video.slice(start, end);
      const blob = video.slice(start, end, "video/mp4");
      if (video || videoEdit) {
        const formData = new FormData();
        formData.append("video", blob);
        // formData.append("privacy", "public");
        formData.append("category_id", categor_id);
        // formData.append("classification_id", 2);
        formData.append("random_title", randomFileName);
        formData.append("chunkIndex", uploadedChunks);
        formData.append("totalChunks", totalChunks);
        const fileId = Date.now(); // Generate a unique fileId
        dispatch(addUpload({ fileId }));
        axios
          .post(`${URL}/api/post/post-create-video`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
              "Accept-Language": i18n.language,
            },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round((uploadedChunks / totalChunks) * 100);
              setProgress(progress);

              if (progress === 100) {
                setUploadComplete(true);
              }
              dispatch(setPercentage({ fileId, progress }));
            },
          })
          .then(function (response) {
            if (response?.data?.data.path) {
              dispatch(finishUpload({ fileId }));
              if (uploadedChunks < totalChunks) {
                handleClickVideo();
              } else {
                setUploadComplete(true);
                data.append("video", response?.data?.data?.path);
                // formData2.append("privacy", privacy);
                data.append("classification_id", 2);
                data.append("category_id", categor_id);
                if (text) {
                  data.append("return", return_metion);
                  data.append("text", text);
                  for (let i = 0; i < mention.length; i++) {
                    data.append("mention[]", mention[i].display);
                  }
                }
                data.append("privacy", privacy);
                // if (text) {
                //   formData2.append("text", text);
                // }
                axios
                  .post(`${URL}/api/post/${api}`, data, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                      Authorization: `Bearer ${token}`,
                      "Accept-Language": i18n.language,
                    },
                  })
                  .then(function (response) {
                    dispatch(refrechPosts(response.data.post));
                    setLoading(false);
                    setRecord("");
                    setUrl("");
                    setText("");
                    setVideo("");
                    setreturn_metion("");

                    setIsMainOpen(false);

                    setPhoto("");
                  })
                  .catch(function (error) {});
              }
            } else {
              setLoading(false);

              setRecord("");
              setUrl("");
              setText("");
              setVideo("");
              setreturn_metion("");

              setIsMainOpen(false);
              setcategor_id("");

              setPhoto("");
            }
            uploadedChunks++;
          })
          .catch(function (error) {
            setRecord("");
            setUrl("");
            setIsMainOpen(false);
            setcategor_id("");

            setText("");
            setVideo("");
            setreturn_metion("");

            setPhoto("");
            setLoading(false);
          });
      }
    } else {
      setError(t("The type of post must be selected first"));
      setLoading(false);
      setcategor_id("");
    }
  };
  const handleClickVideoEdit = async () => {
    setLoading(true);
    setIsMainOpen(false);
    if (categor_id) {
      const data = new FormData();
      data.append("id", post.id);
      data.append("text", text);
      data.append("category_id", categor_id);
      data.append("classification_id", 2);
      data.append("return", return_metion);
      data.append("text", text);
      for (let i = 0; i < mention.length; i++) {
        data.append("mention[]", mention[i].display);
      }

      await axios
        .post(`${URL}/api/post/${api}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            "Accept-Language": i18n.language,
          },
        })
        .then(function (response) {
          dispatch(refrechPosts(response.data.post));

          setRecord("");
          setUrl("");
          setText("");
          setVideo("");
          setreturn_metion("");

          setIsMainOpen(false);

          // setPhoto("");
          setLoading(false);
        })
        .catch(function (error) {
          setLoading(false);
        });
    } else {
      setError(t("The type of post must be selected first"));
      setLoading(false);
      setcategor_id("");
    }
  };

  function closeMainModal() {
    setIsMainOpen(false);
    setreturn_metion("");
    setPhoto("");
    setVideo("");
    setreturn_metion("");

    setUrl("");
    setRecord("");
    setText("");
    setFile([]);
    setSelectedField("text");
    // setText("");
    // setPrivacy("");
    // setSelectedValue("");
  }

  return (
    <Modal
      isOpen={isMainOpen}
      closeModal={closeMainModal}
      title={
        selectedField
          ? `${t("Post")} ${t(selectedField)}`
          : `${t("Post")} ${text}`
      }
      children={
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // setIsMainOpen(false);
            if (selectedField == "video") {
              if (!video || !video.size) {
                // handleClickVideo();
                handleClickVideoEdit();
              } else {
                handleClickVideo();
              }
            } else {
              handleClick();
            }
          }}
        >
          <SelectCategory
            className="w-full rounded-lg capitalize"
            // selectLabels={items}
            selectName="category"
            preSelect={post?.category ? post?.category : "Select Category"}
            handleSelectChange={(value) => {
              setcategor_id(value);
            }}
            // preSelect={true}
          />
          {error && (
            <span className="text-red" style={{ color: "red" }}>
              {error}
            </span>
          )}

          <form className="flex flex-col-reverse sm:flex-row justify-center sm:justify-between items-cente">
            <div className="flex post_textarea">
              <img
                style={{ transform: "rotate(0deg)" }}
                className="w-12 h-12 rounded-full my-2"
                src={
                  user?.profile?.image
                    ? `${URL}/storage/${user?.profile?.image}`
                    : person
                }
                alt=""
              />

              <Textarea
                height="h-[50dvh] sm:h-20"
                bg="bg-white"
                width="w-full sm:w-96"
                value={text}
                setText={setText}
                setreturn_metion={setreturn_metion}
                return_metion={return_metion}
                placeholder={t("What's on your mind?")}
                setMention={setMention}
                // handleChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className=" ms-auto my-3">
              <span className="text-center mt-2 ">{t("Choose Privacy")}</span>
              <Select
                bg={"bg-white"}
                className="h-11 sm:w-44 gap-2 w-fit rounded-full border-2 border-[#0099AB] text-[#0099AB]"
                selectLabels={["public", "private"]}
                placeholder={"Coose"}
                preSelect={privacy ? privacy : true}
                handleSelectChange={(value) => setPrivacy(value)}
              />
            </div>
          </form>

          {(selectedField === "record" || record) && (
            <AudioRecorder
              setRecord={setRecord}
              record={record}
              setPhoto={setPhoto}
              photo={photo}
              selectedField={selectedField}
              setSelectedField={setSelectedField}
              setVideo={setVideo}
              video={video}
              imageEdit={imageEdit}
              setImageEdit={setImageEdit}
              setVideoEdit={setVideoEdit}
              videoEdit={videoEdit}
              recordEdit={recordEdit}
              setrecordEdit={setrecordEdit}
              setUrl={setUrl}
              url={url}
            />
          )}

          {selectedField === "file" && (
            <SelectedFile
              setPhoto={setPhoto}
              photo={photo}
              selectedField={selectedField}
              setSelectedField={setSelectedField}
              setVideo={setVideo}
              video={video}
              imageEdit={imageEdit}
              setImageEdit={setImageEdit}
              setVideoEdit={setVideoEdit}
              videoEdit={videoEdit}
              setFile={setFile}
              file={file}
              setrecordEdit={setrecordEdit}
              recordEdit={recordEdit}
            />
          )}

          {(selectedField === "image" || imageEdit) && (
            <SelectedFile
              setPhoto={setPhoto}
              photo={photo}
              selectedField={selectedField}
              setSelectedField={setSelectedField}
              setVideo={setVideo}
              video={video}
              imageEdit={imageEdit}
              setImageEdit={setImageEdit}
              setVideoEdit={setVideoEdit}
              videoEdit={videoEdit}
              setrecordEdit={setrecordEdit}
              recordEdit={recordEdit}
            />
          )}

          {(selectedField === "video" || video) && (
            <SelectedFile
              setPhoto={setPhoto}
              photo={photo}
              setVideo={setVideo}
              setRecord={setRecord}
              record={record}
              video={video}
              selectedField={selectedField}
              setSelectedField={setSelectedField}
              setVideoEdit={setVideoEdit}
              videoEdit={videoEdit}
              imageEdit={imageEdit}
              setrecordEdit={setrecordEdit}
              recordEdit={recordEdit}
              setImageEdit={setImageEdit}
            />
          )}

          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center py-2 gap-3 ">
            <ul
              className="flex gap-4 w-100 "
              style={{ justifyContent: "start", height: "40px" }}
            >
              {buttons.map((button, i) => (
                <li className="" key={i}>
                  <a
                    id={button.name}
                    className={`ramade  ${button.className} `}
                    onClick={() => {
                      handleFieldSelection(button.name);
                    }}
                  >
                    {button.icon}
                    <img className="w-5" src={button.icon} alt="" />
                  </a>
                  <Tooltip anchorSelect=".my-anchor-text" place="top">
                    {t("Text")}
                  </Tooltip>{" "}
                  <Tooltip anchorSelect=".my-anchor-file" place="top">
                    {t("File")}
                  </Tooltip>{" "}
                  <Tooltip anchorSelect=".my-anchor-record" place="top">
                    {t("Record")}
                  </Tooltip>{" "}
                  <Tooltip anchorSelect=".my-anchor-video" place="top">
                    {t("Video")}
                  </Tooltip>{" "}
                  <Tooltip anchorSelect=".my-anchor-image" place="top">
                    {t("Image")}
                  </Tooltip>{" "}
                </li>
              ))}
              <BsEmojiSmile
                onClick={() => setShowEmojiPicker((val) => !val)}
                style={{
                  cursor: "pointer",
                  // height: "20px",
                  fontSize: "25px",
                }}
              />

              {showEmojiPicker && (
                <div ref={menuRef}>
                  <Picker
                    onEmojiClick={addEmoji}
                    style={{
                      height: "398px",
                      width: "80%",
                      position: "absolute",
                      bottom: "44px",
                      left: "55px",
                    }}
                  />
                </div>
              )}
            </ul>
            <div className="flex gap-2 align-items-end justify-content-end d-flex ms-auto">
              {" "}
              <Button
                className={"w-fit rounded-full h-fit "}
                children={t("More")}
                isReverse={true}
                type="button"
                onClick={() => {
                  setHasCategory(true);
                  closeMainModal();
                }}
              />
              <Button
                disabled={selectedField == "text" && !text}
                loading={loading}
                className={"w-fit rounded-full h-fit"}
                children={t("Post")}
              />
            </div>
          </div>
        </form>
      }
    />
  );
}

export default ModalMain;

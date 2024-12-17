import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Modal } from "../../../../components/ui";
import { toast } from "react-toastify";

import {
  deleteVideoCourse,
  refrechPostsMyCourse,
} from "../../../../rtk/slices/authSlice";
import {
  addUpload,
  finishUpload,
  setPercentage,
} from "../../../../rtk/slices/progressSlice";
import FormSelect from "../../../../components/formSelect/FormSelect";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ModalAddOneCourse({
  post,
  setModalOpened,
  modalOpened,
  type,
  setChange,
  change,
}) {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [categor_id, setcategor_id] = useState(post?.category_id);
  const { token, user } = useSelector((state) => state.auth);
  const [t, i18n] = useTranslation();

  function closeModal() {
    setModalOpened(false);
  }

  //   function openModal() {
  //     setModalOpened(true);
  //   }

  const [data, setData] = useState("");

  const groups = [
    {
      label: t("name"),
      name: t("Name"),
      type: "text",
      placeholder: t("name"),
      state: "title",
      value: data?.title,
    },

    {
      label: t("desc"),
      name: t("Description"),
      type: "textarea",
      placeholder: t("Description"),
      state: "desc",
      value: data?.desc,
    },
    {
      label: t("Image"),
      name: t("Picture for the video"),
      type: "file",
      placeholder: t("Description"),
      state: "image",
      value: data?.desc,
      required: true,
    },
    {
      label: t("UploadFile"),
      name: t("Upload Video"),
      requird: true,
      type: "video",
      buttonText: t("image"),
      state: "video",
    },
  ];
  const [loading, setLoading] = useState("");
  const params = useParams().id;
  const [error, setError] = useState("");

  const [selectedValue, setSelectedValue] = useState({});
  let api = post ? `courses/${post?.id}/update` : `courses`;
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (post) {
  //     setSelectedValue((prevValues) => ({
  //       ...prevValues,
  //       video: post?.video,
  //     }));
  //   }
  // }, [post]);
  const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
  let uploadedChunks = 0;
  const [progress, setProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  // const handleProgress =
  const totalChunks = Math.ceil(selectedValue.video?.size / CHUNK_SIZE);
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
  );

  const handleGenerateRandomFileName = () => {
    const newRandomFileName = generateRandomFileName(10); // Change the length as needed
    setRandomFileName(newRandomFileName);
  };
  const handleClickVideo = async () => {
    // e.preventDefault();

    setLoading(true);

    setError("");
    setModalOpened(false);
    await handleGenerateRandomFileName();
    const start = uploadedChunks * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, selectedValue.video?.size);

    // const blob =selectedValue.video.slice(start, end);
    const blob = selectedValue.video?.slice(start, end, "video/mp4");
    if (selectedValue?.video) {
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
              const data = new FormData();
              for (const key in selectedValue) {
              }
              data.append("title", selectedValue.title);
              data.append("desc", selectedValue.desc);
              data.append("image", selectedValue.image);
              setUploadComplete(true);
              data.append("video", response?.data?.data?.path);
              data.append("playlist_id", params);

              axios
                .post(`${URL}/api/${api}`, data, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                  },
                })
                .then(function (response) {
                  // dispatch(refrechPosts(response.data.post));
                  setLoading(false);
                  setChange(!change);
                  setModalOpened(false);
                  toast.success("تم نشر المنشور");
                })
                .catch(function (error) {});
            }
          } else {
            setLoading(false);
          }
          uploadedChunks++;
        })
        .catch(function (error) {});
    }
  };
  const handleClickVideoEdit = async () => {
    setLoading(true);
    setModalOpened(false);
    const data = new FormData();
    for (const key in selectedValue) {
    }
    if (selectedValue.title) {
      data.append("title", selectedValue.title);
    }
    if (selectedValue.desc) {
      data.append("desc", selectedValue.desc);
    }
    if (selectedValue.image) {
      data.append("image", selectedValue.image);
    }
    setUploadComplete(true);
    // data.append("video", response?.data?.data?.path);
    data.append("playlist_id", params);

    await axios
      .post(`${URL}/api/${api}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setModalOpened(false);

        // setPhoto("");
        dispatch(deleteVideoCourse(Math.random()));

        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  };
  return (
    <div className="addContents">
      <Modal
        isOpen={modalOpened}
        closeModal={closeModal}
        title={t("Add Video")}
      >
        <form
          className=" "
          onSubmit={(e) => {
            e.preventDefault();
            if (post) {
              handleClickVideoEdit();
            } else {
              handleClickVideo();
            }
          }}
        >
          <FormSelect
            required={!post && true}
            inputs={groups}
            //   name={t("Save modifications")}
            setFormValues={setSelectedValue}
            post={post}
          />

          <div className="formAddContent ">
            <div className="d-block my-3" style={{ textAlign: "end" }}>
              <button disabled={loading} className="modelbtn">
                {t("Add")}
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ModalAddOneCourse;

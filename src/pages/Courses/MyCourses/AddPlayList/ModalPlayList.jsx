import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import Modal from "@mui/material/Modal";
import Picture from "../../../../assets/images/Picture.png";
import close1 from "../../../../assets/images/x.png";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { Form, Modal } from "../../../../components/ui";
import { toast } from "react-toastify";
import Select from "react-select";

import {
  refrechPosts,
  refrechPostsContact,
  refrechPostsJob,
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

function ModalPlayList({ post, setModalOpened, modalOpened, type }) {
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
      state: "name",
      value: data?.name,
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
      label: t("UploadFile"),
      name: t("Picture for the Playlist"),
      requird: true,
      type: "file",
      buttonText: t("image"),
      state: "image",
    },
  ];
  const [loading, setLoading] = useState("");

  const [selectedValue, setSelectedValue] = useState({});
  let api = post ? `playlist/${post?.id}/update` : `playlist`;
  const dispatch = useDispatch();
  const [skills, setSkills] = useState([]);
  const handleClick = async (e) => {
    setLoading(true);

    e.preventDefault();
    setModalOpened(false);

    const data = { ...selectedValue, categor_id };

    const formData = new FormData();

    for (const key in selectedValue) {
      formData.append(key, selectedValue[key]);
    }

    // formData.append("privacy", privacy);

    const fileId = Date.now();
    dispatch(addUpload({ fileId }));
    try {
      const res = await axios.post(
        `${URL}/api/${api}`,
        formData,

        {
          headers: {
            Accept: "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            dispatch(setPercentage({ fileId, progress }));
          },
        }
      );
      setModalOpened(false);

      if (res.data) {
        dispatch(refrechPostsMyCourse(res.data));
        dispatch(finishUpload({ fileId }));
        // setIsFormsOpen(false);
        toast.success("تم نشر المنشور");
        setLoading(false);
      }
    } catch (err) {
      dispatch(finishUpload({ fileId }));
      toast.error(t(err?.response?.data?.error));
      setModalOpened(false);
      setLoading(false);

      // setIsFormsOpen(false);
    }
  };

  return (
    <div className="addContents">
      <Modal
        isOpen={modalOpened}
        closeModal={closeModal}
        title={t("Add Playlist")}
      >
        <form className=" " onSubmit={handleClick}>
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

export default ModalPlayList;

import "./AddContents.scss";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import Modal from "@mui/material/Modal";
import Picture from "../../../../assets/images/Picture.png";
import close1 from "../../../../assets/images/x.png";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { Form, Modal } from "../../../../components/ui";
import { toast } from "react-toastify";
import { refrechPosts } from "../../../../rtk/slices/authSlice";
import {
  addUpload,
  finishUpload,
  setPercentage,
} from "../../../../rtk/slices/progressSlice";
import FormSelect from "../../../../components/formSelect/FormSelect";
import axios from "axios";
import SelectCategory from "../../../../components/ui/SelectCategory/SelectCategory";
import { useDispatch, useSelector } from "react-redux";
import ModalContent from "./ModalContent";

function AddContents({ post }) {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [categor_id, setcategor_id] = useState(post?.category_id);
  const { token, user } = useSelector((state) => state.auth);

  const [modalOpened, setModalOpened] = useState(false);
  const [t] = useTranslation();
  const [myfile, setmyFile] = useState("");
  const [showFile, setShowFile] = useState();

  function closeModal() {
    setModalOpened(false);
  }

  function openModal() {
    setModalOpened(true);
  }

  const [selectedValue, setSelectedValue] = useState({});
  let api = post ? `update/${post.id}` : `content-create`;
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    setModalOpened(false);

    const data = { ...selectedValue, categor_id };
    // data.append("privacy", privacy);
    // data.append("category_id", categor_id);
    const formData = new FormData();

    for (const key in selectedValue) {
      formData.append(key, selectedValue[key]);
    }
    // formData.append("privacy", privacy);
    formData.append("file", selectedValue.file);
    formData.append("category_id", categor_id);

    // setIsFormsOpen(false);

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
        dispatch(refrechPostsContact(res.data.data));
        dispatch(finishUpload({ fileId }));
        // setIsFormsOpen(false);
        toast.success("تم نشر المنشور");
      }
    } catch (err) {
      dispatch(finishUpload({ fileId }));
      toast.error(t("A network error occurred"));
      setModalOpened(false);

      // setIsFormsOpen(false);
    }
  };
  return (
    <div className="addContents">
      <div className="add bg-blue-50 pb-5" onClick={openModal}>
        <p>
          <img src={`${URL}/storage/${user?.profile?.image}`} alt="" />
          {t("Request individual service")} {user?.first_name}
        </p>

        {/* <div>
          <button className="card  mb-3">{t("post")}</button>
        </div> */}
      </div>

      <ModalContent setModalOpened={setModalOpened} modalOpened={modalOpened} />
    </div>
  );
}

export default AddContents;

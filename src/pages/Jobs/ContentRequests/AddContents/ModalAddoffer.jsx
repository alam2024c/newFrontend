import { useState } from "react";
import { useTranslation } from "react-i18next";
// import Modal from "@mui/material/Modal";

import { Form, Modal } from "../../../../components/ui";
import { toast } from "react-toastify";
import {
  refrechPosts,
  refrechPostsOffer,
} from "../../../../rtk/slices/authSlice";
import {
  addUpload,
  finishUpload,
  setPercentage,
} from "../../../../rtk/slices/progressSlice";
import FormSelect from "../../../../components/formSelect/FormSelect";
import axios from "axios";
import SelectCategory from "../../../../components/ui/SelectCategory/SelectCategory";
import { useDispatch, useSelector } from "react-redux";

function ModalAddoffer({
  setrefreach,
  refreach,
  post,
  setModalOpened,
  modalOpened,
  type,
  content_id,
}) {
  console.log(post);
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [categor_id, setcategor_id] = useState(post?.category_id);
  const { token, user } = useSelector((state) => state.auth);

  //   const [modalOpened, setModalOpened] = useState(false);
  const [t] = useTranslation();
  const [myfile, setmyFile] = useState("");
  const [loading, setLoading] = useState();

  function closeModal() {
    setModalOpened(false);
  }

  //   function openModal() {
  //     setModalOpened(true);
  //   }

  const groups = [
    {
      label: t("Address"),
      name: t("Price"),
      type: "number",
      placeholder: t("value"),
      state: "value",
    },

    {
      label: t("Description"),
      name: t("Description"),
      label: t("name"),
      type: "textarea",
      placeholder: t("Description"),
      state: "details",
    },
    // {
    //   label: t("dues"),
    //   name: t("dues"),
    //   type: "number",
    //   placeholder: t("dues"),
    //   state: "dues",
    // },
    {
      label: t("Duration"),
      name: t("Duration (Day)"),
      type: "number",
      placeholder: t("term"),
      state: "term",
    },
    // {
    //   label: t("uploadPhoto"),
    //   name: t("uploadPhoto"),
    //   type: "file",
    //   buttonText: t("Draganddroporclicktoreplace"),
    // },
  ];

  const [selectedValue, setSelectedValue] = useState({});
  let api = post ? `offer-update/${post.id}` : `offer-create`;
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    setModalOpened(false);

    const data = { ...selectedValue, categor_id };
    // console.log(privacy, "privacy", categor_id, "=>cat");
    // data.append("privacy", privacy);
    // data.append("category_id", categor_id);
    const formData = new FormData();

    for (const key in selectedValue) {
      formData.append(key, selectedValue[key]);
    }
    // formData.append("privacy", privacy);
    formData.append("content_id", content_id);
    formData.append("category_id", categor_id);
    // console.log(selectedCategory);
    setLoading(true);
    console.log(data);
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
      setLoading(false);

      console.log(res, "res");
      if (res.data) {
        console.log(res.data);
        dispatch(refrechPostsOffer(res.data.data));
        dispatch(finishUpload({ fileId }));
        toast.success("تم نشر المنشور");
      }
      if (refreach) {
        setrefreach(!refreach);
      }
    } catch (err) {
      console.log(err);
      dispatch(finishUpload({ fileId }));
      toast.error(t("View has been added before"));
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
        title={t("Add Your Offer")}
      >
        <form className=" " onSubmit={handleClick}>
          <FormSelect
            inputs={groups}
            //   name={t("Save modifications")}
            setFormValues={setSelectedValue}
            post={post}
          />

          <div className="formAddContent">
            <div className="d-block mb-3" style={{ textAlign: "end" }}>
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

export default ModalAddoffer;

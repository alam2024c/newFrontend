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
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [categor_id, setcategor_id] = useState(post?.category_id);
  const { token, user } = useSelector((state) => state.auth);

  //   const [modalOpened, setModalOpened] = useState(false);
  const [t] = useTranslation();
  const [myfile, setmyFile] = useState("");
  const [showFile, setShowFile] = useState();

  function closeModal() {
    setModalOpened(false);
  }

  //   function openModal() {
  //     setModalOpened(true);
  //   }

  const groups = [
    {
      label: t("Address"),
      name: t("value"),
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
      name: t("Duration"),
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
    // data.append("privacy", privacy);
    // data.append("category_id", categor_id);
    const formData = new FormData();

    for (const key in selectedValue) {
      formData.append(key, selectedValue[key]);
    }
    // formData.append("privacy", privacy);
    formData.append("content_id", content_id);
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
        dispatch(refrechPostsOffer(res.data.data));
        dispatch(finishUpload({ fileId }));
        // setIsFormsOpen(false);
        toast.success("تم نشر المنشور");
      }
      if (refreach) {
        setrefreach(!refreach);
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
      <Modal
        isOpen={modalOpened}
        closeModal={closeModal}
        title={t("Add Your Offer")}
      >
        <form className=" " onSubmit={handleClick}>
          {/* <form className="formAddContent "> */}
          {/* <div className="modalhead">
            <h1 style={{ color: "#fff" }}>Add Content</h1>
            <img
              src={close1}
              onClick={() => setModalOpened(false)}
              alt="Close"
            />
          </div> */}

          <FormSelect
            inputs={groups}
            //   name={t("Save modifications")}
            setFormValues={setSelectedValue}
            post={post}
          />
          {/* {groups.map((group, index) => (
            <div className="group" key={index}>
              <label className="font-bold text-gray-900 text-xs mt-1">
                {group.label}
              </label>
              {group.type === "select" ? (
                <select>
                  {group.options.map((option, optionIndex) => (
                    <option key={optionIndex}>{option}</option>
                  ))}
                </select>
              ) : group.type === "textarea" ? (
                <textarea type="text" placeholder={group.placeholder} />
              ) : group.type === "file" ? (
                myfile ? (
                  <div className="col-lg-12 mb-3">
                    <div className="form-group">
                      <label
                        htmlFor={`file-${index}`}
                        className="mont-font fw-600 font-xsss input-with-icon w-100"
                      >
                        <AiOutlineCloudDownload
                          className="ti-cloud-up ri-cloud-download-line input-icon"
                          style={{ fontSize: "20px" }}
                        />
                        <input
                          htmlFor={`file-${index}`}
                          style={{ width: "100%" }}
                          className="form-control"
                          disabled
                        />
                      </label>

                      <input
                        id={`file-${index}`}
                        style={{ paddingLeft: "0", display: "none" }}
                        type="file"
                        name="file[]"
                        required
                        multiple
                        className="input-file"
                        // accept=".png, .jpeg, .jpg"
                      />
                    </div>

                    <div className="w-100 m-auto h-100 position-relative">
                      <div className="w-100 h-75  m-auto mb-3  position-relative d-flex align-items-center flex-wrap justify-content-center gap-3">
                        {showFile?.map((e, index) => (
                          <h4 key={index}>{e.name}</h4>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="form-group mb-0 w-full">
                    <div className="form-group">
                      <label
                        htmlFor={`file-${index}`}
                        className="mont-font fw-600 font-xsss input-with-icon w-100"
                      >
                        <AiOutlineCloudDownload
                          className="ti-cloud-up ri-cloud-download-line input-icon"
                          style={{ fontSize: "20px" }}
                        />
                        <input
                          htmlFor={`file-${index}`}
                          style={{ width: "100%" }}
                          className="form-control"
                          disabled
                        />
                      </label>

                      <input
                        id={`file-${index}`}
                        style={{ paddingLeft: "0", display: "none" }}
                        type="file"
                        name="file[]"
                        required
                        multiple
                        onChange={(e) => {
                          setmyFile(e.target.files);
                          setShowFile([...e.target.files]);
                        }}
                        className="input-file"
                        // accept=".png, .jpeg, .jpg"
                      />
                    </div>
                  </div>
                )
              ) : (
                <input type={group.type} placeholder={group.placeholder} />
              )}
            </div>
          ))} */}
          <div className="formAddContent">
            <div className="d-block mb-3" style={{ textAlign: "end" }}>
              <button className="modelbtn">{t("Add")}</button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ModalAddoffer;

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
} from "../../../../rtk/slices/authSlice";
import {
  addUpload,
  finishUpload,
  setPercentage,
} from "../../../../rtk/slices/progressSlice";
import FormSelect from "../../../../components/formSelect/FormSelect";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function ModalContent({ post, setModalOpened, modalOpened, type }) {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [categor_id, setcategor_id] = useState(post?.category_id);
  const { token, user } = useSelector((state) => state.auth);

  //   const [modalOpened, setModalOpened] = useState(false);
  const [t, i18n] = useTranslation();

  function closeModal() {
    setModalOpened(false);
  }

  const groups = [
    {
      label: t("Address"),
      name: t("Address"),
      type: "text",
      placeholder: t("Address"),
      state: "title",
    },

    {
      label: t("Description"),
      name: t("Description"),
      label: t("name"),
      type: "textarea",
      placeholder: t("Description"),
      state: "details",
    },
    {
      label: t("Budget"),
      name: t("Budget"),
      type: "select",
      select: [
        "0$",
        "1$ - 50$",
        "100$ - 150$",
        "150$ - 200$",
        "200$ - 250$",
        "250$ - 300$",
        "300$ - 350$",
        "350$ - 400$",
        "400$ - 450$",
        "450$ - 500$",
        "500$ - 750$",
        "750$ - 1000$",
      ],
      placeholder: t("Budget"),
      state: "dudget",
    },
    {
      label: t("DeliveryTerm"),
      name: t("DeliveryTerm"),
      type: "number",
      placeholder: t("DeliveryTerm"),
      state: "time",
    },
    // {
    //   label: t("uploadPhoto"),
    //   name: t("uploadPhoto"),
    //   type: "file",
    //   buttonText: t("Draganddroporclicktoreplace"),
    // },
    {
      label: t("UploadFile"),
      name: t("UploadFile"),
      type: "file",
      buttonText: t("Draganddroporclicktoreplace"),
      state: "file",
    },
  ];

  const [jobs, setJobs] = useState([]);
  const [tools, settools] = useState([]);
  const [cities, setcities] = useState([]);
  const [city, setcity] = useState([]);
  const [county, setCounty] = useState("");
  const [loading, setLoading] = useState("");
  const getDataJobs = async () => {
    try {
      const res = await axios.get(`${URL}/api/post/get_job_category`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept-Language": i18n.language,
        },
      });
      setJobs(res.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const getDataTools = async () => {
    try {
      const res = await axios.get(`${URL}/api/content-get-tool`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept-Language": i18n.language,
        },
      });
      settools(res.data.data);
    } catch (err) {}
  };

  const getDataCity = async (e) => {
    try {
      const res = await axios.get(`${URL}/api/content-get-type/${e}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept-Language": i18n.language,
        },
      });
      setcities(res.data.data);
    } catch (err) {}
  };
  useEffect(() => {
    getDataJobs();
    getDataTools();
  }, []);

  const [selectedValue, setSelectedValue] = useState({});
  const [error, setError] = useState({});
  let api = post ? `content-update/${post.id}` : `content-create`;
  const dispatch = useDispatch();
  const [skills, setSkills] = useState(post?.skills || []);
  const handleClick = async (e) => {
    e.preventDefault();
    // setModalOpened(false);
    setLoading(true);

    const data = { ...selectedValue, categor_id };
    // data.append("privacy", privacy);
    // data.append("category_id", categor_id);
    const formData = new FormData();

    for (const key in selectedValue) {
      formData.append(key, selectedValue[key]);
    }

    // formData.append("privacy", privacy);
    if (selectedValue.file) {
      formData.append("file", selectedValue.file);
    }

    formData.append("category_id", county);
    formData.append("service", city);
    for (let i = 0; i < skills.length; i++) {
      formData.append("skills[]", skills[i]?.label);
    }

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
      setModalOpened(false);
      setLoading(false);
      setError({});

      if (res.data) {
        dispatch(refrechPostsContact(res.data.data));
        dispatch(finishUpload({ fileId }));
        // setIsFormsOpen(false);
        toast.success("تم نشر المنشور");
      }
    } catch (err) {
      dispatch(finishUpload({ fileId }));
      setError(err?.response?.data?.data);
      // toast.error(t("A network error occurred"));
      // setModalOpened(false);
      setLoading(false);

      // setIsFormsOpen(false);
    }
  };
  const handleChange = (selectedOptions) => {
    // في هذه الدالة يتم التعامل مع التغيير في القيم المحددة
    setSkills(selectedOptions);
  };
  return (
    <div className="addContents">
      <Modal
        isOpen={modalOpened}
        closeModal={closeModal}
        // title={t("Add Content")}
        title={t("Request Service as individual")}
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
          {/* <SelectCategoryJob
            className="w-full rounded-lg capitalize"
            // selectLabels={items}
            selectName="category"
            preSelect={post?.name ? post?.name : "Select Category"}
            handleSelectChange={(value) => {
              setcategor_id(value);
            }}
            // preSelect={true}
          /> */}
          <FormSelect
            inputs={groups}
            error={error}
            //   name={t("Save modifications")}
            setFormValues={setSelectedValue}
            post={post}
          />
          <div className="inputSelect__All">
            <div className={`input__select`}>
              <label>{t("Service type?")}</label>
              <select
                onChange={(e) => {
                  getDataCity(e.target.value);
                  setCounty(e.target.value);
                }}
              >
                <option value=""> {t("Select")}</option>{" "}
                {jobs?.map((o, i) => (
                  <option key={i} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </select>
              {error?.category_id?.map((errorMsg, index) => (
                <span className="text-danger ">{errorMsg}</span>
              ))}
            </div>
            <div className={`input__select`}>
            {/* Change by Abdallah */}
              <label>{t("Service?")}</label>
              <select
                onChange={(e) => {
                  // getDataCity(e.target.value);
                  setcity(e.target.value);
                }}
              >
                <option value=""> {t("Select")}</option>{" "}
                {cities?.map((o, i) => (
                  <option key={i} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </select>
              {/* Change by Abdallah */}
              {error?.Service?.map((errorMsg, index) => (
                <span className="text-danger ">{errorMsg}</span>
              ))}
            </div>
          </div>
          {/* Change by Abdallah */}
          <label>{t("Required Skills")}</label>

          <Select
            onChange={handleChange}
            isMulti
            name="lable"
            placeholder={t("Select")}
            options={tools}
            getOptionLabel={(option) => option.label}
            className="basic-multi-select"
            classNamePrefix="select"
            defaultValue={post?.skills}
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

export default ModalContent;

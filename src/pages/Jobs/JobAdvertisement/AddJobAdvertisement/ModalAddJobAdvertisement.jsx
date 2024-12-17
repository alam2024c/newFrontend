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
  refrechPostsContact,
  refrechPostsJobAdvertisement,
} from "../../../../rtk/slices/authSlice";
import {
  addUpload,
  finishUpload,
  setPercentage,
} from "../../../../rtk/slices/progressSlice";
import FormSelect from "../../../../components/formSelect/FormSelect";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function ModalAddJobAdvertisement({ post, setModalOpened, modalOpened, type }) {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [categor_id, setcategor_id] = useState(post?.category_id);
  const { token, user } = useSelector((state) => state.auth);

  //   const [modalOpened, setModalOpened] = useState(false);
  const [t, i18n] = useTranslation();
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
      label: t("Company"),
      name: t("Company"),
      type: "text",
      placeholder: t("Company"),
      state: "company",
    },
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
      label: t("DeliveryTerm"),
      name: t("DeliveryTerm"),
      type: "number",
      placeholder: t("DeliveryTerm"),
      state: "time",
    },

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
  const [error, setError] = useState("");
  const getDataJobs = async () => {
    try {
      const res = await axios.get(`${URL}/api/post/get_job_category`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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
  let api = post ? `job-update/${post.id}` : `job-create`;
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

      if (res.data) {
        dispatch(refrechPostsJobAdvertisement(res.data.data));
        dispatch(finishUpload({ fileId }));
        // setIsFormsOpen(false);
        toast.success("تم نشر المنشور");
      }
      setError({});
    } catch (err) {
      dispatch(finishUpload({ fileId }));
      // toast.error(t("A network error occurred"));
      // setModalOpened(false);
      setLoading(false);
      setError(err.response?.data?.data);

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
        title={t("Request Service as company")}
      >
        <form className=" " onSubmit={handleClick}>
          <FormSelect
            error={error}
            inputs={groups}
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
            </div>
          </div>
          {/* Change by Abdallah */}
          <label>{t("Required Skills")}</label>

          <Select
            onChange={handleChange}
            isMulti
            name="lable"
            options={tools}
            getOptionLabel={(option) => option.label}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder={t("Select")}
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

export default ModalAddJobAdvertisement;

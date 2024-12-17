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
import SelectCategoryJob from "../../../../components/ui/SelectCategory/SelectCategoryJob";

function ModalContent({ post, setModalOpened, modalOpened, type }) {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [categor_id, setcategor_id] = useState(post?.category_id);
  const { token, user } = useSelector((state) => state.auth);
  const [t, i18n] = useTranslation();
  const [myfile, setmyFile] = useState("");
  const [showFile, setShowFile] = useState();

  function closeModal() {
    setModalOpened(false);
  }

  //   function openModal() {
  //     setModalOpened(true);
  //   }

  const [jobs, setJobs] = useState([]);
  const [data, setData] = useState("");
  const [tools, settools] = useState([]);
  const [cities, setcities] = useState([]);
  const [city, setcity] = useState([]);
  const [county, setCounty] = useState("");
  const [job_title, setjob_title] = useState(data?.job_title);
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
    } catch (err) {}
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
  const getDataCvUser = async () => {
    try {
      const res = await axios.get(`${URL}/api/cv-show/${user?.user_name}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.data);
      setjob_title(res.data.data.job_title);
    } catch (err) {}
  };

  useEffect(() => {
    getDataJobs();
    getDataTools();
    getDataCvUser();
  }, []);
  const groups = [
    {
      label: t("age"),
      name: t("Age"),
      type: "number",
      placeholder: t("age"),
      state: "age",
      value: data?.age,
    },

    {
      label: t("about_me"),
      name: t("About me"),
      type: "textarea",
      placeholder: t("about_me"),
      state: "about_me",
      value: data?.about_me,
    },

    {
      label: t("UploadFile"),
      name: t("رفع ملف مثل بيان شخصي او سيرة"),
      requird: true,
      type: "file",
      buttonText: t("Draganddroporclicktoreplace"),
      state: "file",
    },
  ];
  const [loading, setLoading] = useState("");

  const [selectedValue, setSelectedValue] = useState({});
  let api = data ? `cv-update` : `cv-create`;
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
    if (selectedValue.file) {
      formData.append("file", selectedValue.file);
    }
    // formData.append("category_id", county);
    formData.append("job_title", job_title);
    for (let i = 0; i < skills.length; i++) {
      formData.append("skills[]", skills[i].label);
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
      getDataCvUser();

      if (res.data) {
        dispatch(refrechPostsJob(res.data.data));
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
  const handleChange = (selectedOptions) => {
    // في هذه الدالة يتم التعامل مع التغيير في القيم المحددة
    setSkills(selectedOptions);
  };
  return (
    <div className="addContents">
      <Modal isOpen={modalOpened} closeModal={closeModal} title={t("Add Cv")}>
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
          <div className="inputSelect__All mb-3">
            <div className={`input__select`}>
              <label>{t("Job title")}</label>
              <select
                onChange={(e) => {
                  setjob_title(e.target.value);
                }}
                value={job_title}
              >
                <option value=""> {t("Select")}</option>{" "}
                {jobs?.map((o, i) => (
                  <option key={i} value={o.name}>
                    {o.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <FormSelect
            required={!post && true}
            inputs={groups}
            //   name={t("Save modifications")}
            setFormValues={setSelectedValue}
            post={post}
          />
             {/* Change by Abdallah */} 
          <label>{t("Required Skills")}</label>

          <Select
            onChange={handleChange}
            isMulti
            placeholder={t("Select")}
            name="lable"
            options={tools}
            getOptionLabel={(option) => option.label}
            className="basic-multi-select"
            classNamePrefix="select"
            defaultValue={data?.skills} // تحديد القيم الافتراضية إن كانت مطلوبة
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

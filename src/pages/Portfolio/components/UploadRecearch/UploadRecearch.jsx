import { t } from "i18next";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { close } from "../../../../assets/images/icons";
import { useTranslation } from "react-i18next";

import Button from "../../../../components/ui/button/Button";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { Modal, Textarea } from "../../../../components/ui";
import FormSelect from "../../../../components/formSelect/FormSelect";

import fileicon from "../../../../assets/images/fileicon.png";

import avatar from "../../../../assets/images/avatar.png";

import { IoAdd } from "react-icons/io5";
const SkillsComponent = ({
  items,
  setChange,
  change,
  setIsShareOpen,
  setskillEdit,
  all,
  setreturn_metion,
  setMention,
  setText,
}) => {
  const URL_API = import.meta.env.VITE_REACT_APP_API_KEY;
  const { token, user } = useSelector((state) => state.auth);
  // const [isShareOpen, setIsShareOpen] = useState(false);
  // Render the skills component
  const handleDelete = async (e) => {
    try {
      const res = await axios.get(
        `${URL_API}/api/research-destroy/${e}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setChange(!change);

      if (res.status == 201) {
        setChange(!change);
        toast.success(t("Deleted"));
      }
    } catch (err) {
      setLoading(false);

      setIsShareOpen(false);
      setPhoto("");
    }
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const params = useParams().id;
  const navigate = useNavigate();
  return (
    <>
      {/* <Researches data={items} /> */}
      {all ? (
        <>
          {items?.researchs.map((e, index) => (
            <>
              <div className=" resume d-flex justify-content-between mb-2">
                <div
                  className="p-2 md:p-4 w-100"
                  style={{ color: "#303030" }}
                  key={index}
                >
                  <div
                    className="d-flex justify-content-between p-2 md:p-4 w-100"
                    // className="p-2 md:p-4 w-100"
                    style={{ color: "#303030" }}
                    key={index}
                  >
                    <div className="fw-700 fs-3 ">{e?.title}</div>
                    <div className="d-flex align-items-center gap-3">
                      {user?.user_name === params && (
                        <>
                          <AiOutlineEdit
                            style={{ color: "#7CC9D1" }}
                            className="font-xxl"
                            onClick={() => {
                              localStorage.setItem("currentPage", "CV");
                              setskillEdit(e);
                              setreturn_metion(e?.return);
                              setText(e?.authors);
                              setMention(e?.mention);
                              setIsShareOpen(true);
                            }}
                          />{" "}
                          <img
                            src={close}
                            alt=""
                            onClick={() => {
                              Swal.fire({
                                title: t("Do you want to delete ?"),
                                // text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: t("Yes"),
                                cancelButtonText: t("No"),
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  handleDelete(e.id);
                                }
                              });
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <div className="d-flex justify-content-xxl-between flex-wrap">
                    <div>
                      <p className="mb-3 d-flex align-items-center gap-2">
                        {t("journal name")} : {e?.journal_name}
                      </p>
                      <p className="mb-3">
                        {t("year")} : {e?.year}{" "}
                        <span style={{ color: "#0077B5" }}> </span>
                      </p>

                      <p className="mb-3 d-flex align-items-center gap-2">
                        {t("references")} : {e?.references}
                      </p>
                      <p className="mb-3 d-flex align-items-center gap-2">
                        {" "}
                        {t(
                          "The most important results (Arabic language preferred)"
                        )}{" "}
                        : {e?.volume_number}
                      </p>

                      <p className="mb-3 d-flex align-items-center gap-2">
                        {t("Research summary (preferably Arabic)”")} :{" "}
                        {e?.pages_number}
                      </p>
                    </div>

                    <a href={`${URL_API}/storage/${e.file}`} target="_blank">
                      <img
                        style={{ cursor: "pointer" }}
                        src={fileicon}
                        alt=""
                        onClick={handleOpen}
                      />
                    </a>
                  </div>
                  <div className="contentRequest d-flex flex-wrap">
                    <div className="add" style={{ border: "none" }}>
                      <p
                        style={{
                          color: "#25324B",
                          fontSize: "15px",
                          fontWeight: "500",
                        }}
                      >
                        {e?.doi_number_or_url}
                        {/* {e?.user_authors?.map((author) => (
                          <div
                            className={
                              author?.img
                                ? "d-flex align-items-center gap-2 cursor-pointer "
                                : "d-flex align-items-center gap-2  "
                            }
                            onClick={() => {
                              if (author?.img) {
                                navigate(`/profile/${author?.user_name}`);
                              }
                            }}
                          >
                            {author?.img && (
                              <img
                                src={author?.img}
                                alt=""
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "50%",
                                }}
                              />
                            )}

                            {author?.user_name}
                          </div>
                        ))} */}
                      </p>
                    </div>
                    {/* <div className="add" style={{ border: "none" }}>
                <p
                  style={{
                    color: "#25324B",
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  <img src={avatar} alt="" />
                  {t("Dr. Mahmoud ")}
                </p>
              </div> */}
                  </div>
                </div>
              </div>
            </>
          ))}
        </>
      ) : (
        <>
          {items?.researchs.slice(0, 0).map((e, index) => (
            <>
              <div className="d-flex justify-content-between">
                <div
                  className="p-2 md:p-4 w-100"
                  style={{ color: "#303030" }}
                  key={index}
                >
                  <div
                    className="d-flex justify-content-between p-2 md:p-4 w-100"
                    // className="p-2 md:p-4 w-100"
                    style={{ color: "#303030" }}
                    key={index}
                  >
                    <h1 className="fw-700 ">{e?.title}</h1>
                    <div className="d-flex align-items-center gap-3">
                      <AiOutlineEdit
                        style={{ color: "#7CC9D1" }}
                        className="font-xxl"
                        onClick={() => {
                          localStorage.setItem("currentPage", "CV");
                          setskillEdit(e);
                          setIsShareOpen(true);
                        }}
                      />{" "}
                      <img
                        src={close}
                        alt=""
                        onClick={() => {
                          Swal.fire({
                            title: t("Do you want to delete ?"),
                            // text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: t("Yes"),
                            cancelButtonText: t("No"),
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleDelete(e.id);
                            }
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-xxl-between flex-wrap">
                    <div>
                      <p className="mb-3">
                        {" "}
                        Jun 2022{" "}
                        <span style={{ color: "#0077B5" }}>1 yrs 02 mos </span>
                      </p>

                      <p className="mb-3">{e?.journal_name}</p>
                    </div>

                    <img
                      style={{ cursor: "pointer" }}
                      src={fileicon}
                      alt=""
                      onClick={handleOpen}
                    />
                  </div>
                  <div className="contentRequest d-flex flex-wrap">
                    <div className="add" style={{ border: "none" }}>
                      <p
                        style={{
                          color: "#25324B",
                          fontSize: "15px",
                          fontWeight: "500",
                        }}
                      >
                        <img src={avatar} alt="" />
                        {e?.authors}
                      </p>
                    </div>
                    {/* <div className="add" style={{ border: "none" }}>
                <p
                  style={{
                    color: "#25324B",
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  <img src={avatar} alt="" />
                  {t("Dr. Mahmoud ")}
                </p>
              </div> */}
                  </div>
                </div>
              </div>
            </>
          ))}
          <div className="resume" style={{ color: "#303030" }}>
            <div
              className="Skills"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/profile/research/${items?.user_name}`);
                localStorage.setItem("currentPage", "Profile");
              }}
            >
              <span> &rarr; </span>
              {t("Show all")} {t("Researches")}
            </div>
          </div>
        </>
      )}
      {/* <ul>
        {items?.researchs?.map((e, index) => (
          <>
            <li
              className="my-3 d-flex align-items-center justify-content-between"
              key={index}
            >
              <span>{e.name}</span>
              <div className="d-flex align-items-center gap-3">
                <AiOutlineEdit
                  style={{ color: "#7CC9D1" }}
                  className="font-xxl"
                  onClick={() => {
                    localStorage.setItem("currentPage", "CV");
                    setskillEdit(e);
                    setIsShareOpen(true);
                  }}
                />{" "}
                <img
                  src={close}
                  alt=""
                  onClick={() => {
                    Swal.fire({
                      title: t("Do you want to delete ?" ),
                      // text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: t("Yes"),
                      cancelButtonText: t("No"),
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDelete(e.id);
                      }
                    });
                  }}
                />
              </div>
            </li>
            <hr />
          </>
        ))}
      </ul> */}
      {/* <div
        className="Skills"
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/skillesInfo");
          localStorage.setItem("currentPage", "Skilles");
        }}
      >
        <span> &rarr; </span>
        {t("Show all")} {t("Skills")}
      </div> */}
    </>
  );
};

function UploadRecearch({ setChange, change, items, all }) {
  const navigate = useNavigate();
  const URL_API = import.meta.env.VITE_REACT_APP_API_KEY;
  const [formValues, setFormValues] = useState({});
  const { token, user } = useSelector((state) => state.auth);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [skillEdit, setskillEdit] = useState(false);

  const [t] = useTranslation();
  const inputsSelect = [
    {
      name: t("title"),
      type: "text",
      class: "",
      value: skillEdit?.title,
      state: "title",
    },
    {
      name: t("journal name"),
      type: "text",
      class: "",
      value: skillEdit?.journal_name,
      state: "journal_name",
    },
    {
      name: t("year"),
      type: "number",
      class: "",
      value: skillEdit?.year,
      state: "year",
    },
    {
      name: t("The most important results (Arabic language preferred)"),
      type: "textarea",
      class: "",
      value: skillEdit?.volume_number,
      state: "volume_number",
    },
    {
      name: t("Research summary (preferably Arabic)”"),
      type: "textarea",
      class: "",
      value: skillEdit?.pages_number,
      state: "pages_number",
    },
    {
      name: t("Authors"),
      type: "text",
      class: "",
      value: skillEdit?.doi_number_or_url,
      state: "doi_number_or_url",
    },

    {
      name: t("references"),
      type: "text",
      class: "",
      value: skillEdit?.references,
      state: "references",
    },
  ];

  const [photo, setPhoto] = useState("");
  // const [isShareOpen, setIsShareOpen] = useState(false);
  const [file, setfile] = useState("");
  const [video, setVideo] = useState("");
  const [text, setText] = useState(skillEdit?.authors);
  const [return_metion, setreturn_metion] = useState(skillEdit?.return);
  const [mention, setMention] = useState(skillEdit?.mention || []);
  const [loading, setLoading] = useState("");
  const [errorForm, setErrorForm] = useState("");

  const handleCreate = async (e) => {
    // setIsShareOpen(false);

    setLoading(true);
    const data = { ...formValues, category_id: 1 };
    if (file) {
      data.file = file;
    }
    const formData = new FormData();

    // إضافة القيم من formValues إلى FormData
    Object.keys(formValues).forEach((key) => {
      formData.append(key, formValues[key]);
    });

    // إذا كان هناك ملف، ضعه في FormData
    if (file) {
      formData.append("file", file);
    }
    formData.append("category_id", 1);
    formData.append("authors", text);
    formData.append("return", return_metion);
    for (let i = 0; i < mention.length; i++) {
      formData.append("mention[]", mention[i].display);
    }
    try {
      const res = await axios.post(`${URL_API}/api/research-create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setErrorForm({});

      if (res.status == 201) {
        setChange(!change);
        toast.success(t("Add Successfully"));
        setIsShareOpen(false);
        setVideo("");
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setErrorForm(err?.response?.data?.data);

      // setIsShareOpen(false);
      setPhoto("");
    }
  };
  const handleUpdate = async (e) => {
    // setIsShareOpen(false);

    setLoading(true);
    const data = { ...formValues, category_id: 1 };
    if (file) {
      data.file = file;
    }
    const formData = new FormData();

    // إضافة القيم من formValues إلى FormData
    Object.keys(formValues).forEach((key) => {
      formData.append(key, formValues[key]);
    });

    // إذا كان هناك ملف، ضعه في FormData
    if (file) {
      formData.append("file", file);
    }

    formData.append("category_id", 1);
    formData.append("authors", text);
    formData.append("return", return_metion);
    for (let i = 0; i < mention.length; i++) {
      formData.append("mention[]", mention[i].display);
    }
    setLoading(true);

    try {
      const res = await axios.post(
        `${URL_API}/api/research-update/${skillEdit?.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            "Accept-Language": i18n.language,
          },
        }
      );
      if (res.status == 200) {
        setChange(!change);
        toast.success(t("Add Successfully"));
        setIsShareOpen(false);
        setVideo("");
        setLoading(false);
        setFormValues({});
        setskillEdit({});
      }
    } catch (err) {
      setLoading(false);

      setIsShareOpen(false);
      setPhoto("");
    }
  };

  const params = useParams().id;

  return (
    <>
      <div className="resume">
        <p className="d-flex justify-content-xxl-between">
          {t("Publications")}
          <div className="d-flex align-items-center gap-3">
            {user?.user_name === params && (
              <IoAdd
                style={{ color: "#7CC9D1" }}
                className="font-xxl"
                onClick={() => {
                  // localStorage.setItem("currentPage", "CV");
                  // navigate("/userCV");
                  setIsShareOpen(true);
                }}
              />
            )}
          </div>
        </p>
      </div>
      {items?.researchs?.length > 0 && (
        <SkillsComponent
          all={all}
          items={items}
          setChange={setChange}
          change={change}
          setIsShareOpen={setIsShareOpen}
          setskillEdit={setskillEdit}
          setreturn_metion={setreturn_metion}
          setText={setText}
          setMention={setMention}
        />
      )}
      <Modal
        hasCloseButton
        closeButtonLeft
        isOpen={isShareOpen}
        closeModal={() => {
          setskillEdit({});
          setIsShareOpen(false);
        }}
        title={t("Reseacrhes")}
        closeIcon={true}
        isFullScreen={true}
      >
        <>
          {video ? (
            <div className="d-flex resume flex-wrap flex-column gap-3 mb-3 text-center justify-content-center">
              {/* <div style={{ position: "relative" }}>
                <img
                  src={close}
                  style={{ position: "absolute", cursor: "pointer" }}
                  onClick={() => setPhoto("")}
                />
                <img
                  src={URL.createObjectURL(photo)}
                  alt=""
                  style={{ width: "150px", height: "150px" }}
                />
              </div> */}
              <div className="d-flex flex-wrap justify-content-center gap-3 mb-2">
                <video width="400" controls style={{ maxHeight: "350px" }}>
                  <source src={URL?.createObjectURL(video)} />
                </video>
              </div>
              {/* <button disabled></button> */}
              <Button
                loading={loading}
                onClick={() => {
                  handleUpdate("profile/uploadVideo");
                }}
              >
                {t("Update")}
              </Button>
            </div>
          ) : (
            <>
              <FormSelect
                error={errorForm}
                inputs={inputsSelect}
                //   name={t("Save modifications")}
                setFormValues={setFormValues}
              />
              <input
                type="file"
                className="w-100 my-3"
                accept=".pdf,.xlsx,.csv,.ppt"
                onChange={(e) => setfile(e.target.files[0])}
              />
              {errorForm?.file?.map((errorMsg, index) => (
                <span className="text-danger mb-4 d-block">{errorMsg}</span>
              ))}
              {skillEdit?.id ? (
                <button
                  disabled={loading}
                  className="btn btn-dark font-weight-bold logbtn"
                  style={{
                    background: "#0099AB",
                    borderRadius: "16px",
                    color: "#fff",
                    width: "250px",
                    maxWidth: "100%",
                    fontSize: "24px",
                    fontWeight: "600",
                    letterSpacing: "1px",
                    border: "none",
                  }}
                  onClick={() => handleUpdate()}
                >
                  {t("Edit")}
                </button>
              ) : (
                <button
                  disabled={loading}
                  className="btn btn-dark font-weight-bold logbtn"
                  style={{
                    background: "#0099AB",
                    borderRadius: "16px",
                    color: "#fff",
                    width: "250px",
                    maxWidth: "100%",
                    fontSize: "24px",
                    fontWeight: "600",
                    letterSpacing: "1px",
                    border: "none",
                  }}
                  onClick={() => handleCreate()}
                >
                  {t("Add")}
                </button>
              )}
              {/* <button
                className="btn btn-dark font-weight-bold logbtn"
                style={{
                  background: "#0099AB",
                  borderRadius: "16px",
                  color: "#fff",
                  width: "250px",
                  maxWidth: "100%",
                  fontSize: "24px",
                  fontWeight: "600",
                  letterSpacing: "1px",
                  border: "none",
                }}
                onClick={() => handleUpdate()}
              >
                {t("Add")}
              </button> */}
            </>
          )}
        </>
      </Modal>
    </>
  );
}

export default UploadRecearch;

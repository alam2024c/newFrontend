import { t } from "i18next";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { cvImg } from "../../../../assets/icons";

import { useDispatch, useSelector } from "react-redux";
import { close } from "../../../../assets/images/icons";
import { useTranslation } from "react-i18next";
import img1 from "../../../../assets/Group (1).png";
import img2 from "../../../../assets/Rectangle 2.2.png";
import Button from "../../../../components/ui/button/Button";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import VideoPlayer from "../../../../components/ui/videoPlayer/VideoPlayer";
import VideoPlayerProfile from "../../../../components/ui/videoPlayer/VideoPlayer";
import { Modal } from "../../../../components/ui";
import FormSelect from "../../../../components/formSelect/FormSelect";
import { IoAdd } from "react-icons/io5";

const SkillsComponent = ({
  items,
  setChange,
  change,
  setIsShareOpen,
  setskillEdit,
}) => {
  const URL_API = import.meta.env.VITE_REACT_APP_API_KEY;
  const [formValues, setFormValues] = useState({});
  const { token, user } = useSelector((state) => state.auth);
  // const [isShareOpen, setIsShareOpen] = useState(false);
  // Render the skills component
  const handleDelete = async (e) => {
    try {
      const res = await axios.get(
        `${URL_API}/api/skills-destroy/${e}`,
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
  const navigate = useNavigate();
  const [all, setAll] = useState(false);
  const params = useParams().id;

  return (
    <div style={{ color: "#303030" }}>
      <ul>
        {all ? (
          <>
            {" "}
            {items?.awards?.map((e, index) => (
              <>
                <li
                  className="my-3 d-flex align-items-center justify-content-between"
                  key={index}
                >
                  <div className="d-flex gap-2">
                    {index % 2 == 0 ? (
                      <img
                        src={img1}
                        alt=""
                        style={{ width: "30px", height: "30px" }}
                      />
                    ) : (
                      <img
                        src={img2}
                        alt=""
                        style={{ width: "30px", height: "30px" }}
                      />
                    )}
                    <div>
                      <div>{e.name}</div>
                      <p
                        className="my-3"
                        style={{
                          fontFamily: "Poppins",
                          fontSize: "14px",
                          fontweight: "400",
                        }}
                      >
                        {e.date}
                      </p>
                      <div>{e.from}</div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    {user?.user_name === params && (
                      <>
                        {" "}
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
                      </>
                    )}
                  </div>
                </li>
              </>
            ))}
            <div style={{ color: "#303030" }}>
              <div
                className="Skills"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setAll(false);
                  // navigate(`/profile/awards/${items?.user_name}`);
                  localStorage.setItem("currentPage", "Profile");
                }}
              >
                <span> &rarr; </span>
                {t("Show less")}
              </div>
            </div>
          </>
        ) : (
          <>
            {" "}
            {items?.awards.slice(0, 1)?.map((e, index) => (
              <>
                <li
                  className="my-3 d-flex align-items-center justify-content-between"
                  key={index}
                >
                  <div className="d-flex gap-2">
                    {index % 2 == 0 ? (
                      <img
                        src={img1}
                        alt=""
                        style={{ width: "30px", height: "30px" }}
                      />
                    ) : (
                      <img
                        src={img2}
                        alt=""
                        style={{ width: "30px", height: "30px" }}
                      />
                    )}
                    <div>
                      <div>{e.name}</div>
                      <p
                        className="my-3"
                        style={{
                          fontFamily: "Poppins",
                          fontSize: "14px",
                          fontweight: "400",
                        }}
                      >
                        {e.date}
                      </p>
                      <div>{e.from}</div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    {user?.user_name === params && (
                      <>
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
                      </>
                    )}
                  </div>
                </li>
              </>
            ))}
            <div style={{ color: "#303030" }}>
              <div
                className="Skills"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setAll(true);
                  // navigate(`/profile/awards/${items?.user_name}`);
                  localStorage.setItem("currentPage", "Profile");
                }}
              >
                <span> &rarr; </span>
                {t("Show all")} {t("Awards")}
              </div>
            </div>
          </>
        )}
      </ul>
    </div>
  );
};

function UploadAwards({ setChange, change, items }) {
  const navigate = useNavigate();
  const URL_API = import.meta.env.VITE_REACT_APP_API_KEY;
  const [formValues, setFormValues] = useState({});
  const { token, user } = useSelector((state) => state.auth);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [skillEdit, setskillEdit] = useState(false);

  const [t] = useTranslation();
  const inputsSelect = [
    {
      name: t("name"),
      type: "text",
      class: "",
      value: skillEdit?.name,
      state: "name",
    },
    {
      name: t("from"),
      type: "text",
      class: "",
      value: skillEdit?.from,
      state: "from",
    },
    {
      name: t("date"),
      type: "date",
      class: "",
      value: skillEdit?.date,
      state: "date",
    },
  ];

  const [photo, setPhoto] = useState("");
  const [errorForm, setErrorForm] = useState("");

  const [video, setVideo] = useState("");

  const [loading, setLoading] = useState("");
  const handleCreate = async (e) => {
    const data = { ...formValues };
    // setIsShareOpen(false);

    setLoading(true);
    try {
      const res = await axios.post(`${URL_API}/api/award-create`, data, {
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
    setIsShareOpen(false);

    setLoading(true);
    const data = {
      ...formValues,
    };

    try {
      const res = await axios.post(
        `${URL_API}/api/award-update/${skillEdit?.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setErrorForm({});
      if (res.status == 201) {
        setChange(!change);
        ` ${t("Awards")} ${t("updated successfully")}`;
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

  const params = useParams().id;
  const [all, setAll] = useState(false);
  return (
    <div className="resume">
      <p className="d-flex justify-content-xxl-between">
        {t("Awards")}
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
      {items?.awards?.length > 0 && (
        <SkillsComponent
          all={all}
          items={items}
          setChange={setChange}
          change={change}
          setIsShareOpen={setIsShareOpen}
          setskillEdit={setskillEdit}
        />
      )}
      {/* <SkillsComponent items={items} /> */}
      {/* {renderSectionComponent(sectionLabel)} */}
      <Modal
        hasCloseButton
        closeButtonLeft
        isOpen={isShareOpen}
        closeModal={() => setIsShareOpen(false)}
        title={t("Awards")}
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
              {skillEdit ? (
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
    </div>
  );
}

export default UploadAwards;

import { t } from "i18next";
import React, { useRef, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { cvImg } from "../../../../assets/icons";
// import ModalProfile from "../modal/ModalProfile";
import { useSelector } from "react-redux";
import { close } from "../../../../assets/images/icons";
import { useTranslation } from "react-i18next";
import Button from "../../../../components/ui/button/Button";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Modal } from "../../../../components/ui";
import { IoAdd } from "react-icons/io5";
import FilesAnother from "../../../../components/Files/FilesAnother";

const CVComponent = ({ items }) => {
  const fileSize = 100;
  const value = 100;
  const URL_API = import.meta.env.VITE_REACT_APP_API_KEY;

  return (
    <a
      className="box-resume"
      target="_blank"
      href={`${URL_API}/storage/${items?.resume}`}
    >
      <FilesAnother data={[items?.resume]} target={items} />
      {/* <div className="cvImg">
        <img src={cvImg} alt="" />
      </div>
      <div>
        <h4>{items?.resume && items.resume}</h4>
        
      </div> */}
    </a>
  );
};

function UploadCv({ setChange, change, items }) {
  const navigate = useNavigate();
  const { user, error, token } = useSelector((state) => state.auth);
  const URL_API = import.meta.env.VITE_REACT_APP_API_KEY;

  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const [showDropdown1, setShowDropdown1] = useState(false);
  const toggleDropdown1 = () => {
    setShowDropdown1(!showDropdown1);
  };

  const [t] = useTranslation();

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [photo, setPhoto] = useState("");
  // const [isShareOpen, setIsShareOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [resume, setResume] = useState("");

  const [loading, setLoading] = useState("");
  const handleUpdate = async (e) => {
    setLoading(true);
    setIsShareOpen(false);

    try {
      const res = await axios.post(
        `${URL_API}/api/${e}`,
        { resume: resume },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status == 200) {
        setChange(!change);
        toast.success(t("Add Successfully"));
        setIsShareOpen(false);
        setResume("");
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);

      setIsShareOpen(false);
      setPhoto("");
    }
  };
  const handleDelete = async (e) => {
    try {
      const res = await axios.post(
        `${URL_API}/api/profile/deleteResume`,
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
  const params = useParams().id;

  return (
    <div className="resume">
      <p className="d-flex justify-content-xxl-between">
        {t("C.V")}
        <div className="d-flex align-items-center gap-3">
          {user?.user_name === params && (
            <>
              <IoAdd
                style={{ color: "#7CC9D1" }}
                className="font-xxl"
                onClick={() => {
                  localStorage.setItem("currentPage", "CV");
                  // navigate("/userCV");
                  setIsShareOpen(true);
                }}
              />
              {items?.resume && (
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
                        handleDelete();
                      }
                    });
                  }}
                />
              )}
            </>
          )}
        </div>
      </p>
      {items?.resume && <CVComponent items={items} />}
      {/* {renderSectionComponent(sectionLabel)} */}
      <Modal
        hasCloseButton
        closeButtonLeft
        isOpen={isShareOpen}
        closeModal={() => setIsShareOpen(false)}
        title={t("update Cv")}
        closeIcon={true}
        isFullScreen={true}
      >
        <>
          {resume ? (
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
              <CVComponent />
              {/* <button disabled></button> */}
              <Button
                disabled={loading}
                onClick={() => {
                  handleUpdate("profile/uploadUserResume");
                }}
              >
                {t("Update")}
              </Button>
            </div>
          ) : (
            <label
              htmlFor="file"
              className="rounded-3 text-center d-flex bg-white p-4 w-100 border-dashed"
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginBottom: "30px",
              }}
            >
              <h4 style={{ fontWeight: "500" }}>
                Choose a file or drag & drop it here
              </h4>
              <h3 style={{ fontWeight: "500", color: "#A9ACB4" }}></h3>
              <br />
              <input
                type="file"
                name="file[]"
                required
                onChange={(e) => setResume(e.target.files[0])}
                id="file"
                style={{ display: "none" }} // Hide the input element
                accept=".pdf ,.docx .ppt"
              />
              <label htmlFor="file" className="browse-button">
                {uploading ? "Uploading..." : "Browse File"}
              </label>
              {uploading && (
                <div>
                  <p>Uploading: {uploadProgress}%</p>
                  <progress value={uploadProgress} max="100" />
                </div>
              )}
            </label>
          )}
        </>
      </Modal>
    </div>
  );
}

export default UploadCv;

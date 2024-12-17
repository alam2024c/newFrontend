import { t } from "i18next";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { cvImg } from "../../../../assets/icons";
// import ModalProfile from "../modal/ModalProfile";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../../../../assets/images/icons";
import { useTranslation } from "react-i18next";
import cover from "../../../../assets/images/cover.png";
import character from "../../../../assets/images/user.png";
import Button from "../../../../components/ui/button/Button";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import VideoPlayer from "../../../../components/ui/videoPlayer/VideoPlayer";
import { Modal } from "../../../../components/ui";
import VideoPlayerProfile from "../../../../components/ui/videoPlayerProfile/VideoPlayer";
import { IoAdd } from "react-icons/io5";

const IntroductoryVideoComponent = ({ items }) => {
  // Render the introductory video component
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);

  const handleFullScreen = () => {
    if (!isFullScreen) {
      videoContainerRef.current.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };
  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    videoRef.current.volume = event.target.value;
  };
  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <div className="singlePost__body--video ">
        <VideoPlayerProfile data={items?.video} />
      </div>
    </>
  );
};

function UploadVideo({ setChange, change, items }) {
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
  const [video, setVideo] = useState("");

  const [loading, setLoading] = useState("");
  const handleUpdate = async (e) => {
    setIsShareOpen(false);

    setLoading(true);

    try {
      const res = await axios.post(
        `${URL_API}/api/${e}`,
        { video: video },
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
        setVideo("");
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
        `${URL_API}/api/profile/deleteVideo`,
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
        {t("Introductory Video")}
        <div className="d-flex align-items-center gap-3">
          {user?.user_name === params && (
            <>
              <IoAdd
                style={{ color: "#7CC9D1" }}
                className="font-xxl"
                onClick={() => {
                  localStorage.setItem("currentPage", "CV");
                  // setskillEdit(e);
                  setIsShareOpen(true);
                }}
              />
              {items?.video && (
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
      {items?.video && <IntroductoryVideoComponent items={items} />}
      {/* {renderSectionComponent(sectionLabel)} */}
      <Modal
        hasCloseButton
        closeButtonLeft
        isOpen={isShareOpen}
        closeModal={() => setIsShareOpen(false)}
        title={t("Update Video")}
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
                disabled={loading}
                onClick={() => {
                  handleUpdate("profile/uploadVideo");
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
                {t("Choose a file or drag & drop it here")}
              </h4>
              <h3 style={{ fontWeight: "500", color: "#A9ACB4" }}>
                MP4 formats
              </h3>
              <br />
              <input
                type="file"
                name="file[]"
                required
                onChange={(e) => setVideo(e.target.files[0])}
                id="file"
                style={{ display: "none" }} // Hide the input element
                accept=".mp4"
              />
              <label htmlFor="file" className="browse-button">
                {uploading ? "Uploading..." : t("Browse File")}
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

export default UploadVideo;

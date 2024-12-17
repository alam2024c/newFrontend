import cover from "../../assets/images/cover.png";
import mg from "../../assets/images/mg.jpg";
import camera2 from "../../assets/images/camera2.png";
import send from "../../assets/images/send.png";

import "./ProfileHeader.scss";
import { close, home } from "../../assets/images/icons";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { Button, Dropdown, Modal } from "../ui";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
import { getUser } from "../../rtk/Api/Api";
import { getDataProfile } from "../posts/getDataPost";
import { Link, useNavigate, useParams } from "react-router-dom";

import { SlideshowLightbox } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";
import Actions from "../../pages/FriendsPage/components/Actions";
import AddFollow from "../../pages/FriendsPage/components/AddFollow";
import RejectedFollow from "../../pages/FriendsPage/components/RejectFollow";
import { HiLockClosed } from "react-icons/hi";
import { IoLockClosed } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import AcceptFollow from "../../pages/FriendsPage/FriendRequest/AcceptFollow";
import TextPost from "../PostHeader/TextPost";

// import RejectedFollow from "../friendBox/RejectFollow";
// import AddFollow from "../friendBox/AddFollow";

function ProfileHeader({ openModal, setMainMenu, mainMenu, setLoading_2 }) {
  const { user, error, token } = useSelector((state) => state.auth);
  const URL_API = import.meta.env.VITE_REACT_APP_API_KEY;
  const params = useParams().id;
  const [change, setChange] = useState(false);
  const [t, i18n] = useTranslation("");
  const { items, loadingProfile } = getDataProfile(
    token,

    `profile/${params}`,
    change,
    params,
    i18n.language
  );

  useEffect(() => {
    setLoading_2(loadingProfile);
  }, [loadingProfile]);
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const [showDropdown1, setShowDropdown1] = useState(false);
  const toggleDropdown1 = () => {
    setShowDropdown1(!showDropdown1);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [lightboxOpen1, setLightboxOpen1] = useState(false);
  const openLightbox1 = () => setLightboxOpen1(true);
  const closeLightbox1 = () => setLightboxOpen1(false);

  const [selectedcover, setSelectedcover] = useState(cover);
  const [selectedphoto, setSelectedphoto] = useState(mg);

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [photo, setPhoto] = useState("");
  // const [isShareOpen, setIsShareOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [typeImage, setTypeImage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    setSelectedFile(...e.target.files);

    setUploadComplete(false);

    if (file) {
      handleUpload(e, type);
    }
  };

  const handleUpload = (e, type) => {
    setUploading(true);

    // Simulating upload progress
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 10;
        } else {
          setPhoto(e.target.files[0]);
          clearInterval(interval);
          setUploadComplete(true);
          setUploading(false);

          return prevProgress;
        }
      });
    }, 500);
  };
  const dispatch = useDispatch();
  const [loading, setLoading] = useState("");
  const handleUpdate = async (e) => {
    setLoading(true);
    setIsShareOpen(false);

    try {
      const res = await axios.post(
        `${URL_API}/api/${e}`,
        { image: photo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status == 200) {
        setChange(!change);
        toast.success("Profile img updated successfully");
        setIsShareOpen(false);
        setPhoto("");
        setLoading(false);

        getUser(token, dispatch);
      }
      //
    } catch (err) {
      console.log(err);
      setLoading(false);

      setIsShareOpen(false);
      setPhoto("");
    }
  };
  const handleUpdateCover = async (e) => {
    setIsShareOpen(false);
    setLoading(true);

    try {
      const res = await axios.post(
        `${URL_API}/api/${e}`,
        { cover: photo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status == 200) {
        setChange(!change);
        toast.success("Profile userCoverImage updated successfully");
        setIsShareOpen(false);
        setPhoto("");

        setLoading(false);

        getUser(token, dispatch);
      }
      //
    } catch (err) {
      setIsShareOpen(false);
      setPhoto("");
      setLoading(false);
    }
  };
  useEffect(() => {}, [user]);

  const [type, setType] = useState(
    items?.follow == "friend"
      ? false
      : items?.follow == "request_sended"
      ? "request_sended"
      : true
  );
  useEffect(() => {
    setMainMenu(items);
    setType(
      items?.follow == "friend"
        ? false
        : items?.follow == "request_sended"
        ? "request_sended"
        : true
    );
  }, [items]);
  const handleDelete = async () => {
    try {
      const res = await axios.post(
        `${URL_API}/api/profile/deleteUserImage`,
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
        toast.success("Profile image Deleted successfully");
        setPhoto("");

        setLoading(false);

        getUser(token, dispatch);
      }
      //
    } catch (err) {
      setIsShareOpen(false);
      setPhoto("");
      setLoading(false);
    }
  };
  const handleDeleteCover = async () => {
    const formData = new FormData();
    // formData.append("Files", files);
    try {
      const res = await axios.post(
        `${URL_API}/api/profile/deleteCoverImage`,
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
        toast.success("Profile userCoverImage Deleted successfully");
        setPhoto("");

        setLoading(false);

        getUser(token, dispatch);
      }
      //
    } catch (err) {
      setIsShareOpen(false);
      setPhoto("");
      setLoading(false);
    }
  };
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setPhoto(event.dataTransfer.files[0]);
  };

  return (
    <>
      {/* rounded-t-3xl */}
      {!loadingProfile && (
        <>
          <div className="bg-white portfolio rounded-t-3xl ">
            <div className="relative">
              {user?.user_name === params ? (
                <SlideshowLightbox
                  key={user?.profile?.cover}
                  open={lightboxOpen1}
                  onClose={closeLightbox1}
                >
                  {/* <img
                    className="w-full min-h-[18rem] max-h-72 object-cover object-bottom "
                    src={
                      user?.profile?.cover
                        ? `${URL_API}/storage/${user?.profile?.cover}`
                        : selectedcover
                    }
                    alt=""
                    onClick={toggleDropdown}
                  /> */}

                  {/* add by abdallah */}
                  <img
                    className="w-full min-h-[18rem] max-h-72 object-cover"
                    src={
                      user?.profile?.cover
                        ? `${URL_API}/storage/${user?.profile?.cover}`
                        : selectedcover
                    }
                    alt=""
                    onClick={toggleDropdown}
                  />
                </SlideshowLightbox>
              ) : (
                <SlideshowLightbox
                  key={user?.profile?.cover}
                  open={lightboxOpen1}
                  onClose={closeLightbox1}
                >
                  <img
                    className="w-full min-h-[18rem] max-h-72 object-cover object-bottom "
                    src={
                      items?.cover_Img
                        ? `${URL_API}/storage/${items?.cover_Img}`
                        : selectedcover
                    }
                    alt=""
                    onClick={toggleDropdown}
                  />
                </SlideshowLightbox>
              )}

              <div className="absolute user left-4 bottom-2 sm:left-6">
                <Dropdown
                  isStatic={true}
                  buttonData={
                    <img className="w-8 sm:w-full" src={camera2} alt="" />
                  }
                  labels={
                    items?.user_id === user.id
                      ? [
                          t("See Cover Image"),
                          t("Change Cover Image"),

                          t("Delete profile cover"),
                        ]
                      : [t("See Cover Image")]
                  }
                  post_id={user.id}
                  post={user}
                  top="bottom-12 sm:left-16 left-48"
                  handleButtons={(label) => {
                    if (label === t("See Cover Image")) {
                      openLightbox1();
                    } else if (label === t("Change Cover Image")) {
                      setIsShareOpen(true);
                      setTypeImage("cover");
                    } else if (label == t("Delete profile cover")) {
                      handleDeleteCover();
                    }
                  }}
                />
              </div>

              <div className="absolute usercover -bottom-11 sm:-bottom-16">
                <Dropdown
                  buttonData={
                    <div className="relative ps-6 sm:ps-12">
                      {items?.user_id === user.id && (
                        <img
                          className="absolute bottom-0 left-4 w-8 h-8"
                          src={camera2}
                          alt=""
                        />
                      )}
                      {user?.user_name === params ? (
                        <SlideshowLightbox
                          key={user?.profile?.image}
                          open={open}
                          onClose={handleClose}
                        >
                          <img
                            className="w-28 h-28 sm:w-44 sm:h-44 rounded-full bg-white "
                            style={{ border: "5px solid #fff" }}
                            src={
                              user?.profile?.image
                                ? `${URL_API}/storage/${user?.profile?.image}`
                                : selectedcover
                            }
                            // src={`${URL_API}/storage/${user?.image}`}
                            alt=""
                            onClick={toggleDropdown}
                          />
                        </SlideshowLightbox>
                      ) : (
                        <SlideshowLightbox
                          key={items?.user_img}
                          open={open}
                          onClose={handleClose}
                        >
                          <img
                            src={
                              items?.user_img
                                ? `${URL_API}/storage/${items?.user_img}`
                                : selectedcover
                            }
                            className="w-28 h-28 sm:w-44 sm:h-44 rounded-full bg-white"
                            // src={`${URL_API}/storage/${items?.user_img}`}
                            alt=""
                            onClick={toggleDropdown}
                          />
                        </SlideshowLightbox>
                      )}
                    </div>
                  }
                  labels={
                    items?.user_id === user?.id
                      ? [
                          t("See profile image"),
                          t("Change Profile Image"),
                          ,
                          t("Delete profile picture"),
                        ]
                      : [t("See profile image")]
                  }
                  post_id={user?.id}
                  post={user}
                  top="-top-12"
                  position="right-20"
                  handleButtons={(label) => {
                    if (label === t("See profile image")) {
                      handleOpen();
                    } else if (label === t("Change Profile Image")) {
                      setIsShareOpen(true);
                      setTypeImage("img");
                    } else if (label === t("Delete profile picture")) {
                      handleDelete();
                    }
                  }}
                />
              </div>
            </div>
            <dl className="px-5">
              <div className="">
                <div className="mx-5 my-3" style={{ width: "fit-content" }}>
                  <h3
                    style={{ fontSize: "30px" }}
                    className="pt-12  fs-1  fw-bold"
                  >
                    {items?.first_name + " " + items?.last_name} <span></span>
                  </h3>
                  {/* <Link to={`/chat/${items?.user_name}`}>Chat</Link> */}
                  {items?.user_id === user?.id && (
                    <p className="d-flex align-items-center gap-2">
                      <TextPost text={items?.bio} />
                      <FaEdit onClick={() => navigate("/privacySettings")} />
                    </p>
                  )}
                </div>
                <div className="d-flex justify-content-end align-items-center">
                  <div className=" my-3" style={{ width: "fit-content" }}>
                    <div className="flex gap-4 sm:px-4">
                      <p
                        // onClick={openModal}
                        className="cursor-pointer"
                        style={{ fontSize: "20px", fontWeight: "600" }}
                        onClick={() => navigate(`/profile/followers/${params}`)}
                      >
                        {t("Followers") + " " + items?.follower}
                      </p>

                      <p
                        onClick={() => navigate(`/profile/following/${params}`)}
                        className="cursor-pointer"
                        style={{ fontSize: "20px", fontWeight: "600" }}
                      >
                        {t("Following") + " " + items?.following}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-12 d-flex flex-wrap align-items-center"
                style={{ textAlign: "left" }}
              >
                {items?.user_id !== user.id && (
                  <>
                    <div className="p-2">
                      {type ? (
                        <>
                          {type == "request_sended" ? (
                            <RejectedFollow
                              user={items}
                              setType={setType}
                              type={type}
                            />
                          ) : (
                            <AddFollow user={items} setType={setType} />
                          )}
                        </>
                      ) : (
                        <RejectedFollow
                          user={items}
                          setType={setType}
                          type={type}
                        />
                      )}
                    </div>
                    <button
                      onClick={() => navigate(`/chat/${items?.user_name}`)}
                      // className=" text-center  d-flex "
                      className=" text-center   d-flex d-felx align-items-center gap-2"
                      style={{
                        backgroundColor: "rgb(0, 153, 171)",
                        borderRadius: "50px",
                        border: "1px solid",
                        fontSize: "17px",
                        borderRadius: "50px",
                        padding: "6px 14px",
                        lineHeight: "normal",
                        fontSize: "17px",
                        color: "#fff",
                      }}
                    >
                      {t("send message")} <img src={send} alt="" />
                    </button>
                  </>
                )}
              </div>
            </dl>
            {/* <div className="flex  sm:flex-row justify-between pt-4 sm:px-8 px-2">
          <div className="d-flex flex-column text-center">
           
            <h3 className="pt-1  mx-5 d-flex align-items-center justify-content-center flex-column gap-2">
              <span style={{ color: "green" }}>{items?.job} </span>
              <span>
                {" "}
                <img src={items["image-job"]} alt="" />
              </span>
            </h3>
          </div>
          <div className="flex gap-2 sm:px-4">
            <p
              // onClick={openModal}
              className="cursor-pointer"
              onClick={() => navigate(`/profile/followers/${params}`)}
            >
              {t("followers") + " " + items.follwerCount}
            </p>

            <p
              onClick={() => navigate(`/profile/following/${params}`)}
              className="cursor-pointer"
            >
              {t("following") + " " + items.follwingCount}
            </p>
          </div>
        </div> */}

            {/* <div className="flex justify-end pt-2 pb-4 px-8 sm:px-24">
          {items.user_id === user.id ? (
            <Button
              className="w-fit"
              onClick={() => {
                if (items.user_id === user.id) {
                  navigate("/settings/update-info");
                }
                // handle the edit the follow and the unFollow
              }}
            >
              {t("edit my data")}
            </Button>
          ) : (
            <>
              <div className="p-2">
                {type ? (
                  <AddFollow user={items} setType={setType} />
                ) : (
                  <RejectedFollow user={items} setType={setType} />
                )}
              </div>
            </>
          )}
       
        </div> */}
          </div>
          <Modal
            hasCloseButton
            closeButtonLeft
            isOpen={isShareOpen}
            closeModal={() => setIsShareOpen(false)}
            title={t("update image Profile")}
            closeIcon={true}
            isFullScreen={false}
          >
            <>
              {photo ? (
                <div className="d-flex flex-column gap-3 mb-3 text-center justify-content-between h-100 update-mobile">
                  <div style={{ position: "relative" }}>
                    <img
                      src={close}
                      style={{ position: "absolute", cursor: "pointer" }}
                      onClick={() => setPhoto("")}
                    />
                    <img
                      src={URL.createObjectURL(photo)}
                      alt=""
                      style={{ width: "100%", maxHeight: "300px" }}
                    />
                  </div>
                  {/* <button disabled></button> */}
                  <Button
                    disabled={loading}
                    onClick={() => {
                      if (typeImage == "cover") {
                        handleUpdateCover("profile/uploadUserCoverImage");
                      } else {
                        handleUpdate("profile/uploadUserImage");
                      }
                    }}
                  >
                    {t("Update")}
                  </Button>
                </div>
              ) : (
                <label
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
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
                    JPEG, PNG formats
                  </h3>
                  <br />
                  <input
                    type="file"
                    name="file[]"
                    required
                    onChange={(e) => handleFileChange(e, "img")}
                    id="file"
                    style={{ display: "none" }} // Hide the input element
                    accept=".jpeg, .jpg, .png"
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
        </>
      )}
    </>
  );
}

export default ProfileHeader;

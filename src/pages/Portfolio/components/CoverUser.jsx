/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import cover from "../../../assets/images/cover.png";
import character from "../../../assets/images/user.png";
import Badge from "../../../assets/images/Badge.png";
import camera2 from "../../../assets/images/camera2.png";
import Icon from "../../../assets/images/Icon.png";
import Union from "../../../assets/images/Union.png";
import { AiOutlineEdit } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button, Menu, MenuItem, Input, Modal, Box } from "@mui/material";
import { styled } from "@mui/system";
import gallery from "../../../assets/images/gallery.png";
import edit from "../../../assets/images/edit.png";
import xicon from "../../../assets/images/close2.png";

function CoverUser() {
  const [t] = useTranslation();
  const [file, setFile] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [lightboxOpen1, setLightboxOpen1] = useState(false);
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedcover, setSelectedcover] = useState(cover);
  const [selectedphoto, setSelectedphoto] = useState(character);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showSaveModal2, setShowSaveModal2] = useState(false);
  const [address, setAddress] = useState("New York, United states");
  const [isEditable, setIsEditable] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    // height: "90%",
    p: 0,
  };
  const openLightbox1 = () => {
    setLightboxOpen1(true);
  };
  const closeLightbox1 = () => {
    setLightboxOpen1(false);
  };
  const toggleAddress = () => {
    setIsEditable(!isEditable);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const toggleDropdown1 = () => {
    setShowDropdown1(!showDropdown1);
  };
  const handlecoverChange = (e) => {
    const coverfile = e.target.files[0];
    // setSelectedcover(coverfile)
    if (coverfile) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedcover(reader.result);
        setShowSaveModal2(true);
      };
      reader.readAsDataURL(coverfile);
    }
  };
  const handlephotoChange = (e) => {
    const photofile = e.target.files[0];
    if (photofile) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedphoto(reader.result);
        setShowSaveModal(true);
      };
      reader.readAsDataURL(photofile);
    }
  };
  const handleCloseSaveModal = () => {
    setShowSaveModal(false);
  };
  const handleCloseSaveModal2 = () => {
    setShowSaveModal2(false);
  };
  return (
    <section className="">
      {/* ازالة البعض حسب نوع الحساب */}

      <div className="profile-card text-start">
        <img
          className="img-responsive "
          style={{ maxHeight: "190px", objectFit: "cover" }}
          src={selectedcover}
          alt=""
        />

        <div className="profile-info">
          <img
            className="profile-pic3"
            src={camera2}
            alt=""
            onClick={toggleDropdown}
          />

          {/* Dropdown */}
          <Menu
            id="dropdown-menu "
            keepMounted
            className="firstmenu"
            open={showDropdown}
            onClose={toggleDropdown}
          >
            <MenuItem onClick={openLightbox1} className="photodropdownitem">
              <img src={edit} alt="Edit Icon" /> {t("View Cover")}
            </MenuItem>
            <MenuItem className="photodropdownitem">
              <input
                type="file"
                name="file[]"
                required
                onChange={handlecoverChange}
                id="coverFileInput"
                style={{ display: "none" }}
                accept=".jpeg, .jpg, .png"
              />
              <img
                src={gallery}
                alt="Gallery Icon"
                style={{
                  backgroundColor: "#E9E9E9",
                  width: "26px",
                  padding: "6px",
                  borderRadius: "5px",
                }}
              />
              <label htmlFor="coverFileInput">{t("Choose Cover")}</label>
            </MenuItem>
          </Menu>
          {/* showcover */}
          <Modal
            open={lightboxOpen1}
            onClose={closeLightbox1}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} style={{ padding: "50px", borderRadius: "18px" }}>
              <button
                onClick={closeLightbox1}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <img
                  className="Close"
                  src={xicon}
                  alt="Close"
                  style={{
                    backgroundColor: "#F6F6F6",
                    borderRadius: "50%",
                    padding: "3px",
                  }}
                />
              </button>
              <img
                style={{ borderRadius: "15px", height: "23rem" }}
                className="w-100 "
                src={selectedcover}
                alt=""
              />
            </Box>
          </Modal>

          {/* Save cover modal */}
          <Modal
            open={showSaveModal2}
            onClose={handleCloseSaveModal2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} style={{ padding: "50px", borderRadius: "18px" }}>
              <button
                onClick={handleCloseSaveModal2}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <img
                  className="Close"
                  src={xicon}
                  alt="Close"
                  style={{
                    backgroundColor: "#F6F6F6",
                    borderRadius: "50%",
                    padding: "3px",
                  }}
                />
              </button>
              <h2
                style={{
                  marginBottom: "20px",
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#2F2F31",
                }}
              >
                Choose New Cover
              </h2>
              <img
                style={{ borderRadius: "15px", height: "23rem" }}
                className="w-100 "
                src={selectedcover}
                alt=""
              />
              <button
                onClick={handleCloseSaveModal2}
                className=" text-center mt-5 border-0 text-white font-xsss fw-500 p-2 w-full d-inline-block"
                style={{ borderRadius: "10px", backgroundColor: "#0099AB" }}
              >
                {t("save")}
              </button>
            </Box>
          </Modal>

          <img className="profile-pic" src={selectedphoto} alt="" />

          {/* Dropdown */}
          <Menu
            id="dropdown-menu1"
            keepMounted
            className="secondmenu"
            open={showDropdown1}
            onClose={toggleDropdown1}
          >
            <MenuItem onClick={handleOpen} className="photodropdownitem">
              <img src={edit} alt="Edit Icon" /> {t("View Photo")}
            </MenuItem>
            <MenuItem className="photodropdownitem">
              <Input
                type="file"
                name="file[]"
                required
                onChange={handlephotoChange}
                id="photoFileInput"
                style={{ display: "none" }}
                accept=".jpeg, .jpg, .png"
              />
              <img
                src={gallery}
                alt="Gallery Icon"
                style={{
                  backgroundColor: "#E9E9E9",
                  width: "26px",
                  padding: "6px",
                  borderRadius: "5px",
                }}
              />
              <label htmlFor="photoFileInput">{t("Choose Photo")}</label>
            </MenuItem>
          </Menu>

          {/* showphoto */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} style={{ padding: "50px", borderRadius: "18px" }}>
              <button
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <img
                  className="Close"
                  src={xicon}
                  alt="Close"
                  style={{
                    backgroundColor: "#F6F6F6",
                    borderRadius: "50%",
                    padding: "3px",
                  }}
                />
              </button>
              <img
                style={{ borderRadius: "15px", height: "23rem" }}
                className="w-100 "
                src={selectedphoto}
                alt=""
              />
            </Box>
          </Modal>

          {/* Save photo modal */}
          <Modal
            open={showSaveModal}
            onClose={handleCloseSaveModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} style={{ padding: "50px", borderRadius: "18px" }}>
              <button
                onClick={handleCloseSaveModal}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <img
                  className="Close"
                  src={xicon}
                  alt="Close"
                  style={{
                    backgroundColor: "#F6F6F6",
                    borderRadius: "50%",
                    padding: "3px",
                  }}
                />
              </button>
              <h2
                style={{
                  marginBottom: "20px",
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#2F2F31",
                }}
              >
                Choose New Picture
              </h2>
              <img
                style={{ borderRadius: "15px", height: "23rem" }}
                className="w-100 "
                src={selectedphoto}
                alt=""
              />
              <button
                onClick={handleCloseSaveModal}
                className=" text-center mt-5 border-0 text-white font-xsss fw-500 p-2 w-full d-inline-block"
                style={{ borderRadius: "10px", backgroundColor: "#0099AB" }}
              >
                {t("save")}
              </button>
            </Box>
          </Modal>

          <h1 className="profile-title">
            {t("User Name")}
            <img
              className="profile-pic2"
              onClick={toggleDropdown1}
              src={Badge}
              alt=""
            />
          </h1>

          <h1
            className="profile-title"
            style={{ fontSize: "20px", marginTop: "0.5rem" }}
          >
            {" "}
            {t(" IT Specialist")}
          </h1>
          <h1
            className="profile-title"
            style={{ fontSize: "20px", marginTop: "0.5rem" }}
          >
            {" "}
            {t(" IT Specialist - Wey Company")}
          </h1>

          <div className="d-flex sections flex-wrap">
            <button
              className=" text-center mt-5 text-white d-flex "
              style={{
                borderRadius: "50px ",
                backgroundColor: "rgb(0, 153, 171)",
                padding: "6px 21px",
                lineHeight: "normal",
                fontSize: "17px",
                marginInline: "15px",
              }}
            >
              {t("Add Section")}
            </button>
            <button
              className=" text-center mt-5 d-flex "
              style={{
                backgroundColor: "white",
                color: "#585858",
                lineHeight: "normal",
                borderRadius: "50px ",
                padding: "6px 21px",
                border: "1px solid #585858",
                fontSize: "17px",
                marginInline: "15px",
              }}
            >
              {t("More")}
            </button>
          </div>
        </div>

        <div className="col-12 d-flex flex-wrap" style={{ textAlign: "left" }}>
          <button
            className=" text-center mt-5 text-white d-flex "
            style={{
              borderRadius: "50px",
              backgroundColor: "rgb(0, 153, 171)",
              padding: "6px 21px",
              lineHeight: "normal",
              fontSize: "17px",
              marginInline: "15px",
            }}
          >
            <img
              src={Icon}
              alt=""
              style={{ marginTop: "5px", marginInline: "8px" }}
            />{" "}
            {t("Follow")}
          </button>
          <button
            className=" text-center mt-5 d-flex "
            style={{
              backgroundColor: "white",
              borderRadius: "50px",
              lineHeight: "normal",
              padding: "6px 21px",
              border: "1px solid",
              fontSize: "17px",
              marginInline: "15px",
            }}
          >
            <img
              src={Union}
              alt=""
              style={{ marginTop: "5px", marginInline: "8px" }}
            />{" "}
            {t("send a message")}
          </button>
          <button
            className=" text-center mt-5 d-flex "
            style={{
              backgroundColor: "white",
              color: "#585858",
              lineHeight: "normal",
              borderRadius: "50px ",
              padding: "6px 21px",
              border: "1px solid #585858",
              fontSize: "17px",
              marginInline: "15px",
            }}
          >
            {t("More")}
          </button>
        </div>
      </div>

      <div
        className="d-flex justify-content-between align-items-center mx-2 px-3 pb-4 ms-4 "
        style={{ fontSize: "29px" }}
      >
        <div className="d-flex gap-1 text-current flex-wrap adres">
          <p className="m-0">
            <span>{"364"}</span> {t("Followers")}
          </p>

          <input
            className={`text-center ${isEditable ? " " : "d-none"}`}
            onChange={handleAddressChange}
            value={address}
            id="theAddress"
            type="text"
            style={{ width: "15rem" }}
          />
          <label
            style={{ marginLeft: "15px", marginInline: "15px" }}
            className={`text-dark ${isEditable ? "d-none" : " "}`}
            htmlFor="theAddress"
          >
            {address}
          </label>

          <p className="m-0">{t("Contact Info")}</p>
        </div>
        <AiOutlineEdit className="font-xxl" onClick={toggleAddress} />
      </div>
      <div></div>

      <style>
        {`
                 @media (max-width: 546px) {
                  .sections{
                    position: static !important;
                    } 
                 }
                 @media (max-width: 660px) {
                  .adres{
                   font-size: 20px;
                    } 
                 }
                  `}
      </style>
    </section>
  );
}

export default CoverUser;

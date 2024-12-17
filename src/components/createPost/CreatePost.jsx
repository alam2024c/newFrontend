import { Button, FiltersBar, Form, Modal } from "../ui/";
import { useEffect, useState } from "react";

import { FaFileUpload } from "react-icons/fa";
import { FaPenToSquare, FaPlus } from "react-icons/fa6";
import { FaFileSignature } from "react-icons/fa6";

import { FaMicrophoneAlt } from "react-icons/fa";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { forms, formsWithCategory, categoriesSorted } from "./formsData";
import { filters } from "/public/filters";
import ModalMain from "./ModalMain";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function CreatePost({ setFilter, uploads }) {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [t] = useTranslation();

  const { user } = useSelector((state) => state.auth);
  const buttons = [
    {
      name: "text",
      icon: <FaPenToSquare style={{ fontSize: "20px" }} />,
    },
    {
      name: "image",
      icon: <CiImageOn style={{ fontSize: "20px" }} />,
    },
    {
      name: "video",
      icon: <MdOutlineSlowMotionVideo style={{ fontSize: "20px" }} />,
    },
    {
      name: "record",
      icon: <FaMicrophoneAlt style={{ fontSize: "20px" }} />,
    },
    {
      name: "file",
      icon: <FaFileSignature style={{ fontSize: "20px" }} />,
    },
    // {
    //   name: "file",
    //   icon: <FaPlus style={{ fontSize: "20px" }} />,
    // },
  ];
  // console.log(formsWithCategory);
  /////////////// main module ///////////////////
  const [isMainOpen, setIsMainOpen] = useState(false);
  const [selectedField, setSelectedField] = useState("text");

  function closeMainModal() {
    setIsMainOpen(false);
  }

  function openMainModal() {
    if (uploads.length > 0) {
      toast.error(t("Please wait until the previous post is uploaded"));
    } else {
      setIsMainOpen(true);
    }
  }

  const handleFieldSelection = (fieldName) => {
    setSelectedField(fieldName);
    openMainModal();
  };

  /////////////// main module ///////////////////

  /////////////// category's module ///////////////////
  const [hasCategory, setHasCategory] = useState(false);

  function closeCategoryModal() {
    setHasCategory(false);
  }

  function openCategoryModal() {
    setHasCategory(true);
  }

  function handleSelectCategory(e) {
    // setFormTitle(e);
    setSelectedCategory(e);
    openFormsModal();
    closeCategoryModal();
  }

  /////////////// category's module ///////////////////

  /////////////// forms module ///////////////////
  const [isFormsOpen, setIsFormsOpen] = useState(false);
  // const [formTitle, setFormTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  function openFormsModal() {
    setIsFormsOpen(true);
  }

  /////////////// forms module ///////////////////

  return (
    <>
      <div
        className="create__post text-black rounded-2xl px-4 shadow max-w-4xl w-full bg-blue-50"
        style={uploads.length > 0 ? { opacity: ".4" } : { opacity: "1" }}
      >
        <button
          className="flex justify-start text-gray-300 items-center gap-2 w-full pt-2"
          onClick={openMainModal}
        >
          <img
            className="w-10   h-10 rounded-full"
            src={`${URL}/storage/${user?.profile?.image}`}
            alt=""
          />
          {t("what's on your mind")} {user?.first_name} {t("?")}
        </button>
        <div className="flex justify-between items-center py-2">
          <ul className="flex gap-5 ">
            {buttons.map((button, i) => (
              <li key={i}>
                <button
                  onClick={() => {
                    handleFieldSelection(button.name);
                  }}
                >
                  {button.icon}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  openCategoryModal();
                  closeMainModal();
                }}
              >
                <FaPlus style={{ fontSize: "20px" }} />
              </button>
            </li>
          </ul>
        </div>
      </div>

      <FiltersBar filters={filters} setFilterCategory={setFilter} />

      {/* the main modal for the normal posts */}
      <ModalMain
        isMainOpen={isMainOpen}
        setIsMainOpen={setIsMainOpen}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        setHasCategory={setHasCategory}
      />
      
      <Modal
        isOpen={hasCategory}
        closeModal={closeCategoryModal}
        title={t("add to your post")}
        backFunc={() => {
          openMainModal();
          closeCategoryModal();
        }}
        children={
          <>
            <div className="sm:flex pb-8">
              <div className="grid h-fit w-full  grid-rows-1 mb-2">
                {formsWithCategory.slice(0, 12).map((form, index) => (
                  <button
                    className="flex gap-3 px-2 py-3 me-4 text-start hover__category"
                    style={{ fontSize: "20px" }}
                    onClick={() => {
                      handleSelectCategory(form.name);
                    }}
                    key={index}
                  >
                    <img className="w-7 h-7" src={form.icon} alt="" />
                    {t(form.name)}
                  </button>
                ))}
              </div>
              <div className="grid h-fit w-full  grid-rows-1">
                {formsWithCategory.slice(12).map((form, index) => (
                  <button
                    className="flex gap-3 px-2 py-3 me-4 text-start hover__category"
                    style={{ fontSize: "20px" }}
                    onClick={() => {
                      handleSelectCategory(form.name);
                    }}
                    key={index + 12}
                  >
                    <img className="w-7 h-7" src={form.icon} alt="" />
                    {t(form.name)}
                  </button>
                ))}
              </div>
            </div>
          </>
        }
      />
      {/* the forms modal */}
      <Form
        categoriesSorted={categoriesSorted}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        filters={filters}
        setHasCategory={setHasCategory}
        isFormsOpen={isFormsOpen}
        setIsFormsOpen={setIsFormsOpen}
        forms={forms}
      />
    </>
  );
}

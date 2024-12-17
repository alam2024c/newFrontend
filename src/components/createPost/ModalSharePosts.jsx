import {
  AudioRecorder,
  Button,
  FiltersBar,
  Form,
  Modal,
  Select,
  Textarea,
} from "../ui";
import { useEffect, useState } from "react";
import { user } from "/public/fakeData.js";
import {
  person,
  image,
  microphone,
  videoImg,
  fileImg,
} from "../../assets/images/icons";
import { forms, formsWithCategory, categoriesSorted } from "./formsData";
import { filters } from "/public/filters";
import SelectedFile from "../ui/selectedfile/selectedFile";
import { t } from "i18next";
import ModalMain from "./ModalMain";

export default function ModalSharePosts({ }) {
  /////////////// main module ///////////////////
  const [isMainOpen, setIsMainOpen] = useState(false);

  function openMainModal() {
    setIsMainOpen(true);
  }

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

  function closeFormsModal() {
    setIsFormsOpen(false);
  }

  function openFormsModal() {
    setIsFormsOpen(true);
  }

  /////////////// forms module ///////////////////

  return (
    <>
      {/* the forms modal */}
      <Modal
        isOpen={isFormsOpen}
        closeModal={closeFormsModal}
        backFunc={() => {
          openCategoryModal();
          closeFormsModal();
        }}
        title={t(selectedCategory)}
        children={
          <>
            <Form
              forms={forms}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categoriesSorted={categoriesSorted}
              filters={filters}
            />
          </>
        }
      />
    </>
  );
}

import "./AddContents.scss";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import Modal from "@mui/material/Modal";
import Picture from "../../../../assets/images/Picture.png";
import close1 from "../../../../assets/images/x.png";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { Form, Modal } from "../../../../components/ui";
import { toast } from "react-toastify";
import { refrechPosts } from "../../../../rtk/slices/authSlice";
import {
  addUpload,
  finishUpload,
  setPercentage,
} from "../../../../rtk/slices/progressSlice";
import FormSelect from "../../../../components/formSelect/FormSelect";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ModalContent from "./ModalContent";

function AddContents({ post }) {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [categor_id, setcategor_id] = useState(post?.category_id);
  const { token, user } = useSelector((state) => state.auth);

  const [modalOpened, setModalOpened] = useState(false);
  const [t] = useTranslation();
  const [myfile, setmyFile] = useState("");
  const [showFile, setShowFile] = useState();

  function closeModal() {
    setModalOpened(false);
  }

  function openModal() {
    setModalOpened(true);
  }

  const [selectedValue, setSelectedValue] = useState({});
  let api = post ? `update/${post.id}` : `cv-create`;
  const dispatch = useDispatch();


  return (
    <div className="addContents ">
      <div className="add bg-blue-50" onClick={openModal}>
        <p>
          <img src={`${URL}/storage/${user?.profile?.image}`} alt="" />
          {t("Add Job")} {user?.first_name}
        </p>

        <div>
          <button className="card mb-3">{t("post")}</button>
        </div>
      </div>

      <ModalContent setModalOpened={setModalOpened} modalOpened={modalOpened} />
    </div>
  );
}

export default AddContents;

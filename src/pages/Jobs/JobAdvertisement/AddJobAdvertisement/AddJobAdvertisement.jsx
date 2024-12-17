import "./AddContents.scss";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { toast } from "react-toastify";
import {
  addUpload,
  finishUpload,
  setPercentage,
} from "../../../../rtk/slices/progressSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ModalContent from "./ModalAddJobAdvertisement";
import ModalAddJobAdvertisement from "./ModalAddJobAdvertisement";

function AddJobAdvertisement({ post }) {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [categor_id, setcategor_id] = useState(post?.category_id);
  const { token, user } = useSelector((state) => state.auth);

  const [modalOpened, setModalOpened] = useState(false);
  const [t] = useTranslation();

  function openModal() {
    setModalOpened(true);
  }




  return (
    <div className="addContents">
      <div className="add bg-blue-50 pb-5" onClick={openModal}>
        <p>
          <img src={`${URL}/storage/${user?.profile?.image}`} alt="" />
          {t("Request a service as an organization")} {user?.first_name}
        </p>

      </div>

      <ModalAddJobAdvertisement
        setModalOpened={setModalOpened}
        modalOpened={modalOpened}
      />
    </div>
  );
}

export default AddJobAdvertisement;

import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import ModalPlayList from "./ModalPlayList";

function AddPlayList({ post }) {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const { token, user } = useSelector((state) => state.auth);

  const [modalOpened, setModalOpened] = useState(false);
  const [t] = useTranslation();
  const [myfile, setmyFile] = useState("");
  const [showFile, setShowFile] = useState();

  function openModal() {
    setModalOpened(true);
  }

  const [selectedValue, setSelectedValue] = useState({});
  let api = post ? `update/${post.id}` : `cv-create`;
  const dispatch = useDispatch();

  return (
    <div className="addContents ">
      <div className="add bg-blue-50 pb-5" onClick={openModal}>
        <p>
          <img src={`${URL}/storage/${user?.profile?.image}`} alt="" />
          {t("Add Playlist")} {user?.first_name}
        </p>

       
      </div>

      <ModalPlayList
        setModalOpened={setModalOpened}
        modalOpened={modalOpened}
      />
    </div>
  );
}

export default AddPlayList;

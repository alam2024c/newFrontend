import React, { useState } from "react";
import AddFollow from "./AddFollow";
import RejectedFollow from "./RejectFollow";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { t } from "i18next";

function ActionsAccept({ user }) {
  const [type, setType] = useState(user?.status);
  const { token, deletePost_id, updateOffer } = useSelector(
    (state) => state.auth
  );
  const post_id = useParams().id;
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const sendData = async (e) => {
    try {
      const res = await axios.get(`${URL}/api/offer_request/${e}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(t(res?.data?.message));
      setType(!type);
    } catch (err) {
      toast.error(t("You have already accepted an offer for this content"));
    }
  };
  return (
    <>
      {type ? (
        <button className="btn4 bg-danger" onClick={() => sendData(user?.id)}>
          {t("Reject")}
        </button>
      ) : (
        <button className="btn4 " onClick={() => sendData(user?.id)}>
          {t("Accept")}
        </button>
      )}
    </>
  );
}

export default ActionsAccept;

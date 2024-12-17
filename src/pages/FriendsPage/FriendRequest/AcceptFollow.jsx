/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiTrash2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function AcceptFollow({ e, setChange, change }) {
  const [follow, setFollow] = useState(false);
  const [t] = useTranslation();
  const { token } = useSelector((state) => state.auth);
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const createAccept = async (user, type) => {
    const data = {
      following_id: user?.id || user?.user_id,
      type,
    };
    try {
      const res = await axios.post(`${URL}/api/accept-follow`, data, {
        headers: {
          Accept: "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setChange(!change);
      if (follow) {
        toast.success("Follow request Reject successfully");
      } else {
        toast.success("Follow request Accepted successfully");
      }
      // toast.success("Follow request Accepted successfully");
    } catch (err) {}
  };

  return (
    <>
      {follow ? (
        <></>
      ) : (
        <>
          <div className="card-body  gap-2 ">
            <div className=" pt-0  d-flex align-items-center gap-3 gap-2 ">
              <button
                className="font-xss rounded  text-white text-center font-xssss align-items-center py-2 px-4"
                onClick={() => {
                  setFollow(true);
                  createAccept(e, "accept");
                }}
                style={{
                  backgroundColor: "#0099AB",
                }}
                // onClick={() => navigate(`/profile/${user.user_name}`)}
              >
                <span> {t("Accept")}</span>
              </button>
              <a
                onClick={() => {
                  setFollow(true);
                  createAccept(e, "reject");
                }}
                href="#"
                className=" bg-red-700 text-white font-bold px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex align-items-center gap-2 py-2"
              >
                <FiTrash2 />
                {t("Rejected")}
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AcceptFollow;

import React from "react";
import "./BoxNotification.scss";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { IoCloseSharp } from "react-icons/io5";
import { deleteNoti } from "../../rtk/slices/authSlice";
function BoxNotification({ notification }) {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const handleButtonClick = async () => {
    try {
      const res = await axios.get(
        `${URL}/api/mark_notification_as_read/${notification.id}`,

        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
    } catch (err) {
      toast.error(t("A network error occurred"));

      console.log(err);
    }
  };
  const deletNotification = async () => {
    try {
      const res = await axios.get(
        `${URL}/api/notification-delete/${notification.id}`,

        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      // toast.success("تم حذف المنشور");

      dispatch(deleteNoti({ id: notification.id }));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div
        className="box__notification p-4"
        style={
          notification?.read_at
            ? { background: "#fff", borderRadius: "10px" }
            : { background: "#ccc", borderRadius: "10px" }
        }
      >
        <div
          onClick={() => {
            handleButtonClick();
            if (notification?.data?.comment_id) {
              navigate(
                `/singleComment/${notification.data.post_id}/${notification?.data?.comment_id}`
              );
            } else if (notification?.data?.post_id) {
              navigate(`/singlePost/${notification.data.post_id}`);
            } else if (notification?.data?.offer_id) {
              if (notification?.data?.content_id) {
                navigate(`/contect/${notification.data.offer_id}`);
              } else {
                navigate(`/advertisement/${notification.data.offer_id}`);
              }
            } else {
              navigate(`/profile/${notification.data.user.user_name}`);
            }
          }}
          className="box__notification__title rounded"
        >
          <img
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            src={
              notification?.data.user_image
                ? `${URL}/storage/${notification?.data.user_image}`
                : "ASfaf"
            }
            alt="profile"
          />
          <div
            className="box__notification__title__info"
            style={{
              fontWeight: "700",
              color: "#0F1419",
            }}
          >
            <h4 className=" ">
              {notification?.data?.user?.first_name}{" "}
              {notification?.data?.user?.last_name} {notification?.data?.msg}
            </h4>
            <span
              style={{ fontWeight: "400", color: "#0F1419" }}
              className="w-100 d-block"
            >
              {" "}
              {/* {t("is in a big hurry.")} */}
            </span>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          <span
            style={{
              fontSize: "14px",
              fontWeight: "400",
              letterSpacing: "1px",
              color: "#AEAEB2",
            }}
          >
            {notification?.created_at}
            {/* {t("am")} */}
          </span>
          <div
            className="flex align-items-center justify-content-center border-gray-200 px-3"
            onClick={() => deletNotification()}
          >
            <IoCloseSharp className="text-red-700 text-2xl" />
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export default BoxNotification;

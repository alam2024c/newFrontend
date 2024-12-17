/* eslint-disable react/prop-types */
import "./userProfile.css";
import img from "../../../assets/images/drake.jpg";

import { AiOutlineArrowRight } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteConversation } from "../../../rtk/slices/authSlice";

function UserProfile({
  infoActive,
  setInfoActive,
  setInfo,
  userChat,
  setChatUser,
}) {
  const toggleInfo = (e) => {
    e.target.parentNode.classList.toggle("open");
  };
  const URL__API = import.meta.env.VITE_REACT_APP_API_KEY;
  const dispatch = useDispatch();
  const themeColor = localStorage.getItem("themeColor");
  const [t] = useTranslation();
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const getUserId = async () => {
    try {
      const res = await axios.post(
        `${URL__API}/api/chatify/get-attachment?page=${page}`,
        { id: userChat?.user_id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setImages(res?.data.messages);
      console.log(res?.data.messages);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserId();
  }, [userChat]);
  const deletAllMessage = async () => {
    try {
      const res = await axios.post(
        `${URL__API}/api/chatify/deleteConversation`,
        { id: userChat?.user_id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChatUser("");
      setInfoActive("");
      setInfo(false);
      dispatch(deleteConversation({ id: userChat?.user_id }));
      console.log(res);
      // toast.success("تم حذف المنشور");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="main__userprofile"
      style={infoActive ? { right: "0" } : { right: "107%" }}
    >
      <AiOutlineArrowRight
        className={`font-xl text-current cursor-pointer backInfo ms-2 ${themeColor} `}
        onClick={() => {
          setInfo(false);
          setInfoActive(false);
        }}
      />
      <div className="p-3 text-center">
        <h3>{t("USERINFORMATION")}</h3>
      </div>
      <div className="profile__card user__profile__image">
        <div className="profile__image mb-3">
          <img
            className="h-100"
            src={
              userChat?.user_img && `${URL__API}/storage/${userChat?.user_img}`
            }
          />
        </div>
        <h4 className=" mb-2">
          {userChat?.first_name + " " + userChat?.last_name}
        </h4>
        <p
          className=" bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          style={{ cursor: "pointer" }}
          onClick={() => deletAllMessage()}
        >
          {t("Delete Conversation")}{" "}
        </p>
      </div>
      <div className="profile__card">
        <div className="card__header" onClick={toggleInfo}>
          <h4>{t("Shared Photoes")}</h4>
          <i className="fa fa-angle-down"></i>
        </div>
        <div className="card w-100 shadow-xss rounded-xxl border-0 mt-3 mb-3">
          <div className="card-body d-block pt-0 pb-2">
            <div className="row">
              {images.map((image, index) => (
                <div className="w-2/4  mb-2 p-2 " key={index}>
                  <div data-lightbox="roadtrip">
                    <img
                      src={`${URL__API}/storage/attachments/${
                        image?.attachment?.new_name || image?.attachment?.file
                      }`}
                      alt=""
                      className="img-fluid rounded-3 w-100 h-[150px]"
                    />

                    
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="card-body d-block w-100 pt-0">
            <div
              onClick={() => setPage(page + 1)}
              className="p-2 lh-28 w-100 d-block bg-grey text-grey-800 text-center font-xssss fw-700 rounded-xl"
            >
              <i className="feather-external-link font-xss ms-2" /> {t("More")}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

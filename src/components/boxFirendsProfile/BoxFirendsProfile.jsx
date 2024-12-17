import React from "react";

import "./BoxFirendsProfile.scss";
import { useNavigate } from "react-router-dom";
import { profile1 } from "../../assets/images/icons";
import { t } from "i18next";
function BoxFirendsProfile({ post }) {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;

  const navigate = useNavigate();
  return (
    <div className="sideBarLeft__card chosen">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          className="d-flex align-items-center gap-2 one__box__firend mb-3"
          style={{ alignItems: "center" }}
        >
          {/* {post?.profile.image ? (
            <img src={`${URL}/storage/${post?.profile.image}`} alt="profile" />
          ) : (
            <img src={profilePic} alt="profile" />
          )} */}
          <img
            src={
              post?.profile?.image
                ? `${URL}/storage/${post?.profile?.image}`
                : profile1
            }
            alt="profile"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />

          <p
            style={{
              marginTop: "4px",
              fontWeight: "700",
              fontSize: "18px",
            }}
          >
            {post?.first_name}
          </p>
        </div>
        <button
          onClick={() => navigate(`/profile/${post?.user_name}`)}
          className="font-xss  text-white text-center font-xssss align-items-center"
          style={{
            padding: " 7px 10px",
            height: "fit-content",
            borderRadius: "0.5rem",
            backgroundColor: "#0099AB",
          }}
          // onClick={() => navigate(`/profile/${user.user_name}`)}
        >
          <span> {t("View Profile")}</span>
        </button>
      </div>
    </div>
  );
}

export default BoxFirendsProfile;

import React from "react";
import profilePic from "../../../assets/images/profilePic.png";
import closeing from "../../../assets/images/close.png";
import friends from "../../../assets/images/friends.png";
import delet from "../../../assets/images/delete.png";
import padlock from "../../../assets/images/padlock.png";
import upload from "../../../assets/images/upload.png";
import close2 from "../../../assets/images/close2.png";
import "./BoxFirendsProfile.scss";
function BoxAcceptFirendsProfile() {
  return (
    <div className="sideBarLeft__card chosen">
      <div
        className="sideBarLeft__card--element flex-wrap m-auto gap-3 w-100 one__box__firend"
        style={{
          display: "flex",
          justifyContent: "space-between",
          boxShadow: "0 -1px 0 rgba(0, 0, 0, .04), 0 2px 4px rgba(0, 0, 0, .5)",
          padding: " 9px 12px",
          borderRadius: "16px",
        }}
      >
        <div className="d-flex align-items-center gap-2 one__box__firend">
          <img src={profilePic} alt="profile" />
          <p
            style={{
              marginTop: "4px",
              fontWeight: "700",
              fontSize: "18px",
            }}
          >
            محمدت عمرو
          </p>
        </div>
        <div className="d-flex">
          <button
            type="submit"
            className="btn btn-dark font-weight-bold logbtn"
            style={{
              background: " linear-gradient(#00ACFF75, #BD00FF58)",
              borderRadius: "26px",
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "1px",
              height: "25px",
              border: "none",
              marginTop: "5px",
              display: "flex",
              padding: "3px 15px",
            }}
          >
            قبول
          </button>
          <img className="delete" src={delet} alt="profile" />
        </div>
      </div>
    </div>
  );
}

export default BoxAcceptFirendsProfile;

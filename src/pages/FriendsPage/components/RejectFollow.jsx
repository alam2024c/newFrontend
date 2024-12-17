import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import Icon from "../../../assets/images/Icon.png";
import { t } from "i18next";
import { FaUserMinus } from "react-icons/fa6";

function RejectedFollow({ user, setType, type }) {
  const { token } = useSelector((state) => state.auth);

  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const data = {
    following_id: user?.id || user?.user_id,
  };
  const handleFollow = async () => {
    setType(true);
    try {
      const res = await axios.post(`${URL}/api/follow-create`, data, {
        headers: {
          Accept: "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
    }
  };

  return (
    <button
      className=" text-center text-white d-flex  d-felx align-items-center gap-2"
      onClick={() => handleFollow()}
      style={{
        borderRadius: "50px",
        backgroundColor: "rgb(0, 153, 171)",
        padding: "6px 14px",
        lineHeight: "normal",
        fontSize: "17px",
        // marginRight: "15px",
      }}
    >
      <FaUserMinus style={{ color: "#fff" }} />
      {/* <img
        src={Icon}
        alt=""
        style={{ marginTop: "5px" }}
        className="mx-2"
      />{" "} */}
      {type == "request_sended" ? t("Request Sended") : t("Un Follow")}
    </button>
    // <button
    //   onClick={() => handleFollow()}
    //   type="submit"
    //   // className="btn btn-dark font-weight-bold logbtn gap-2"
    //   // style={{
    //   //   background: " linear-gradient(#00ACFF75, #BD00FF58)",
    //   //   borderRadius: "26px",
    //   //   fontSize: "12px",
    //   //   padding: "10",
    //   //   fontWeight: "600",
    //   //   letterSpacing: "1px",
    //   //   height: "40px",
    //   //   border: "none",
    //   //   marginTop: "5px",
    //   //   display: "flex",
    //   //   alignItems: "center",
    //   //   justifyContent: "center",
    //   //   padding: "8px 15px",
    //   // }}
    //   variant="danger"
    //   className="font-xss ms-2 text-white text-center bg-danger font-xssss align-items-center"
    //   style={{
    //     padding: " 7px 80px",
    //     borderRadius: "0.5rem",
    //     backgroundColor: "#c33c3c",
    //   }}
    // >
    //   الغاء
    // </button>
  );
}

export default RejectedFollow;

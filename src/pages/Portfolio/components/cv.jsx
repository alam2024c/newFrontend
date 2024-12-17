/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import cover from "../../../assets/images/cover.png";
import character from "../../../assets/images/user.png";
import Badge from "../../../assets/images/Badge.png";
import download from "../../../assets/images/download.png";
import send from "../../../assets/images/send.png";

import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Rate } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import FormSelect from "../../../components/formSelect/FormSelect";
import RatesComment from "../../../components/RatesComment/RatesComment";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading/Loading";

function UserCv() {
  const [t] = useTranslation();
  const [data, setData] = useState();
  const [project_completion_rate, setproject_completion_rate] = useState();
  const [re_employment_rate, setre_employment_rate] = useState();
  const [time_delivery_rate, settime_delivery_rate] = useState();
  const [response_speed, setresponse_speed] = useState();
  const [loading, setLoading] = useState("");
  // const [data, setData] = useState();
  const [comment, setComment] = useState("");
  const [selectedValue, setSelectedValue] = useState({});
  const page = window.location.pathname.split("/")[2];

  const groups = [
    {
      label: t("Comment"),
      name: t("Comment"),
      type: "textarea",
      placeholder: t("age"),
      state: "comment",
    },
  ];

  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const paramId = useParams().id;
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  const getData = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${URL}/api/cv-show/${paramId}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);

      setData(res.data.data);
    } catch (err) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const sendData = async () => {
    const dataForm = {
      re_employment_rate,
      time_delivery_rate,
      project_completion_rate,
      response_speed,
      person_id: data?.user_id,
      comment: "asd",
    };

    try {
      const res = await axios.post(`${URL}/api/cv-rate`, dataForm, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      settime_delivery_rate("");
      setproject_completion_rate("");
      setre_employment_rate("");
      setresponse_speed("");
      setComment("");
      toast.success(t("Rating submitted successfully"));
    } catch (err) {
      toast.error("You have already rated this person");
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="max-w-4xl m-auto">
          <div className="profile-card cv text-start  flex-wrap flex">
            <img
              className="img-responsive"
              style={{ maxHeight: "300px" }}
              src={
                data?.user_cover
                  ? `${URL}/storage/${
                      data?.user_cover ? data?.user_cover : cover
                    }`
                  : cover
              }
              alt=""
            />
            <div className="profile-info user__cv text-center m-auto">
              <img
                className="profile-pic"
                src={`${URL}/storage/${data?.user_img}`}
                alt=""
                style={{ position: "inherit", top: "-159px", left: "-1px" }}
              />

              <h1
                className="profile-title text-center"
                style={{ marginTop: "-111px" }}
              >
                {data?.first_name} {data?.last_name}
              </h1>

              <h1
                className="profile-title text-center"
                style={{ fontSize: "20px", marginTop: "-1.4rem" }}
              >
                {" "}
                {data?.job_title}
              </h1>
            </div>

            <a
              target="_blank"
              className="col-12 d-flex justify-content-center justify-content-between flex-wrap flex gap-2 mt-4"
            >
              <a
                href={URL + "/storage/" + data?.file}
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <button
                  className=" text-center justify-content-between gap-3 text-white d-flex "
                  style={{
                    borderRadius: "50px ",
                    backgroundColor: "rgb(0, 153, 171)",
                    padding: "6px 21px",
                    lineHeight: "normal",
                    fontSize: "17px",
                    marginRight: "15px",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {t("Download")} <img src={download} alt="" />
                </button>
              </a>{" "}
              <button
                onClick={() => navigate(`/chat/${data?.user_name}`)}
                className=" text-center text-white d-flex gap-3 justify-content-between "
                style={{
                  borderRadius: "50px ",
                  backgroundColor: "rgb(0, 153, 171)",
                  padding: "6px 21px",
                  lineHeight: "normal",
                  fontSize: "17px",
                  marginRight: "15px",
                  alignItems: "center",
                }}
              >
                {t("Send")} <img src={send} alt="" />
              </button>
            </a>
          </div>
          {page == "rate" ? (
            <RatesComment />
          ) : (
            <>
              {" "}
              <div className="projectCard contentRequest mb-3">
                <div className="add" style={{ padding: "15px 40px" }}>
                  <h4 className="fw-700 text-grey-900 font-xs my-2 mb-4">
                    {" "}
                    {t("Statistics")}
                  </h4>
                  <ul className="front">
                    <li className=" text-base	 text-grey-600 mb-2">
                      {t("Ratings")}
                      <span> {data?.avg_rate?.over_all} %</span>
                    </li>
                    <li className=" text-base	 text-grey-600 mb-2">
                      {t("Project Completion Rate")}
                      <span>
                        {" "}
                        {data?.avg_rate?.average_project_completion_rate} %
                      </span>
                    </li>
                    <li className=" text-base	 text-grey-600 mb-2">
                      {t("Re-Employment Rate")}
                      <span>
                        {" "}
                        {data?.avg_rate?.average_re_employment_rate} %
                      </span>
                    </li>
                    <li className=" text-base	 text-grey-600 mb-2">
                      {t("Time Delivery Rate")}
                      <span>
                        {" "}
                        {data?.avg_rate?.average_time_delivery_rate} %
                      </span>
                    </li>
                    <li className=" text-base	 text-grey-600 mb-2">
                      {t("Average Response Speed")}
                      <span> {data?.avg_rate?.average_response_speed} %</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="projectCard contentRequest mb-3">
                <div className="add p-3">
                  <h4 className="fw-700 text-grey-900 font-xs mt-1">
                    {" "}
                    {t("About me")}
                  </h4>
                  <p className="text-base	 text-grey-700 py-3">
                    {data?.about_me}
                  </p>
                </div>
              </div>
              {data?.skills.length > 0 && (
                <div className="projectCard contentRequest mb-3">
                  <div className="add" style={{ padding: "15px 40px" }}>
                    <h4 className="fw-700 text-grey-900 font-xs mt-1">
                      {" "}
                      {t("Skills")}
                    </h4>
                    <div className="singlePost">
                      <div style={{ justifyContent: "space-between" }}>
                        {data?.skills.length > 0 &&
                          data?.skills?.map((s, index) => (
                            <button
                              className={
                                index + 1 > 2
                                  ? `btn${Math.floor(index + 1 / 2)}  `
                                  : `btn${index + 1} `
                              }
                              key={index}
                            >
                              {t(s?.label)}
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {user?.id != data?.user_id && (
                <div className=" contentRequest mb-3">
                  <div className="add" style={{ padding: "15px 40px" }}>
                    <h4 className="fw-700 text-grey-900 font-xs my-2 mb-4">
                      {" "}
                      {t("Ratings")}
                    </h4>
                    <ul className="front">
                      <li
                        style={{ justifyContent: "space-between" }}
                        className="d-flex align-items-center justify-content-between w-100 text-base	 text-grey-600 mb-2"
                      >
                        <span className="w-100">
                          {t("Project Completion Rate")}
                        </span>
                        <div
                          className="d-flex w-100 align-items-center"
                          style={{ justifyContent: "end" }}
                        >
                          {" "}
                          <Rate
                            allowHalf
                            color="yellow"
                            value={project_completion_rate}
                            onChange={(value) => {
                              setproject_completion_rate(value);
                            }}
                          />
                        </div>
                      </li>
                      <li
                        style={{ justifyContent: "space-between" }}
                        className="d-flex align-items-center justify-content-between w-100 text-base	 text-grey-600 mb-2"
                      >
                        <span className="w-100">{t("Re-Employment Rate")}</span>
                        <div
                          className="d-flex w-100 align-items-center"
                          style={{ justifyContent: "end" }}
                        >
                          {" "}
                          <Rate
                            allowHalf
                            color="yellow"
                            value={re_employment_rate}
                            onChange={(value) => {
                              setre_employment_rate(value);
                            }}
                          />
                        </div>
                      </li>
                      <li
                        style={{ justifyContent: "space-between" }}
                        className="d-flex align-items-center justify-content-between w-100 text-base	 text-grey-600 mb-2"
                      >
                        <span className="w-100">{t("Time Delivery Rate")}</span>
                        <div
                          className="d-flex w-100 align-items-center"
                          style={{ justifyContent: "end" }}
                        >
                          {" "}
                          <Rate
                            allowHalf
                            color="yellow"
                            value={time_delivery_rate}
                            onChange={(value) => {
                              settime_delivery_rate(value);
                            }}
                          />
                        </div>
                      </li>
                      <li
                        style={{ justifyContent: "space-between" }}
                        className="d-flex align-items-center justify-content-between w-100 text-base	 text-grey-600 mb-2"
                      >
                        <span className="w-100">
                          {t("Average Response Speed")}
                        </span>
                        <div
                          className="d-flex w-100 align-items-center"
                          style={{ justifyContent: "end" }}
                        >
                          {" "}
                          <Rate
                            allowHalf
                            color="yellow"
                            value={response_speed}
                            onChange={(value) => {
                              setresponse_speed(value);
                            }}
                          />
                        </div>
                      </li>
                      {/* <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      /> */}

                      <div
                        className="formAddContent "
                        onClick={() => sendData()}
                      >
                        <div
                          className="d-block my-3"
                          style={{ textAlign: "end" }}
                        >
                          <button className="modelbtn">{t("Rate")}</button>
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
              )}
              {/* <div className="portfolio">
                <div className="resume p-2">
                  <p className="d-flex justify-content-xxl-between my-4">
                    {t("Ratings")}
                  </p>
                  <div style={{ color: "#303030" }}>
                    <div
                      className="Skills"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate(`/userCV/rate/${paramId}`);
                        localStorage.setItem("currentPage", "Profile");
                      }}
                    >
                      <span> &rarr; </span>
                      {t("Show all")} {t("Rate")}
                    </div>
                  </div>
                </div>
              </div> */}
            </>
          )}

          <style>
            {`
                
                
                 @media (max-width: 500px) {
                  .profile-pic {
                    top: -95px !important;
                    max-width: 90px !important;
                    margin-bottom: 17px;
                    } 
                    .add{
                        padding: 15px 10px!important;

                    }
                    li{
                        font-size: 15px !important;

                    }
                 }

                  `}
          </style>
        </section>
      )}
    </>
  );
}

export default UserCv;

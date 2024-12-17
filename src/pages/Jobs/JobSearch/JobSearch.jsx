// import React from "react";
import "./JobSearch.scss";
import { useTranslation } from "react-i18next";

import Picture from "../../../assets/images/Picture.png";
import { useNavigate } from "react-router-dom";
import AddJob from "./AddJob/AddJob";
import { FiltersBar } from "../../../components/ui";
import { filters } from "/public/filters";

function JobSearch() {
  const [t] = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="jobSearch">
      <AddJob />

      <div className="flex justify-center items-center px-4 pt-6">
        <FiltersBar width="md:max-w-6xl" filters={filters} />
      </div>

      {[...Array(6)].map((_, index) => (
        <div className="contentRequest" style={{ margin: "10px" }} key={index}>
          <div className="contentRequest" style={{ margin: "30px 5px" }}>
            <div className="add">
              <p
                style={{
                  color: "#25324B",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                <img src={Picture} alt="" />
                {t("Brand Designer")}
              </p>
              <p
                className="sm:px-14"
                style={{
                  color: "#7C8493",
                  marginTop: "-14",
                }}
              >
                I need a designer to make two logos and branding
              </p>
              <div className="singlePost py-4">
                <div className="sm:px-12 pb-2 sm:pb-0">
                  <button className="btn1">{t("Tool 1")}</button>

                  <button className="btn2">{t("Tool 2")}</button>

                  <button className="btn3">{t("Tool 3")}</button>
                </div>

                <button
                  className="btn4"
                  onClick={() => {
                    navigate("/portfolioJob");
                  }}
                >
                  {t("Hire me")}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* 644 */}
      <style>
        {`
                 @media (max-width: 644px) {
                  .singlePost{
                    display: block;

                  }              
                 `}
      </style>
    </div>
  );
}

export default JobSearch;

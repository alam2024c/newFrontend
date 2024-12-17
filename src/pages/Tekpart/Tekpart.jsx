import React from "react";
import { useTranslation } from "react-i18next";
import { BiPhone } from "react-icons/bi";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import { EmailIcon } from "react-share";
import logotekpart from "../../assets/images/logo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";

function Tekpart() {
  const themeColor = localStorage.getItem("themeColor");
  const [t, i18n] = useTranslation();

  return (
    <div className="information p-4">
      <div className="text-center w-100 d-flex mb-5 justify-content-center align-items-center">
        <img src={logotekpart} alt="" style={{ width: "120px" }} />
      </div>
      <ul>
        <li className="mb-4">
          <p className="text-2xl">{t("introduction")}</p>
        </li>
        {/* <li className="flex gap-5 flex-col md:flex-row md:space-x-4 mb-4">
          <div className="md:w-1/2 ">
            <h4 className="title text-2xl ">{t("visionTitle")}</h4>
            <p>{t("vision")}</p>
          </div>
          <div className="md:w-1/2  ">
            <h4 className="title text-2xl">{t("missionTitle")}</h4>
            <p>{t("mission")}</p>
          </div>
        </li> */}
        {/* <li className="mb-4">
          <h4 className="title">
            <span className="text-[#292e66] text-2xl">
              {t("whyUsTitle").split(" ")[0]}
            </span>
            <span className="text-[#1e6ab5] text-2xl">
              {" "}
              {t("whyUsTitle").split(" ")[1]}
            </span>
          </h4>
          <p>
            {t("whyUs")}
            <br />
            <br />
            <div className="flex flex-wrap -m-2">
              <div className="w-full md:w-1/3 mb-2">{t("integration")}</div>
              <div className="w-full md:w-1/3 mb-2">{t("speedInnovation")}</div>
              <div className="w-full md:w-1/3 mb-2">
                {t("customerFollowUp")}
              </div>
              <div className="w-full md:w-1/3 mb-2">
                {t("technicalServices")}
              </div>
              <div className="w-full md:w-1/3 mb-2">{t("afterSales")}</div>
              <div className="w-full md:w-1/3 mb-2">{t("mediaServices")}</div>
              <div className="w-full md:w-1/3 mb-2">
                {t("marketingServices")}
              </div>
            </div>
          </p>
        </li> */}
        <li className="mb-4">
          <h4 className="title text-4xl mb-3">{t("serviceTitle")}</h4>
          <div className="flex flex-wrap -m-2">
            <div className="w-full md:w-1/3 mb-2 text-2xl">
              {t("appDevelopment")}
            </div>
            <div className="w-full md:w-1/3 mb-2 text-2xl">
              {t("digitalMarketing")}
            </div>
            <div className="w-full md:w-1/3 mb-2 text-2xl">
              {t("customerFollowUp")}
            </div>
            <div className="w-full md:w-1/3 mb-2 text-2xl">
              {t("creativeDesign")}
            </div>
            <div className="w-full md:w-1/3 mb-2 text-2xl">
              {t("agencySolutions")}
            </div>
          </div>
        </li>
        <li className="mb-4">
          <h4 className="title text-2xl mb-3 text-4xl">{t("contactTitle")}</h4>
          <ul className="d-flex	 align-items-center justify-content-between mb-5  flex-wrap space-y-2">
            <li>
              <a
                dir=""
                href="https://wsend.co/966562005408"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 no-underline text-2xl"
              >
                <FaWhatsapp />

                <span style={{ direction: "ltr" }} className="text-2xl">
                  +966562005408
                </span>
              </a>
            </li>
            <li>
              <a
                dir=""
                href="https://wsend.co/201094260793"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 no-underline text-2xl"
              >
                <FaWhatsapp />

                <span style={{ direction: "ltr" }}>+201094260793</span>
              </a>
            </li>

            <li>
              <a
                href="mailto:info@tek-part.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 no-underline text-2xl"
              >
                <MdOutlineEmail />
                info@tek-part.com
              </a>
            </li>
          </ul>
          <ul className="d-flex align-items-center justify-content-center">
            <li>
              <a
                dir=""
                href="https://www.facebook.com/profile.php?id=61556684580004"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 no-underline text-2xl"
              >
                <FaMapMarkerAlt />

                <span style={{ direction: "ltr" }} className="text-2xl">
                  {" "}
                  المملكة العربية السعودية - الرياض
                </span>
              </a>
            </li>
          </ul>
          {/* <ul className="contact_us d-flex align-items-center justify-content-between flex-wrap space-y-2">
            <li>
              <a
                dir=""
                href="https://wsend.co/966562005408"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 no-underline"
              >
                <FaInstagram />

                <span style={{ direction: "ltr" }}>Instgram</span>
              </a>
            </li>

            <li>
              <a
                dir=""
                href="https://www.facebook.com/profile.php?id=61556684580004"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 no-underline"
              >
                <FaFacebookF />

                <span style={{ direction: "ltr" }}>facebook</span>
              </a>
            </li>
          </ul> */}
        </li>
      </ul>
    </div>
  );
}

export default Tekpart;

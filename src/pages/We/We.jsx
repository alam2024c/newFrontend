import React from "react";
import { useTranslation } from "react-i18next";
import { MdEmail } from "react-icons/md";

function We() {
  const themeColor = localStorage.getItem("themeColor");
  const [t, i18n] = useTranslation();

  return (
    <div className="max-w-4xl m-auto pt-5 p-3">
      <h3 className={`font-xxl fw-bolder text-current mb-4`}>
        {t("whoarewe")}{" "}
      </h3>
      <div className="mb-5">
        <p>
          {t(
            "We are a dedicated educational social media platform designed to connect students, educators, and lifelong learners from around the world. Our mission is to foster a supportive and collaborative learning community where users can share knowledge, exchange ideas, and grow together."
          )}
        </p>
      </div>
      <div className="mb-5">
        <h3 className={`font-xxl fw-bolder text-current mb-4`}>
          {t("At 3lm, you can:")}
        </h3>
        <ul>
          <li>{t("Join study groups and discussion forums")}</li>
          <li>{t("Access a wealth of educational resources and materials")}</li>
          <li>{t("Participate in live webinars and online classes")}</li>
          <li>{t("Connect with educators and peers")}</li>
          <li>
            {t("Stay updated with the latest educational trends and news")}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default We;

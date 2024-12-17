import { useState } from "react";
import { alphabet, language } from ".";
import { Button } from "../../../components/ui";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ChooseLanguage() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [t, i18n] = useTranslation();

  const navigate = useNavigate();
  const handleLanguageClick = (language) => {
    setSelectedLanguage(language);
    if (language == "English") {
      i18n.changeLanguage("en");
      document.body.classList.add("en");
      localStorage.setItem("lang", "en");
    } else {
      i18n.changeLanguage("ar");
      document.body.classList.remove("en");
      localStorage.setItem("lang", "ar");
    }
  };

  const handleBackClick = () => {
    navigate("/checkcode");
  };

  const handleNextClick = () => {
    // Handle next button click
    // You can use the selectedLanguage state here
    if (selectedLanguage) {
      // Navigate to the home page or your desired destination
      navigate("/chooseColor");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center sm:text-center gap-20 m-2 md:p-7">
      <div>
        <p className="text-3xl pb-12">
          {t("Please answer those Questions To get more details ..")}
        </p>
        <p className="text-xl">{t("What language do you prefer ?")}</p>
      </div>
      <div
        className="flex justify-center items-center sm:gap-8 gap-4 "
        dir="ltr"
        style={{ direction: "ltr" }}
      >
        <button
          className={`flex flex-col justify-center items-center gap-4 border shadow-sm rounded-3xl w-32 h-32 ${
            selectedLanguage === "English" ? "selected" : ""
          }`}
          onClick={() => handleLanguageClick("English")}
        >
          <img className="w-16 h-16" src={language} alt="" />
          <p className="text-sm font-black">{"English"}</p>
        </button>
        <button
          className={`flex flex-col justify-center items-center gap-4 border shadow-sm rounded-3xl w-32 h-32 ${
            selectedLanguage === "Arabic" ? "selected" : ""
          }`}
          onClick={() => handleLanguageClick("Arabic")}
        >
          <img className="w-16 h-16" src={alphabet} alt="" />
          <p className="text-sm font-black">{"العربية"}</p>
        </button>
      </div>
      <div className="flex sm:flex-row flex-col justify-center sm:justify-between items-center gap-8">
        <Button
          className={`px-14 capitalize rounded-lg ${
            selectedLanguage ? "active" : "inactive"
          }`}
          backgroundColor={selectedLanguage ? "rgb(124, 201, 209)" : "#B9BCBE"}
          onClick={handleNextClick}
          children={t("next")}
        />

        <Button
          className="px-14 capitalize rounded-lg border-0"
          onClick={handleBackClick}
          children={t("back")}
        />
      </div>
    </div>
  );
}

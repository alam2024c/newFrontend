import { useState } from "react";
import {
  StaticSection,
  ActionSection,
  RegisterForm,
  LoginForm,
  ForgetPassword,
  ChooseLanguage,
  ChooseColor,
} from "./components";
import CheckYourEmail from "./components/CheckYourEmail";
import ResetYourPassword from "./components/ResetYourPassword";
import PasswordChanged from "./components/PasswordChanged";
import "./WelcomePage.scss";
import { useTranslation } from "react-i18next";
import ChangeLang from "./components/loginForm/ChangeLang";

export default function WelcomePage() {
  const lang = localStorage.getItem("direction");
  const [currentState, setCurrentState] = useState("action");
  const [isRegistering, setIsRegistering] = useState(false);
  // const [currentState, setCurrentState] = useState("login");

  const [t, i18n] = useTranslation();
  const sectionText =
    currentState === "login" ? t("WELCOME BACK!") : t("JOIN US NOW");

  const pickLogin = () => {
    setCurrentState("login");
  };

  const pickRegister = () => {
    setCurrentState("register");
  };
  const handleButtonClickDark = (e) => {
    if (e === "en") {
      i18n.changeLanguage("en");
      document.body.classList.add("en");
      localStorage.setItem("lang", "en");
      localStorage.setItem("direction", "ltr");
    } else {
      i18n.changeLanguage("ar");
      document.body.classList.remove("en");
      localStorage.setItem("lang", "ar");
      localStorage.setItem("direction", "rtl");
    }
  };
  return (
    <section className={`welcomePageWrapper ${isRegistering ? "" : ""}`}>
      <ChangeLang />
      {/* <PasswordChanged /> */}
      {/* <select
        aria-label="Default select example"
        className="px-3 mx-5"
        style={{
          width: "fit-content",
          background: "transparent",
          outline: "none",
          border: "none",
        }}
        value={i18n.language}
        placeholder={t("Select Language")}
        onChange={(e) => handleButtonClickDark(e.target.value)}
      >
        <option value={"en"}>English</option>
        <option value={"ar"}>{t("Arabic")}</option>
      </select> */}
      <div
        className={`welcomePage grid rounded-[3rem] shadow-2xl ${
          isRegistering ? "grid-cols-1 sm:w-3/4 " : "grid-cols-2"
        }`}
      >
        <>
          {isRegistering ? <></> : <StaticSection sectionText={sectionText} />}

          <>
            {currentState === "action" && (
              <ActionSection
                pickLogin={pickLogin}
                pickRegister={pickRegister}
              />
            )}
            {currentState === "login" && (
              <LoginForm pickRegister={pickRegister} />
            )}
            {currentState === "register" && (
              <RegisterForm
                pickLogin={pickLogin}
                setIsRegistering={setIsRegistering}
              />
            )}
          </>
        </>
      </div>
    </section>
  );
}

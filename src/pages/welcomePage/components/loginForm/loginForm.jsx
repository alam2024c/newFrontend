import { Button, Input } from "../../../../components/ui";
import { google } from "../../../../assets/images/icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginSocialGoogle } from "reactjs-social-login";
import "./loginForm.scss";
import React from "react";
import englishFlag from "../../../../assets/226-united-states.svg"; // أضف صورة علم الإنجليزية هنا
import arabicFlag from "../../../../assets/008-saudi-arabia.svg";
import { loginUser } from "../../../../rtk/slices/authSlice";
import StaticSection from "../staticSection/staticSection";
import { useTranslation } from "react-i18next";
import ChangeLang from "./ChangeLang";

export default function LoginForm({ pickRegister }) {
  const [isRemembered, setIsRemembered] = useState(
    !!localStorage.getItem("remembered")
  );
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;

  const [email, setEmail] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData")).email
      : ""
  );

  const [password, setPassword] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData")).password
      : ""
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error, msg } = useSelector((state) => state.auth);
  const [loading, setLoading] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  useEffect(() => {
    // redirect user to login page if registration was successful
    if (error) navigate("/login");
    // redirect authenticated user to profile screen
    if (user) navigate("/home");
  }, [navigate, user, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let user = {
      email,
      password,
    };
    setLoading(true);
    dispatch(loginUser({ user, setLoading }));
    // try {
    // } finally {
    // setLoading(false);
    // }
  };

  useEffect(() => {
    if (isRemembered) {
      const rememberData = JSON.parse(localStorage.getItem("loginData"));
      setTimeout(() => {
        setEmail(rememberData.email);
        setPassword(rememberData.password);
      }, 500);
    }
  }, [isRemembered]);
  const [t, i18n] = useTranslation();

  const [isRegistering, setIsRegistering] = useState(false);
  const sectionText = t("WELCOME BACK!");
  const handleButtonClickDark = (e) => {
    setDropdownOpen(false);
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
  const menuRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef?.current?.contains(e.target)) {
        // inside click

        return;
      } else {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [menuRef]);
  return (
    <section className={`welcomePageWrapper `}>
      {/* <PasswordChanged /> */}
      <ChangeLang />

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
            {/* not connected to the routs yet yet */}
            {/* <ForgetPassword /> */}
            {/* <CheckYourEmail /> */}
            {/* <ResetYourPassword /> */}
            {/* <ChooseLanguage /> */}
            {/* <ChooseColor /> */}
          </>

          <div className="LoginFormWrapper">
            <form
              className="LoginForm"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <p className="LoginForm__header">{t("Login to your Account")}</p>

              <Input
                label={t("Email")}
                inputID="loginEmail"
                type="text"
                name="email"
                className="p-2"
                placeholder={t("Email address")}
                value={email}
                required={true}
                handleChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label={t("Password")}
                inputID="loginPassword"
                type="password"
                name="password"
                className="p-2"
                placeholder={t("Password")}
                value={password}
                required={true}
                handleChange={(e) => setPassword(e.target.value)}
              />
              <p style={{ color: "red", fontSize: "15px" }}>
                {msg && t("The password or email does not match")}
              </p>
              <div className="options d-flex align-items-end justify-content-end">
                {/* <Input
                  label={t("remember me?")}
                  inputID="remember"
                  type="checkbox"
                  name="remember"
                  className="p-2"
                  checked={isRemembered}
                  onChange={() => {
                    setIsRemembered(!isRemembered);
                  }}
                /> */}
                <Link to="/enter-email">{t("forgot password?")}</Link>
              </div>
              <div className="w-full">
                {loading ? (
                  <Button className="w-full p-2" children={t("Log in")} />
                ) : (
                  <Button
                    className="w-full p-2"
                    color={"#fff"}
                    backgroundColor={"#0099ab"}
                    children={t("Log in")}
                  />
                )}
              </div>
            </form>

            <a href={`${URL}/api/auth/google`} rel="noopener noreferrer">
              {" "}
              <Button
                className="flex w-full justify-center items-center p-2"
                backgroundColor="#233142"
              >
                <img src={google} alt="" />
                <p>{t("Continue with Google")}</p>
              </Button>
            </a>

            <p className="footer ">
              {t("Don't have an account?")}
              <span onClick={() => navigate("/register")}>{t("Sign Up")}</span>
            </p>
          </div>
        </>
      </div>
    </section>
  );
}

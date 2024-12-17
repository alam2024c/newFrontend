import { Button, Input } from "../../../../components/ui";
import { google } from "../../../../assets/images/icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./loginForm.scss";
import React from "react";
import englishFlag from "../../../../assets/226-united-states.svg"; // أضف صورة علم الإنجليزية هنا
import arabicFlag from "../../../../assets/Flag_of_Jordan.svg.png";
import { loginUser } from "../../../../rtk/slices/authSlice";
import StaticSection from "../staticSection/staticSection";
import { useTranslation } from "react-i18next";

export default function ChangeLang({ pickRegister }) {
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
    debugger
    setDropdownOpen(false);
    if (e === "en") {
      i18n.changeLanguage("en");
      document.body.classList.add("en");
      document.body.classList.remove("ar");
      localStorage.setItem("lang", "en");
      localStorage.setItem("direction", "ltr");
    } else {
      i18n.changeLanguage("ar");
          document.body.classList.add("ar");
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
    <div
      ref={menuRef}
      className="relative m-5   inline-block text-left"
      style={{ width: "fit-content" }}
    >
      <div>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          type="button"
          className="inline-flex justify-center  rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        >
          {i18n.language === "en" ? (
            // <img src={englishFlag} alt="English" className="w-7 " />
            <>EN</>
          ) : (
            // <img src={arabicFlag} alt="Arabic" className="w-7 " />
            <>AR</>
          )}
          {/* {i18n.language === "en" ? "English" : "Arabic"} */}
          {/* <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.292 7.292a1 1 0 011.414 0L10 10.586l3.293-3.294a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg> */}
        </button>
      </div>
      {dropdownOpen && (
        <div
          className={`origin-top-right absolute ${
            i18n.language === "ar" ? " right-0 " : " left-0 "
          } mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          <div className="py-1">
            <button   hover:bg-gray-200 
              onClick={() => handleButtonClickDark("en")}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200  dark:hover:bg-gray-800  gap-2 flex items-center"
            >
              {/* <img src={englishFlag} alt="English" className="h-5 w-5 mr-2" />{" "} */}
              English
            </button>
            <button
              onClick={() => handleButtonClickDark("ar")}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:dark:bg-gray-800 hover:bg-gray-100 flex gap-2 items-center"
            >
              {/* <img src={arabicFlag} alt="Arabic" className="h-5 w-5 mr-2" />{" "} */}
              {t("Arabic")}
            </button>

      
          </div>
        </div>
      )}
    </div>
  );
}

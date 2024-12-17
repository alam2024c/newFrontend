import { Button, Input } from "../../../components/ui";
import { google } from "../../../assets/images/icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginSocialGoogle } from "reactjs-social-login";
import "./loginForm/loginForm.scss";
import React from "react";
import axios from "axios";
import { t } from "i18next";
import { emailCheck, loginUser } from "../../../rtk/slices/authSlice";
import StaticSection from "./staticSection/staticSection";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import CheckReset from "./CheckReset";

export default function EnterEmail({}) {
  const [page, setPage] = useState(1);
  const [isRegistering, setIsRegistering] = useState(false);

  const [email, setEmail] = useState("");
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   // Create an object with the form values
  //   const data = {
  //     email: email,
  //   };

  //   // Call the updateData function with the form values
  //   updateData(data);
  // };
  const updateData = async () => {
    const data = { email };
    setLoading(true);
    try {
      const res = await axios.post(URL + "/api/password/forgot", data, {
        headers: {},
      });
      localStorage.setItem("email-helent", email);
      dispatch(emailCheck(email));
      toast.success(res.data.msg);
      setLoading(false);
      setPage(2);

      // navigate("/check-code");
    } catch (err) {
      setLoading(false);
    }
  };
  const direction = localStorage.getItem("direction");

  const navigate = useNavigate();
  return (
    <>
      {page == 2 ? (
        <CheckReset />
      ) : (
        <section className={`welcomePageWrapper `}>
          {/* <PasswordChanged /> */}

          <div
            className={`welcomePage grid rounded-[3rem] shadow-2xl ${
              isRegistering ? "grid-cols-1 sm:w-3/4 " : "grid-cols-2"
            }`}
          >
            <>
              {isRegistering ? (
                <></>
              ) : (
                <StaticSection sectionText={t("Enter Email")} />
              )}

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
                    e.preventDefault();
                    updateData(e);
                  }}
                >
                  <p className="LoginForm__header">
                    {t("Login to your Account")}
                  </p>

                  <Input
                    label={t("Enter Email")}
                    inputID="loginEmail"
                    type="text"
                    name="email"
                    className="p-2 mb-4"
                    placeholder={t("Email address")}
                    value={email}
                    required={true}
                    handleChange={(e) => setEmail(e.target.value)}
                  />

                  <div className="w-full">
                    {loading ? (
                      <Button className="w-full p-2" children={t("Done")} />
                    ) : (
                      <Button
                        className="w-full p-2"
                        color={"#fff"}
                        backgroundColor={"#0099ab"}
                        children={t("Done")}
                      />
                    )}
                  </div>
                </form>

                <p className="footer">
                  {t("Don't have an account?")}
                  <span onClick={() => navigate("/register")}>
                    {t("Sign Up")}
                  </span>
                </p>
              </div>
            </>
          </div>
        </section>
      )}
    </>
  );
}

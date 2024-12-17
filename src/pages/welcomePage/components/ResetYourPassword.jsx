import { Button, Input } from "../../../components/ui";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginSocialGoogle } from "reactjs-social-login";

import React from "react";
import axios from "axios";
import { t } from "i18next";
import { loginStart, loginUser } from "../../../rtk/slices/authSlice";
import StaticSection from "./staticSection/staticSection";

export default function ResetYourPassword({ pickRegister }) {
  const [isRemembered, setIsRemembered] = useState(
    !!localStorage.getItem("remembered")
  );
  const { user, error, email, tokenTset } = useSelector((state) => state.auth);

  const [password, setPassword] = useState("");
  const [password_confirmation, setpassword_confirmation] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (error) navigate("/login");
    // redirect authenticated user to profile screen
    if (user) navigate("/home");
  }, [navigate, user, error]);

  useEffect(() => {
    if (isRemembered) {
      const rememberData = JSON.parse(localStorage.getItem("loginData"));
      setTimeout(() => {
        setEmail(rememberData.email);
        setPassword(rememberData.password);
      }, 500);
    }
  }, [isRemembered]);

  const [isRegistering, setIsRegistering] = useState(false);
  const sectionText = t("WELCOME BACK!");
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;

  const handleSubmit = async () => {
    setLoading(true);
    const data = { password, password_confirmation, token: email };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(`${URL}/api/password/reset`, data, config);
      dispatch(loginStart(res.data));
      navigate("/");
      // setStep(2);

      setLoading(false);
      // return res.data;
    } catch (error) {
      // return custom error message from backend if present
      setLoading(false);
      if (
        error.response.data.data.email &&
        error.response.data.data.email.length > 0
      ) {
        toast.error(error.response.data.data.email[0]);
      }

      if (
        error.response.data.data.phone &&
        error.response.data.data.phone.length > 0
      ) {
        toast.error(error.response.data.data.phone[0]);
      }
    }

    // dispatch(signUpUser({ user, setLoading }));
  };
  return (
    <section className={`welcomePageWrapper `}>
      {/* <PasswordChanged /> */}

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
              className="pb-12"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <div className="grid pb-12 gap-3">
                <p className="text-lg">{"Reset your password"}</p>
                <p className="text-xs max-w-md">
                  {
                    "Use at least 8 characters,including both numbers and letters"
                  }
                </p>
              </div>

              <div className="grid gap-4 pb-10">
                <Input
                  label="New password"
                  inputID="password"
                  type="password"
                  name="password"
                  className="px-2"
                  handleChange={(e) => setPassword(e.target.value)}
                />

                <Input
                  label="confirm new password"
                  inputID="loginPassword"
                  type="password"
                  name="password"
                  className="px-2"
                  handleChange={(e) => setpassword_confirmation(e.target.value)}
                />
              </div>

              <Button className="w-full rounded-xl p-2" children="done" />
            </form>
          </div>
        </>
      </div>
    </section>
  );
}

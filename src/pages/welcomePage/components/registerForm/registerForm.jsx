import { useEffect, useState } from "react";
import { Button, Input } from "../../../../components/ui";
import { close, google } from "../../../../assets/images/icons";
import "./RegisterForm.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { t } from "i18next";
import StaticSection from "../staticSection/staticSection";
import ChangeLang from "../loginForm/ChangeLang";
import { useTranslation } from "react-i18next";
export default function RegisterForm({ pickLogin }) {
  const [userName, setUserName] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let user = {
      user_name: userName,
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      password: password,
      password_confirmation: password_confirmation,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      setLoading(true);

      // Send data to the backend using axios
      const response = await axios.post(`${URL}/api/register`, user, config);

      setLoading(false);

      navigate("/checkcode", { state: { email } });
    } catch (error) {
      // Handle errors
      console.error(error);
      setError(error?.response?.data?.data);
    } finally {
      setLoading(false);
    }
  };

  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [t, i18n] = useTranslation();
  const validatePassword = (value) => {
    const hasUppercaseLetter = /[A-Z]/.test(value);
    const hasLowercaseLetter = /[a-z]/.test(value);
    const hasNumberDigit = /[0-9]/.test(value);

    setHasUppercase(hasUppercaseLetter);
    setHasLowercase(hasLowercaseLetter);
    setHasNumber(hasNumberDigit);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const [isRegistering, setIsRegistering] = useState(false);
  const sectionText = t("JOIN US NOW");

  return (
    <section className={`welcomePageWrapper `}>
      {/* <PasswordChanged /> */}
      <ChangeLang />

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
          </>{" "}
          <div className="RegisterFormWrapper ">
            <form
              className="registerForm w-100"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <p className="registerForm__header">
                {t("Login to your Account")}
              </p>
              <Input
                label={t("User Name")}
                inputID="username"
                type="text"
                name="username"
                placeholder={"ex.moAli@12"}
                className="py-3"
                required={true}
                // value={userName}
                handleChange={(e) => setUserName(e.target.value)}
              />
              {error?.username?.map((errorMsg, index) => (
                <span className="text-danger ">{errorMsg}</span>
              ))}
              <div className="w-100">
                <Input
                  label={t("First name")}
                  inputID="first_name"
                  type="text"
                  name="first_name"
                  placeholder={"ex.ali"}
                  className="py-3"
                  required={true}
                  // value={first_name}
                  handleChange={(e) => setFirstName(e.target.value)}
                />
                {error?.first_name?.map((errorMsg, index) => (
                  <span className="text-danger ">{errorMsg}</span>
                ))}
                <Input
                  label={t("Last name")}
                  inputID="last_name"
                  type="text"
                  name="last_name"
                  placeholder={"ex.mohamed"}
                  className="py-3"
                  required={true}
                  // value={last_name}
                  handleChange={(e) => setLastName(e.target.value)}
                />{" "}
                {error?.last_name?.map((errorMsg, index) => (
                  <span className="text-danger ">{errorMsg}</span>
                ))}
              </div>
              <div className="">
                <Input
                  label={t("Email")}
                  inputID="email"
                  type="email"
                  name="email"
                  placeholder={"ex.ali@gmail.com"}
                  className="py-3"
                  required={true}
                  // value={email}
                  handleChange={(e) => setEmail(e.target.value)}
                />{" "}
                {error?.email?.map((errorMsg, index) => (
                  <span className="text-danger ">{errorMsg}</span>
                ))}
                <Input
                  label={t("Phone number")}
                  inputID="phone"
                  type="tel"
                  name="phone"
                  className="py-3"
                  required={true}
                  // value={phone}
                  handleChange={(e) => setPhone(e.target.value)}
                />{" "}
                {error?.phone?.map((errorMsg, index) => (
                  <span className="text-danger ">{errorMsg}</span>
                ))}
              </div>
              <Input
                label={t("Password")}
                inputID="loginPassword"
                type="password"
                name="password"
                placeholder={"Password"}
                className="py-3"
                required={true}
                // value={password}
                handleChange={handlePasswordChange}
              />{" "}
              {error?.password?.map((errorMsg, index) => (
                <span className="text-danger ">{errorMsg}</span>
              ))}
              <Input
                label={t("Confirm password")}
                inputID="password_confirmation"
                type="password"
                name="password_confirmation"
                placeholder={"Password"}
                className="py-3"
                required={true}
                // value={password_confirmation}
                handleChange={(e) => setPassword_confirmation(e.target.value)}
              />{" "}
              {error?.password_confirmation?.map((errorMsg, index) => (
                <span className="text-danger ">{errorMsg}</span>
              ))}
              <div className="registerForm__validation p-5">
                <>
                  {password && (
                    <>
                      {" "}
                      {!hasUppercase ? (
                        <div className="conditions text-red-700 d-flex align-items-center">
                          *
                          <p className="text-red-700">
                            {t("doesn`t contain a capital letter")}
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                      {!hasLowercase && (
                        <div className="conditions text-red-700 d-flex align-items-center">
                          *
                          <p className="text-red-700">
                            {t("doesn`t contain a small letter")}
                          </p>
                        </div>
                      )}
                      {!hasNumber && (
                        <div className="conditions text-red-700 d-flex align-items-center">
                          *
                          <p className="text-red-700">
                            {t("doesn`t contain a number")}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </>

                {/* <div className="flex justify-start">
                  <Input
                    label={t(
                      "I agree to the terms and conditions and privacy policy"
                    )}
                    inputID="conditions"
                    type="checkbox"
                    className="py-3"
                    name="conditions"
                    onClick={() => setConditions(!conditions)}
                  />
                </div> */}
              </div>
              {loading ? (
                <Button
                  children={t("Sign Up")}
                  type="submit"
                  className="w-full p-2 mb-2"
                />
              ) : (
                <Button
                  children={t("Sign Up")}
                  type="submit"
                  className="w-full p-2 mb-2"
                  color={"#fff"}
                  backgroundColor={"#0099ab"}
                />
              )}
            </form>
            <a href={`${URL}/api/auth/google`} rel="noopener noreferrer">
              <Button
                className="flex  w-full justify-center items-center p-2 mb-1"
                backgroundColor="#233142"
              >
                <img src={google} alt="" />
                <p>{t("Continue with Google")}</p>
              </Button>
            </a>
            <Link to={"/login"}>
              <p className="footer mt-3">
                {t("Have an account?")}{" "}
                <span onClick={pickLogin}> {t("Log in")} </span>
              </p>
            </Link>
          </div>
        </>
      </div>
    </section>
  );
}

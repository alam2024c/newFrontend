import { useEffect, useRef, useState } from "react";
import { Button } from "../../../components/ui";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StaticSection from "./staticSection/staticSection";
import { t } from "i18next";
import { toast } from "react-toastify";

export default function CheckYourEmail({ email }) {
  const location = useLocation();
  const Email = location.state?.email || "";
  const navigate = useNavigate();
  const formRef = useRef(null);
  const inputsRef = useRef([]);
  const [count, setCount] = useState(180);
  useEffect(() => {
    const form = formRef.current;
    const inputs = form.querySelectorAll("input");

    const KEYBOARDS = {
      backspace: 8,
      arrowLeft: 37,
      arrowRight: 39,
    };

    const handleInput = (e) => {
      const input = e.target;
      const nextInput = input.nextElementSibling;
      if (nextInput && input.value) {
        nextInput.focus();
        if (nextInput.value) {
          nextInput.select();
        }
      }
    };

    const handlePaste = (e) => {
      e.preventDefault();
      const paste = e.clipboardData.getData("text");
      inputs.forEach((input, i) => {
        input.value = paste[i] || "";
      });
    };

    const handleBackspace = (e) => {
      const input = e.target;
      if (input.value) {
        input.value = "";
        return;
      }

      input.previousElementSibling.focus();
    };

    const handleArrowLeft = (e) => {
      const previousInput = e.target.previousElementSibling;
      if (!previousInput) return;
      previousInput.focus();
    };

    const handleArrowRight = (e) => {
      const nextInput = e.target.nextElementSibling;
      if (!nextInput) return;
      nextInput.focus();
    };

    form.addEventListener("input", handleInput);
    inputs[0].addEventListener("paste", handlePaste);

    inputs.forEach((input) => {
      input.addEventListener("focus", (e) => {
        setTimeout(() => {
          e.target.select();
        }, 0);
      });

      input.addEventListener("keydown", (e) => {
        switch (e.keyCode) {
          case KEYBOARDS.backspace:
            handleBackspace(e);
            break;
          case KEYBOARDS.arrowLeft:
            handleArrowLeft(e);
            break;
          case KEYBOARDS.arrowRight:
            handleArrowRight(e);
            break;
          default:
        }
      });
    });

    // Cleanup event listeners
    return () => {
      form.removeEventListener("input", handleInput);
      inputs[0].removeEventListener("paste", handlePaste);
      inputs.forEach((input) => {
        input.removeEventListener("focus", (e) => {
          setTimeout(() => {
            e.target.select();
          }, 0);
        });
        input.removeEventListener("keydown", (e) => {
          switch (e.keyCode) {
            case KEYBOARDS.backspace:
              handleBackspace(e);
              break;
            case KEYBOARDS.arrowLeft:
              handleArrowLeft(e);
              break;
            case KEYBOARDS.arrowRight:
              handleArrowRight(e);
              break;
            default:
          }
        });
      });
    };
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      if (count > 0) {
        setCount(count - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [count]);

  const [loading, setLoading] = useState(false);
  // const [code, setCode] = useState(["", "", "", ""]);
  // const [numericCode, setnumericCode] = useState("");
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const codeValues = inputsRef.current.map((input) => input.value);

    // Combine the input values into a single string
    const combinedCode = inputValues.join("");
    const numericCode = codeValues.join("");
    let data = {
      email: Email,
      otp: numericCode,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post(`${URL}/api/code_verified`, data, config);

      // Handle success
      navigate("/language");
    } catch (error) {
      console.error("Error in API call:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    // setLoading(true);
    // setCount(180);
    let data = {
      email: Email,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          withCredentials: false,
        },
      };
      const res = await axios.post(`${URL}/api/resend_code`, data, config);
      toast.success(res.data.msg);
      if (res.data.status == 201) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      // setLoading(false);
      setLoading(false);
      // setError(true);
    }
  };

  const inputsNumber = 4;
  const [inputValues, setInputValues] = useState(Array(inputsNumber).fill(""));
  const inputRefs = Array.from({ length: inputsNumber }, () => useRef(null));

  // useEffect(() => {
  //   focusOnFirstEmptyInput();
  // }, []);
  const [isRegistering, setIsRegistering] = useState(false);
  const sectionText = t("WELCOME BACK!");
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

          <form className="flex flex-col justify-center items-center gap-5 mb-28">
            <div className="grid pb-8 gap-3">
              <p className="text-lg">{t("Check your email")}</p>
              <p className="text-xs max-w-md">
                {t("We've sent a code to")}
                {` ${Email}`}{" "}
              </p>
            </div>

            {/* <ul className="flex gap-2 pb-8">
              {Array(inputsNumber)
                .fill()
                .map((_, index) => (
                  <li className="w-12 h-12" key={index}>
                    <input
                      type="text"
                      name={`input${index + 1}`}
                      id={`input${index + 1}`}
                      pattern="[0-9]"
                      maxLength={1}
                      value={inputValues[index]}
                      onChange={(e) => handleChange(index, e.target.value)}
                      ref={inputRefs[index]}
                      className="w-full h-full rounded-xl p-3"
                    />
                  </li>
                ))}
            </ul> */}
            <div className="form-style" style={{ textAlign: "end" }}>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div action="#" className="codeform" dir="ltr" ref={formRef}>
                  <div
                    className="d-flex mb-3"
                    style={{ justifyContent: "center", direction: "ltr" }}
                  >
                    <input
                      type="tel"
                      maxLength="1"
                      pattern="[0-9]"
                      className="form-control"
                      placeholder="-"
                      ref={(el) => (inputsRef.current[0] = el)}
                    />
                    <input
                      type="tel"
                      maxLength="1"
                      pattern="[0-9]"
                      className="form-control"
                      placeholder="-"
                      ref={(el) => (inputsRef.current[1] = el)}
                    />
                    <input
                      type="tel"
                      maxLength="1"
                      pattern="[0-9]"
                      className="form-control"
                      placeholder="-"
                      ref={(el) => (inputsRef.current[2] = el)}
                    />
                    <input
                      type="tel"
                      maxLength="1"
                      pattern="[0-9]"
                      className="form-control"
                      placeholder="-"
                      ref={(el) => (inputsRef.current[3] = el)}
                    />
                  </div>
                </div>
              </form>
            </div>

            <Button
              className="w-full rounded-lg"
              onClick={handleSubmit}
              children={t("Send Code")}
              disabled={loading}
            />

            {loading ? (
              <p className="text-xs">Sending code...</p>
            ) : (
              <p className="text-xs">
                {t("I didn’t receive the code")}{" "}
                <span
                  onClick={handleResendCode}
                  className="capitalize text-[#0099AB] cursor-pointer	"
                >
                  {t("resend")}
                </span>
              </p>
            )}
          </form>
        </>
      </div>
    </section>
  );
}

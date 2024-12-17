import suitcase from "../../assets/images/suitcase.png";
import hospital from "../../assets/images/hospital.png";
import nutrition from "../../assets/images/nutrition.png";
import stethoscope from "../../assets/images/stethoscope.png";
import Vector from "../../assets/images/Vector.png";

import ButtonsForm from "../../components/buttonsForm/buttonsForm";
import Card from "../../components/card/card";
import { useState } from "react";
import Jobs from "../jobs/jobs";
import Nutrition from "../nutrition/nutrition";
import Places from "../places/places";
import Doctor from "../doctor/doctor";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { loginStart } from "../../rtk/slices/authSlice";

const ProviderProfile = () => {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [t] = useTranslation();
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [typeProvider, settypeProvider] = useState(1);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    setLoading(true);
    let data = {
      email: user?.email,
      job: "other",
    };
    console.log(data);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(`${URL}/api/add_job`, data, config);
      console.log(res);
      toast.success("Updated");
      console.log(res);
      navigate("/language");
      dispatch(loginStart(res.data.data));
      setLoading(false);
      // return res.data;
    } catch (error) {
      // return custom error message from backend if present
      setLoading(false);
      console.log(error, "error");
      toast.error(error?.response?.data?.msg);
    }
  };
  return (
    <>
      {typeProvider === 1 ? (
        <div className="container">
          <div className="row m-5 no-gutters">
            <div className="bg-white p-5">
              <h1 className="title" style={{ marginBottom: "66px" }}>
                {" "}
                {t("Who is the service provider?")}
              </h1>

              <div className="form-style" style={{ textAlign: "center" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginBottom: "100px",
                    flexFlow: "wrap",
                  }}
                >
                  <Card
                    name={"4"}
                    type={type}
                    setType={setType}
                    imageSrc={nutrition}
                    title={t("nourishment")}
                  />
                  <Card
                    name={"5"}
                    type={type}
                    setType={setType}
                    imageSrc={stethoscope}
                    title={t("Doctor")}
                  />

                  <Card
                    name={"2"}
                    type={type}
                    setType={setType}
                    imageSrc={suitcase}
                    title={t("Jobs")}
                  />
                  <Card
                    name={"3"}
                    type={type}
                    setType={setType}
                    imageSrc={hospital}
                    title={t("Places")}
                  />
                  <Card
                    name={"1"}
                    type={type}
                    setType={setType}
                    imageSrc={Vector}
                    title={t("other")}
                  />
                </div>

                <form
                  className="btnform"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "1rem",
                    marginTop: "3.5rem",
                  }}
                >
                  <div className="pb-2">
                    <button
                      type="submit"
                      disabled
                      className="btn btn-dark font-weight-bold logbtn"
                      style={{
                        backgroundColor: "#D9D9D9",
                        borderRadius: "16px",
                        width: "250px",
                        maxWidth: "100%",
                        fontSize: "24px",
                        fontWeight: "600",
                        letterSpacing: "1px",
                        border: "none",
                      }}
                      onClick={() => navigate(prev)}
                    >
                      السابق
                    </button>
                  </div>
                  <div className="pb-2">
                    <button
                      type="submit"
                      className="btn btn-dark font-weight-bold logbtn"
                      style={{
                        background: "linear-gradient(#00ACFF75, #BD00FF58)",
                        borderRadius: "16px",
                        width: "250px",
                        maxWidth: "100%",
                        fontSize: "24px",
                        fontWeight: "600",
                        letterSpacing: "1px",
                        border: "none",
                      }}
                      disabled={!type}
                      onClick={(e) => {
                        if (type == "1") {
                          e.preventDefault();
                          handleSubmit();
                        } else {
                          settypeProvider("2");
                        }
                      }}
                      // onClick={() => navigate(next)}
                    >
                      {t("Next")}
                    </button>
                  </div>
                  <style>
                    {`
          @media (max-width: 768px) {
            .logbtn {
              width: 289px;
            }
          }
          @media (max-width: 1018px) {
            .btnform {
                justify-content: center!important;

            }
          }
        `}
                  </style>
                </form>
              </div>
            </div>
            {/* <ToastContainer /> */}

            <style>
              {`
          @media (max-width: 538px) {
            .title {
                font-size: 32px;
            }
            .no-gutters{
                margin-left: 0!important;
                margin-right: 0!important;
                padding-left: 0!important;
                padding-right: 0!important;
            }
            .bg-white{
                padding-left: 0!important;
                padding-right: 0!important;
            }
          }
        `}
            </style>
          </div>
        </div>
      ) : (
        <>
          {type == "1" ? (
            <></>
          ) : type == "2" ? (
            <Jobs
              // setStep={setStep}
              settypeProvider={settypeProvider}
              setprev={setType}
              email={user?.email}
            />
          ) : type === "3" ? (
            <Places
              // setStep={setStep}
              setprev={setType}
              settypeProvider={settypeProvider}
              email={user?.email}
            />
          ) : type === "4" ? (
            <Nutrition
              // setStep={setStep}
              setprev={setType}
              settypeProvider={settypeProvider}
              email={user?.email}
            />
          ) : (
            <Doctor
              // setStep={setStep}
              setprev={setType}
              settypeProvider={settypeProvider}
              email={user?.email}
            />
          )}
        </>
      )}
    </>
  );
};

export default ProviderProfile;

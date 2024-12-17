import { t } from "i18next";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { cvImg } from "../../../../assets/icons";
// import ModalProfile from "../modal/ModalProfile";
import { useSelector } from "react-redux";
import { close } from "../../../../assets/images/icons";
import { useTranslation } from "react-i18next";
import Button from "../../../../components/ui/button/Button";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Modal } from "../../../../components/ui";
import { IoAdd } from "react-icons/io5";
import FormSelect from "../../../../components/formSelect/FormSelect";

const CVComponent = ({ items }) => {
  return (
    <div className="">
      <div className="d-flex w-100">
        <ul className="w-100 my-4 pt-2">
          <li className="d-flex align-items-center justify-content-between w-100">
            <p className="mb-2" style={{ color: "#000" }}>
              {t("Autobiography Date")}
            </p>
            <p>{items?.date ? items?.date : t("Not Found")}</p>
          </li>
          <li className="d-flex align-items-center justify-content-between w-100">
            <p className="mb-2" style={{ color: "#000" }}>
              {t("Country")}
            </p>
            <p>{items?.country_name ? items?.country_name : t("Not Found")}</p>
          </li>
          <li className="d-flex align-items-center justify-content-between w-100">
            <p className="mb-2" style={{ color: "#000" }}>
              {t("City / State")}
            </p>
            <p>{items?.city ? items?.city : t("Not Found")}</p>
          </li>

          <li className="d-flex align-items-center justify-content-between w-100">
            <p className="mb-2" style={{ color: "#000" }}>
              {t("Degree")}
            </p>
            <p>{items?.study ? items?.study : t("Not Found")}</p>
          </li>

          <li className="d-flex align-items-center justify-content-between w-100">
            <p className="mb-2" style={{ color: "#000" }}>
              {t("Marital Status")}
            </p>
            <p>
              {items?.marital_status ? items?.marital_status : t("Not Found")}
            </p>
          </li>
          <li className="d-flex align-items-center justify-content-between w-100">
            <p className="mb-2" style={{ color: "#000" }}>
              {t("Gender")}
            </p>
            <p>{items?.type ? t(items?.type) : t("Not Found")}</p>
          </li>
          <li className="d-flex align-items-center justify-content-between w-100">
            <p className="mb-2" style={{ color: "#000" }}>
              {t("Specialization")}
            </p>
            <p>
              {items?.specialization ? items?.specialization : t("Not Found")}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

function UploadCity({ setChange, change, items }) {
  const navigate = useNavigate();
  const { user, error, token } = useSelector((state) => state.auth);
  const URL_API = import.meta.env.VITE_REACT_APP_API_KEY;

  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const [showDropdown1, setShowDropdown1] = useState(false);
  const toggleDropdown1 = () => {
    setShowDropdown1(!showDropdown1);
  };

  const [t, i18n] = useTranslation();

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [photo, setPhoto] = useState("");

  const [resume, setResume] = useState("");
  const [formValues, setFormValues] = useState({});

  const [countries, setCountries] = useState([]);
  const [cities, setcities] = useState([]);
  const [city, setcity] = useState([]);
  const [county, setCounty] = useState("");
  const getDataCountry = async () => {
    try {
      const res = await axios.get(`${URL_API}/api/get_country`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
          // abdallah 15/10/2024 to remove the arabic lang
          // "Accept-Language": i18n.language,
        },
      });
      setCountries(res.data.data);
    } catch (err) {}
  };

  const getDataCity = async (e) => {
    try {
      const res = await axios.get(`${URL_API}/api/get_city/${e}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
          // abdallah 15/10/2024 to remove the arabic lang
          // "Accept-Language": i18n.language,
        },
      });
      setcities(res.data.data);
    } catch (err) {}
  };

  useEffect(() => {
    getDataCountry();
  }, []);
  const inputsSelect = [
    {
      name: t("Marital Status"),
      type: "select",
      select: [t("No Answer"), t("Single"), t("Married"), t("Other")],
      class: "",
      value: items?.marital_status,
      default: items?.marital_status,
      state: "marital_status",
    },
    {
      name: t("Gender"),
      type: "select",
      select: [, t("male"), t("female")],
      class: "",
      value: items?.type,
      default: items?.type,
      state: "type",
    },
    {
      name: t("Autobiography Date"),
      type: "date",
      class: "",
      value: items?.year,
      state: "date",
    },
    {
      name: t("study"),
      type: "text",
      class: "",
      value: items?.study,
      state: "study",
    },
    {
      name: t("Specialization"),
      type: "text",
      class: "",
      value: items?.specialization,
      state: "specialization",
    },
  ];
  const [loading, setLoading] = useState("");
  const handleUpdate = async (e) => {
    setLoading(true);
    setIsShareOpen(false);
    const data = { ...formValues };
    if (data.type == "انثى") {
      data.type = "female";
    } else if (data.type == "ذكر") {
      data.type = "male";
    }
    data.country_id = county;
    data.city_id = city;
    try {
      const res = await axios.post(`${URL_API}/api/${e}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(t("Add Successfully"));

      setLoading(false);
      setChange(!change);
      if (res.status == 200) {
        toast.success(t("Add Successfully"));
        setIsShareOpen(false);
        setResume("");
      }
    } catch (err) {
      setLoading(false);

      setIsShareOpen(false);
      setPhoto("");
    }
  };

  const params = useParams().id;

  return (
    <div className="resume">
      <p className="d-flex justify-content-xxl-between">
        {t("Information")}
        <div className="d-flex align-items-center gap-3">
          {user?.user_name === params && (
            <AiOutlineEdit
              style={{ color: "#7CC9D1" }}
              className="font-xxl"
              onClick={() => {
                localStorage.setItem("currentPage", "CV");
                // navigate("/userCV");
                setIsShareOpen(true);
              }}
            />
          )}
        </div>
      </p>

      {items && <CVComponent items={items} />}
      <Modal
        hasCloseButton
        closeButtonLeft
        isOpen={isShareOpen}
        closeModal={() => setIsShareOpen(false)}
        title={t("User information")}
        closeIcon={true}
        isFullScreen={true}
      >
        <>
          {resume ? (
            <div className="d-flex resume flex-wrap flex-column gap-3 mb-3 text-center justify-content-center">
              {/* <div style={{ position: "relative" }}>
                <img
                  src={close}
                  style={{ position: "absolute", cursor: "pointer" }}
                  onClick={() => setPhoto("")}
                />
                <img
                  src={URL.createObjectURL(photo)}
                  alt=""
                  style={{ width: "150px", height: "150px" }}
                />
              </div> */}
              <CVComponent />
              {/* <button disabled></button> */}
              <Button
                disabled={loading}
                onClick={() => {
                  handleUpdate("profile/uploadUserResume");
                }}
              >
                {t("Update")}
              </Button>
            </div>
          ) : (
            <>
              <div className="inputSelect__All">
                <div className={`input__select`}>
                  <label>{t("Where are you from?")}</label>
                  <select
                    onChange={(e) => {
                      getDataCity(e.target.value);
                      setCounty(e.target.value);
                    }}
                  >
                    <option value=""> {t("Select")}</option>{" "}
                    {countries?.map((o, i) => (
                      <option key={i} value={o.id}>
                        {o.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={`input__select`}>
                  <label>{t("where do you study?")}</label>
                  <select
                    onChange={(e) => {
                      // getDataCity(e.target.value);
                      setcity(e.target.value);
                    }}
                  >
                    <option value=""> {t("Select")}</option>{" "}
                    {cities?.map((o, i) => (
                      <option key={i} value={o.id}>
                        {o.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <FormSelect
                inputs={inputsSelect}
                //   name={t("Save modifications")}
                setFormValues={setFormValues}
              />
              <Button
                disabled={loading}
                onClick={() => {
                  handleUpdate("profile/updateInformation");
                }}
              >
                {t("Update")}
              </Button>
            </>
          )}
        </>
      </Modal>
    </div>
  );
}

export default UploadCity;

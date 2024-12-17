import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { GoPencil } from "react-icons/go";
import { CiCircleInfo, CiMobile4 } from "react-icons/ci";
import { MdPassword } from "react-icons/md";
import { LiaLanguageSolid } from "react-icons/lia";
import { IoIosColorPalette, IoMdLogOut } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FormSelect from "../components/formSelect/FormSelect";
import { Button } from "../components/ui";
import { logout } from "../rtk/slices/authSlice";

function ChangePassword() {
  const [t] = useTranslation();
  const [formValues, setFormValues] = useState({});
  const { token, user } = useSelector((state) => state.auth);

  const inputsSelect = [
    { name: t("Old Password"), type: "password", state: "old_password" },
    { name: t("New Password"), type: "password", state: "new_password" },
    {
      name: t("Confirm Password"),
      type: "password",
      state: "new_password_confirmation",
    },
  ];

  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const handleButtonClick = async () => {
    console.log(formValues);
    try {
      const res = await axios.post(
        `${URL}/api/profile/change-password`,
        formValues,

        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);

      if (res.status == 201) {
        toast.success(res?.data?.msg);
      }
    } catch (err) {
      toast.error(t("A network error occurred"));

      console.log(err);
    }
  };
  const mainMenuLabels = [
    {
      name: t("Update Information"),
      icon: <GoPencil />,
      link: "settings/update-info",
    },
    {
      name: t("My Information"),
      icon: <CiCircleInfo />,
      link: "settings/user-info",
    },
    {
      name: t("Edit Password"),
      icon: <MdPassword />,
      link: "settings/change-pass",
    },
    { name: t("Privacy"), icon: <CiMobile4 />, link: "settings/privacy" },
    {
      name: t("Language"),
      icon: <LiaLanguageSolid />,
      link: "settings/language",
    },
    { name: t("Color"), icon: <IoIosColorPalette />, link: "settings/art" },
    { name: t("Support"), icon: <BiSupport />, link: "settings/support" },
  ];
  const page = window.location.pathname.split("/")[1];
  const page2 = window.location.pathname.split("/")[2];
  const [type, setType] = useState(false);

  useEffect(() => {
    if (page2 == "change-pass") {
      setType(true);
    } else {
      setType(false);
    }
  }, [page2]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    console.log("addsdf");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(`${URL}/api/logout`, config);
      console.log(res);
      dispatch(logout());

      // return res.data;
    } catch (error) {
      // return custom error message from backend if present
      console.log(error, "error");
    }
  };
  return (
    <>
      {type ? (
        <>
          <div className="inputSelect ">
            <FormSelect inputs={inputsSelect} setFormValues={setFormValues} />
            <Button
              children={t("Save modifications")}
              onClick={handleButtonClick}
            />
          </div>
        </>
      ) : (
        <>
          <div className="inputSelect d-none d-md-block">
            <FormSelect inputs={inputsSelect} setFormValues={setFormValues} />
            <Button
              children={t("Save modifications")}
              onClick={handleButtonClick}
            />
          </div>
        </>
      )}
    </>
  );
}

export default ChangePassword;

// import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import customer from "../../assets/images/customer.png";
import lock from "../../assets/images/lock.png";
import team from "../../assets/images/team.png";
import skills from "../../assets/images/skills.png";
import privacy from "../../assets/images/privacy.png";
import logotekpart from "../../assets/images/logo.png";

import { useState } from "react";
import Aside from "../aside/Aside";
import Navbar from "../navBar/Navbar";
import { AccountSettings, PrivacySettings } from "./components";
import back from "/src/assets/images/back.png";
import { useNavigate } from "react-router-dom";
import { logout, stateCurrent } from "../../rtk/slices/authSlice";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line react/prop-types, no-unused-vars
function Settings({ setCount, count }) {
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const navigate = useNavigate();

  const settingsList = [
    { name: "who are we", icon: team, page: "/we" },
    { name: "Politics and privacy", icon: privacy, page: "/policyAndPrivacy" },
    // { name: "support", icon: customer, page: "/support" },
    {
      name: "accountSettings",
      icon: skills,
      page: "/accountSettings",
    },
    // {
    //   name: "Tek part",
    //   icon: logotekpart,
    //   page: "/tekpart",
    // },
    {
      name: "PrivacySettings",
      icon: lock,
      page: "/privacySettings",
    },
    // { name: "log out", icon: out, page: "/home" },
  ];
  const { user } = useSelector((state) => state.auth);
  const [pageName, setPageName] = useState("settings");

  function goBack() {
    setPageName("settings");
  }
  const URL_API = import.meta.env.VITE_REACT_APP_API_KEY;

  return (
    <>
      <Navbar setCount={setCount} count={count} />
      <div className="max-w-[1920px] m-auto flex">
        <div className="hidden lg:block">
          <Aside />
        </div>
        <div className="max-w-6xl p-4 mx-auto w-full text-black capitalize">
          {pageName === "accountSettings" ? (
            <AccountSettings goBack={goBack} />
          ) : pageName === "privacySettings" ? (
            <PrivacySettings goBack={goBack} />
          ) : pageName === "settings" ? (
            <>
              <p>{t("general")}</p>

              <button
                className="d-flex justify-between align-items-center rounded-xl my-2 p-5 bg-[#F2F2F2] w-full"
                onClick={() => {
                  navigate(`/profile/${user?.user_name}`);
                  dispatch(stateCurrent("profile"));
                }}
              >
                <div className="flex gap-5 align-items-center">
                  <img
                    className="w-8"
                    src={
                      user?.profile?.image
                        ? `${URL_API}/storage/${user?.profile?.image}`
                        : customer
                    }
                    alt=""
                  />
                  <p>
                    {user?.first_name} {user?.last_name}
                  </p>
                </div>
                <img className="w-4" src={back} alt="" />
              </button>

              <p>{t("other")}</p>

              <ul className="p-0">
                {settingsList.map((item, i) => (
                  <li key={i} className="truncate">
                    <button
                      className="flex justify-between items-center rounded-xl my-2 p-5 bg-[#F2F2F2] w-full"
                      onClick={() => navigate(`${item.page}`)}
                    >
                      <div className="flex gap-5 align-items-center">
                        <img className="w-8" src={item.icon} alt="" />{" "}
                        <p>{t(item.name)}</p>
                      </div>
                      <img className="w-4" src={back} alt="" />
                    </button>
                  </li>
                ))}
                <li className="truncate">
                  <button
                    className="flex justify-between items-center rounded-xl my-2 p-5 bg-[#F2F2F2] w-full"
                    onClick={() => {
                      Swal.fire({
                        title: t("Do you want to log out?"),
                        // text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: t("Yes"),
                        cancelButtonText: t("No"),
                      }).then((result) => {
                        if (result.isConfirmed) {
                          // dispatch(logout());
                          navigate("/");
                        }
                      });
                    }}
                  >
                    <div className="flex gap-5 align-items-center">
                      <img className="w-8" src={customer} alt="" />{" "}
                      <p>{t("Logout")}</p>
                    </div>
                    <img className="w-4" src={back} alt="" />
                  </button>
                </li>
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Settings;

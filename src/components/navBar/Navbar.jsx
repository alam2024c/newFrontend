import { Link, useNavigate, useParams } from "react-router-dom";
import {
  chat,
  close1,
  menu,
  notifications,
  options,
  settings,
  tick,
} from "../../assets/images/icons";
import img from "../../assets/images/3LM FINAL LOGO-01.png";
import { Dropdown, Input, Modal, SwitchButton } from "../ui";
import { useEffect, useState } from "react";
import Aside from "../aside/Aside";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  colorDispacth,
  logout,
  stateCurrent,
} from "../../rtk/slices/authSlice";
import Pusher from "pusher-js";
import axios from "axios";
import SettingsInfo from "./SettingsInfo";

export default function Navbar({ setCount, count }) {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const { current__page, user, token } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState(0);
  const getData = async () => {
    try {
      const res = await axios.get(`${URL}/api/getCountNotify`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setCount(+res.data.data);
    } catch (err) {
      if (err?.response?.data?.status == 401) {
        dispatch(logout());
      }
    }
  };
  const getDataCoundMessage = async () => {
    try {
      const res = await axios.get(`${URL}/api/chatify/unread_count`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(+res.data.count);
    } catch (err) {
      if (err?.response?.data?.status == 401) {
        dispatch(logout());
      }
    }
  };
  useEffect(() => {
    getData();
    getDataCoundMessage();
  }, []);

  const [notificationData, setNotificationData] = useState(null);

  useEffect(() => {
    // Pusher.logToConsole = true;

    const pusher = new Pusher("29003cf7a18fad5a715b", {
      cluster: "mt1",
      encrypted: true,
    });

    const channel = pusher.subscribe(`notification${user?.id}`);

    channel.bind("NewNotification", function (data) {
      setNotificationData(data); // Set the received data to state
      setCount(data[0].count);
    });

    // return () => {
    //   channel.unbind_all();
    //   channel.unsubscribe();
    // };
  }, []);
  useEffect(() => {
    let channel;

    Pusher.logToConsole = false;
    const pusher = new Pusher("29003cf7a18fad5a715b", {
      cluster: "mt1",
      channelAuthorization: {
        endpoint: `${URL}/api/chatify/chat/auth`,
        headers: { Authorization: `Bearer ${token}` },
      },
      encrypted: true,
    });

    channel = pusher.subscribe(`private-chatify${user?.id}`);

    channel.bind("unread-count", function (data) {
      setMessages(data?.count);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(current__page);
  const page = window.location.pathname.split("/")[1];

  useEffect(() => {
    current__page && setCurrentPage(current__page);
  }, [page]);

  const [showSideMenu, setShowSideMenu] = useState(false);
  const closeSideMenu = () => {
    setShowSideMenu(false);
  };
  const openSideMenu = () => {
    setShowSideMenu(true);
  };

  const colors = [
    "#D91E1E",
    "#C2CD3A",
    "#26D623",
    "#1067CC",
    "#8A19CF",
    "#685628",
    "#FFAA06",
    "#000000",
    "#41DBDB",
    "#2D7621",
    "#81A5A3",
    "#0099AB",
    "#FF00B8",
    "#112A84",
  ];

  const [t, i18n] = useTranslation();

  useEffect(() => {
    if (i18n.language === "ar") {
      document.body.classList.remove("en");
    } else {
      document.body.classList.add("en");
    }
  }, [i18n.language]);

  const dispatch = useDispatch();
  var element = document.querySelector("body");

  const handleButtonClickDark = (e) => {
    window.location.reload();
    if (e === "en") {
      // document.body.classList.add("en");
      localStorage.setItem("lang", "en");
      localStorage.setItem("direction", "ltr");
      i18n.changeLanguage("en");
    } else {
      // document.body.classList.remove("en");
      localStorage.setItem("lang", "ar");
      localStorage.setItem("direction", "rtl");
      i18n.changeLanguage("ar");
    }
  };
  const handleButtonClick = (color) => {
    element.classList.remove(
      "ED91E1E",
      "EC2CD3A",
      "E26D623",
      "E1067CC",
      "E8A19CF",
      "E685628",
      "EFFAA06",
      "E000000",
      "E41DBDB",
      "E2D7621",
      "E81A5A3",
      "E0099AB",
      "EFF00B8",
      "E112A84"
    );
    element.classList.add(color);
    localStorage.setItem("color-helnet", color);
    dispatch(colorDispacth(color));
  };
  // useEffect(() => {
  //   console.log(current__page);
  // }, [current__page]);

  return (
    <>
      <nav className="flex nav-header justify-between items-center z-10 sm:px-10 px-4 sticky top-0 bg-white h-16 sm:h-24">
        <div className="flex justify-between w-1/3 nav-mob">
          <Link
            to="/"
            className="sm:hidden w-12 h-12 flex justify-between items-center"
          >
            <img
              src={img}
              alt=""
              style={{
                width: "80px",
                maxWidth: "50px",
              }}
            />{" "}
          </Link>{" "}
          <div className="flex gap-2 items-center">
            <a
              href="/"
              // onClick={() => {
              //   dispatch(stateCurrent("home"));
              //   window.location.reload();
              // }}
              className="hidden sm:block w-20 cursor-pointer"
            >
              <img
                src={img}
                alt=""
                style={{
                  maxWidth: "300px",
                  width: "100px",
                }}
              />{" "}
            </a>{" "}
          </div>
          <a
            // onClick={() => {
            //   window.location.reload();
            // }}
            className="hidden md:flex justify-center items-center font-black capitalize cursor-pointer"
            style={{ position: "absolute", right: "365px", top: "40px" }}
          >
            {" "}
            <p> {t(current__page)} </p>{" "}
          </a>
        </div>
        <div className="flex gap-5">
          <Dropdown
            normalMenu={false}
            width="w-96"
            buttonData={
              <div className="hidden sm:flex justify-center items-center rounded-full w-12 h-12 bg-gray-100 ">
                <img src={options} alt="" style={{ width: "25px" }} />
              </div>
            }
            Children={<SettingsInfo />}
          />
          {!user && (
            <Link to={"/login"}>
              <button className="logbtn text-center text-white d-flex  d-felx align-items-center h-10 justify-content-center gap-2 rounded px-5 py-0">
                {t("Login")}
              </button>
            </Link>
          )}
          {user && (
            <Dropdown
              normalMenu={false}
              width="w-96"
              buttonData={
                <div
                  className=" flex justify-center items-center rounded-full w-12 h-12 bg-gray-100"
                  onClick={() => navigate("/chat")}
                >
                  <img src={chat} alt="" />
                  {messages != 0 && (
                    <span
                      className="text-red"
                      style={{
                        position: "absolute",
                        top: "-5px",
                        fontSize: "10px",
                        backgroundColor: "red",
                        color: "#fff",
                        borderRadius: "50%",
                        width: "15px",
                        height: "15px",
                        right: "20%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {" "}
                      {messages}
                    </span>
                  )}
                </div>
              }
            />
          )}
          {user && (
            <>
              {" "}
              <Link to={"/notifcations"} className=" sm:flex ">
                <div
                  className=" flex justify-center items-center rounded-full w-12 h-12 bg-gray-100"
                  style={{ position: "relative" }}
                >
                  {count != 0 && (
                    <span
                      className="text-red"
                      style={{
                        position: "absolute",
                        top: "-5px",
                        fontSize: "10px",
                        backgroundColor: "red",
                        color: "#fff",
                        borderRadius: "50%",
                        width: "15px",
                        height: "15px",
                        right: "20%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {" "}
                      {count}
                    </span>
                  )}
                  <img src={notifications} alt="" style={{ width: "25px" }} />
                </div>
              </Link>
              <button
                className=" hidden sm:hidden  rounded-full w-12 h-12 bg-gray-100 flex justify-center items-center "
                onClick={() => navigate("/settings")}
              >
                <img src={settings} alt="" />
              </button>
              {user && (
                <button
                  className="flex justify-center items-center rounded-full w-12 h-12"
                  onClick={() => {}}
                >
                  <img
                    src={`${URL}/storage/${user?.profile?.image}`}
                    alt=""
                    style={{
                      width: "40px",
                      maxWidth: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      maxHeight: "40px",
                    }}
                    onClick={() => {
                      navigate(`/profile/${user?.user_name}`);
                      dispatch(stateCurrent("profile"));
                    }}
                  />{" "}
                </button>
              )}
            </>
          )}
          <button className="lg:hidden w-12 h-12" onClick={openSideMenu}>
            <img src={menu} alt="" />
          </button>{" "}
        </div>
      </nav>
      <Modal
        isOpen={showSideMenu}
        closeModal={closeSideMenu}
        height="h-screen"
        hasCloseButton
        children={
          <>
            <button
              className="absolute z-20 right-1 top-1"
              onClick={closeSideMenu}
            >
              <img src={close1} alt="" />
            </button>{" "}
            <Aside isOpen={showSideMenu} close={closeSideMenu} />{" "}
          </>
        }
      />{" "}
    </>
  );
}

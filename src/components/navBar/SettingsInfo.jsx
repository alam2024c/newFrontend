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
import SwitchButtonDark from "../ui/switchButton/SwitchButtonDark";
import Pusher from "pusher-js";
import axios from "axios";

export default function SettingsInfo({ setCount, count }) {
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
      // console.log(res);
      setCount(+res.data.data);
    } catch (err) {
      console.log(err);
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
      console.log(res);
      setMessages(+res.data.count);
    } catch (err) {
      console.log(err);
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
      console.log("data========>", data);
      setCount(data[0].count);
    });
    // console.log("true");

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
      console.log(data, "unread-count");
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

  const [selected, setSelected] = useState(
    localStorage.getItem("color-helnet")
      ? `#${localStorage.getItem("color-helnet").slice(1)}`
      : "#0099AB"
  );

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
    // console.log(active, "active");
  }, [i18n.language]);

  const dispatch = useDispatch();
  var element = document.querySelector("body");

  const handleButtonClickDark = (e) => {
    console.log(e);
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
    console.log(color);
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

  return (
    <div className="grid gap-4 p-8 settings text-black">
      <h3 className="font-bold text-lg capitalize"> {t("Settings")} </h3>{" "}
      <p className="font-bold"> {t("Choose Color Theme")} </p>{" "}
      <div className="grid  gap-4 grid-cols-7">
        {" "}
        {colors.map((color) => (
          <div
            key={color}
            className="bg-[${color}] w-10 h-10 relative rounded-full flex justify-center items-center"
            onClick={() => {
              setSelected(color);
              handleButtonClick("E" + color.slice(1));
            }}
            style={{
              backgroundColor: color,
            }}
          >
            {" "}
            {color === selected && <img src={tick} alt="" />}{" "}
          </div>
        ))}{" "}
      </div>{" "}
      <ul className="grid gap-4 my-2">
        <li className="flex justify-between items-center">
          <p className="font-bold capitalize"> {t("dark mode")} </p>{" "}
          <SwitchButtonDark />
        </li>{" "}
        <li className="flex justify-between items-center">
          <p className="font-bold capitalize">
            {" "}
            {t("Language")}
            {/* {i18n.language === "en" ? "english" : "العربيه"}{" "} */}
          </p>{" "}
          <select
            aria-label="Default select example"
            className="  p-5"
            style={{ width: "fit-content" }}
            value={i18n.language}
            placeholder={t("Select Language")}
            onChange={(e) => handleButtonClickDark(e.target.value)}
          >
            <option className="p-2" value={"en"}>
              {t("English")}{" "}
            </option>
            <option className="p-2" value={"ar"}>
              {t("Arabic")}
            </option>
          </select>
        </li>{" "}
      </ul>{" "}
    </div>
  );
}

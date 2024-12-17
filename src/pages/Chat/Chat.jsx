/* eslint-disable react/prop-types */
import "./Chat.scss";
import ChatList from "../../components/ChatComponents/ChatList/ChatList";
import ChatContent from "../../components/ChatComponents/ChatContent/ChatContent";
import UserProfile from "../../components/ChatComponents/UserProfile/UserProfile";

import { useEffect, useState } from "react";
import ChatTest from "./ChatTest";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Loading from "../../components/Loading/Loading";

function Chat({
  setActive,
  setThemecolor,
  setActiveDark,
  activeDark,
  menuAuctive,
  setMenuActive,
}) {
  const [t] = useTranslation();
  const user_name = useParams().id;
  const [chatActive, setChatActive] = useState(false);
  const [infoActive, setInfoActive] = useState(false);
  const [info, setInfo] = useState(false);
  const [userChat, setChatUser] = useState({});
  const [userIsOnline, setUserIsOnline] = useState({});
  const { token, user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState("");

  const URL__API = import.meta.env.VITE_REACT_APP_API_KEY;
  const [changeContact, setChangeContact] = useState({});
  // const themeColor = localStorage.getItem("themeColor");
  useEffect(() => {
    if (user_name) {
      setChatActive(true);
    }
  }, [user_name]);
  const getUserId = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${URL__API}/api/profile/${user_name}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);

      if (res?.data.data?.last_active_at) {
        setUserIsOnline(res?.data.data?.last_active_at);
      } else {
        setUserIsOnline("");
      }
      setChatUser(res.data.data);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    // setChatUser("");
    getUserId();
  }, [user_name]);

  return (
    <div className="main__chatbody  box-shadow">
      <ChatList
        // setLoading={setLoading}
        setThemecolor={setThemecolor}
        setActiveDark={setActiveDark}
        activeDark={activeDark}
        menuAuctive={menuAuctive}
        setMenuActive={setMenuActive}
        chatActive={chatActive}
        setChatActive={setChatActive}
        changeContact={changeContact}
        userChat={userChat}
        setUserIsOnline={setUserIsOnline}
        setChangeContact={setChangeContact}
      />

      <>
        {" "}
        {userChat?.user_id ? (
          <>
            {chatActive && (
              <ChatContent
                changeContact={changeContact}
                setChangeContact={setChangeContact}
                chatActive={chatActive}
                setChatActive={setChatActive}
                setInfo={setInfo}
                info={info}
                setInfoActive={setInfoActive}
                infoActive={infoActive}
                setActive={setActive}
                userChat={userChat}
                setChatUser={setChatUser}
                userIsOnline={userIsOnline}
                loadingPage={loading}
              />
            )}
          </>
        ) : (
          <div
            className="main__chatcontent notfound__chat"
            style={chatActive ? { left: "0" } : { left: "107%" }}
          >
            {t("Choose a conversation")}
          </div>
        )}
        {/* <ChatTest/> */}
        {info && (
          <UserProfile
            setInfo={setInfo}
            setInfoActive={setInfoActive}
            infoActive={infoActive}
            userChat={userChat}
            setChatUser={setChatUser}
          />
        )}
      </>
    </div>
  );
}

export default Chat;

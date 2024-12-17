/* eslint-disable react/prop-types */
import "./Chat.scss";
import ChatList from "../../components/ChatComponents/ChatList/ChatList";
import ChatContent from "../../components/ChatComponents/ChatContent/ChatContent";
import UserProfile from "../../components/ChatComponents/UserProfile/UserProfile";

import { useState } from "react";

function Chat({
  setActive,
  setThemecolor,
  setActiveDark,
  activeDark,
  menuAuctive,
  setMenuActive,

}) {
  const [chatActive, setChatActive] = useState(false);
  const [infoActive, setInfoActive] = useState(false);
  const [info, setInfo] = useState(false);
  // const themeColor = localStorage.getItem("themeColor");

  return (
    <div className="main__chatbody  box-shadow">
      <ChatList
        setThemecolor={setThemecolor}
        setActiveDark={setActiveDark}
        activeDark={activeDark}
        menuAuctive={menuAuctive}
        setMenuActive={setMenuActive}
        chatActive={chatActive}
        setChatActive={setChatActive}
      />

      <ChatContent
        chatActive={chatActive}
        setChatActive={setChatActive}
        setInfo={setInfo}
        info={info}
        setInfoActive={setInfoActive}
        infoActive={infoActive}
        setActive={setActive}
      />
      {info && (
        <UserProfile
          setInfo={setInfo}
          setInfoActive={setInfoActive}
          infoActive={infoActive}
        />
      )}
    </div>
  );
}

export default Chat;

import React, { useEffect, useState } from "react";
import ChatContent from "../ChatComponents/ChatContent/ChatContent";
import { friends } from "/public/fakeData";
import { options2 } from "../../assets/images/icons";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import axios from "axios";
import Avatar from "../ChatComponents/ChatList/Avatar";
function Online() {
  const [t] = useTranslation();
  const [idChat, setIdChat] = useState();
  const [contactOnline, setContactOnline] = useState([]);
  const [userChat, setChatUser] = useState({});
  const { token } = useSelector((state) => state.auth);
  const URL__API = import.meta.env.VITE_REACT_APP_API_KEY;

  // const themeColor = localStorage.getItem("themeColor");

  const getUserId = async () => {
    try {
      const res = await axios.get(`${URL__API}/api/profile/${idChat}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setChatUser(res.data.data);
    } catch (err) {}
  };
  const getOnline = async () => {
    try {
      const res = await axios.get(`${URL__API}/api/chatify/online`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setContactOnline(res.data.users);
    } catch (err) {}
  };
  useEffect(() => {
    if (idChat) {
      getUserId();
    }
  }, [idChat]);
  useEffect(() => {
    getOnline();

    // Fetch data every 5 minutes
    const intervalId = setInterval(getOnline, 1 * 60 * 1000);

    // Cleanup function to clear interval
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <div className="grid online gap-4 w-11/12 mt-4 py-4 border-t text-black border-black">
        <div className="flex justify-between">
          <h5 className="capitalize font-black">{t("Active")}</h5>
        </div>

        <div className="grid gap-4 overflow-y-scroll no-scrollbar max-h-96">
          {contactOnline.map((contact) => (
            <div
              className="flex items-center gap-2 curosor-pointer"
              key={contact.user_id}
              onClick={() => setIdChat(contact?.user_name)}
            >
              <Avatar
                image={`${URL__API}/storage/${contact?.profile?.image}`}
                isOnline={"active"}
              />

              <p>{contact.first_name + " " + contact.last_name}</p>
            </div>
          ))}
        </div>
      </div>
      {userChat?.user_id && (
        <div className="chat__home__page">
          <ChatContent
            chatMobile="true"
            userChat={userChat}
            setChatUser={setChatUser}
            setIdChat={setIdChat}
            userIsOnline="active"
          />
        </div>
      )}
    </>
  );
}

export default Online;

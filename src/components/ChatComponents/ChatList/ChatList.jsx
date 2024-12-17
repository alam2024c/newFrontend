/* eslint-disable react/prop-types */

import "./chatList.scss";
import ChatListItems from "./ChatListItems";
import { AiOutlineHome } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoSearch } from "react-icons/io5";
import { getDataContacts } from "../../posts/getDataPost";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import IconButtonDark from "../../ui/switchButton/IconButtonDark";

function ChatList({
  setChatActive,
  setActive,
  menuAuctive,
  changeContact,
  chatActive,
  userChat,
  setUserIsOnline,
  // setLoading,
}) {
  const URL__API = import.meta.env.VITE_REACT_APP_API_KEY;

  const [t] = useTranslation();
  const { token, user, deleteConversation_id } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (deleteConversation_id?.id) {
      setItems((prevItems) =>
        prevItems.filter((item) => item.id !== deleteConversation_id?.id)
      );
    }
  }, [deleteConversation_id]);
  const [text, setText] = useState("");
  const [idStatus, setIdStatus] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    Pusher.logToConsole = false;
    const pusher = new Pusher("29003cf7a18fad5a715b", {
      cluster: "mt1",
      channelAuthorization: {
        endpoint: `${URL__API}/api/chatify/chat/auth`,
        headers: { Authorization: `Bearer ${token}` },
      },
      encrypted: true,
    });

    const channel = pusher.subscribe(`private-chatify${user?.id}`);

    channel.bind("active", function (data) {
      setIdStatus(data);
      // console.log(data)
    });
  }, []);
  const { items, hasMore, setItems } = getDataContacts(
    1,
    token,
    "chatify/getContacts",
    text,

    navigate,
    dispatch
    // setLoading
  );

  useEffect(() => {
    // console.log(changeContact, "changeContact");
    if (changeContact) {
      const targetId =
        +changeContact?.user?.id || +changeContact?.message?.to_id;
      let updatedItem = null;
      // console.log(targetId, "targetId");

      // Update the last_message and find the updated item
      let updatedData = items.map((item) => {
        if (item.id === targetId) {
          updatedItem = {
            ...item,
            last_message: changeContact.message,
            unread_messages_count:
              targetId != userChat?.user_id
                ? changeContact?.user?.id
                  ? item.unread_messages_count + 1
                  : item.unread_messages_count
                : 0,
          };
          return updatedItem;
        }
        return item;
      });

      // Move the updated item to the top of the array if it was found
      if (updatedItem) {
        const filteredData = updatedData.filter((item) => item.id !== targetId);
        updatedData = [updatedItem, ...filteredData];
      }

      // console.log(updatedData, updatedItem);

      setItems(updatedData);
    }
  }, [changeContact]);

  // active or not active

  useEffect(() => {
    if (idStatus) {
      if (userChat?.user_id == idStatus?.id) {
        setUserIsOnline("active");
      }
      // Update the last_message and find the updated item
      let updatedData = items.map((item) => {
        if (item.id === idStatus?.id) {
          let updatedItem = {
            ...item,
            last_active_at: idStatus?.status == "active" ? "active" : "",
          };
          return updatedItem;
        }
        return item;
      });

      setItems(updatedData);
    }
  }, [idStatus]);

  useEffect(() => {
    if (userChat) {
      if (items.length > 0) {
        const timeoutId = setTimeout(() => {
          console.log(userChat, items, "userChat");

          // Update the last_message and find the updated item
          let updatedData = items.map((item) => {
            if (item.id === userChat.user_id) {
              let updatedItem = {
                ...item,
                unread_messages_count: 0,
              };
              return updatedItem;
            }
            return item;
          });

          setItems(updatedData);
        }, 2000); // 5000 milliseconds = 5 seconds

        return () => clearTimeout(timeoutId);
      } else {
        // Do nothing if localItems is empty
        let updatedData = items.map((item) => {
          if (item.id === userChat?.user_id) {
            let updatedItem = {
              ...item,
              unread_messages_count: 0,
            };
            return updatedItem;
          }
          return item;
        });

        setItems(updatedData);
      }
    }
  }, [userChat]);
  const [showNotFound, setShowNotFound] = useState(false);

  useEffect(() => {
    // إعداد المؤقت لمدة 5 ثوانٍ
    const timer = setTimeout(() => {
      if (items.length === 0) {
        setShowNotFound(true);
      }
    }, 5000);

    // تنظيف المؤقت عند إلغاء المكون أو تغيير القائمة
    return () => clearTimeout(timer);
  }, [items]);
  return (
    <div className={menuAuctive ? "main__chatlist active" : "main__chatlist "}>
      <div className="top d-flex align-items-center  mb-3 mt-3 px-2">
        <Link
          style={{ margin: "0 10px", fontSize: "25px" }}
          to="/home"
          className="d-center"
          onClick={() => setActive("Home")}
        >
          <AiOutlineHome className="cursor-pointer" />
        </Link>
        <IconButtonDark />

        <div
          className="chatList__search mb-1"
          style={{ height: "28px", marginRight: "15px" }}
        >
          <div
            className="search_wrap input-with-icon w-full"
            style={{ display: "flex" }}
          >
            <IoSearch className="font-xl cursor-pointer  input-icon" />
            <input
              type="text"
              value={text}
              className="p-2  w-full"
              onChange={(e) => setText(e.target.value)}
              placeholder={t("search")}
              required
            />
          </div>
        </div>
      </div>

      <div className="chatlist__items">
        {items.map((item, index) => {
          return (
            <ChatListItems
              setText={setText}
              setItems={setItems}
              setChatActive={setChatActive}
              name={item?.first_name + " " + item?.last_name}
              key={item.id}
              item={item}
              animationDelay={index + 1}
              active={item.active ? "active" : ""}
              isOnline={item.isOnline ? "active" : ""}
              image={item.profile.image}
            />
          );
        })}
        {showNotFound && (
          <div className="d-center h-full">
            <div className="d-flex d-center algin-items-center text-lg  gap-1 w-full  py-5 rounded">
              {t("Not Found")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatList;

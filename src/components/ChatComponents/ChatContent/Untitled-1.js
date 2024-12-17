import { useState, useEffect } from "react";
import "./chatContent.css";
import Avatar from "../ChatList/Avatar";
import ChatItem from "./ChatItem";
import { BsEmojiSmile } from "react-icons/bs";
import Picker from "emoji-picker-react";
import { IoSend } from "react-icons/io5";
import { AiOutlineArrowRight, AiOutlinePlus } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { IoSearch } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import Pusher from "pusher-js";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

function ChatContent({
  setInfo,
  info,
  chatActive,
  setChatActive,
  setInfoActive,
}) {
  const { user, token } = useSelector((state) => state.auth);
  const URL__API = import.meta.env.VITE_REACT_APP_API_KEY;
  const [file, setFile] = useState([]);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const user_name = useParams().id;
  const [userChat, setChatUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const getUserId = async () => {
    try {
      const res = await axios.get(`${URL}/api/profile/${user_name}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setChatUser(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setMessages([]);
    getUserId();
  }, [user_name]);
  // connect use pusher
  useEffect(() => {
    Pusher.logToConsole = true;
    const pusher = new Pusher("29003cf7a18fad5a715b", {
      cluster: "mt1",
      channelAuthorization: {
        endpoint: `${URL__API}/api/chatify/chat/auth`,
        headers: { Authorization: `Bearer ${token}` },
      },
      encrypted: true,
    });

    const channel = pusher.subscribe(`private-chatify${user?.id}`);

    channel.bind("messaging", function (data) {
      console.log("data========>", data);
      setMessages((prev) => [...prev, data.message]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [showEmoji, setShowEmoji] = useState(false);
  const [text, setText] = useState("");

  const addEmoji = (emojiObject) => {
    console.log(emojiObject);
    let sym = emojiObject.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    if (text) {
      setText(text + emoji);

      // setreturn_metion(return_metion + emoji);
    } else {
      setText(emoji);

      // setreturn_metion(emoji);
    }
    // setShowEmojiPicker(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const emojiRef = useRef();

  const handleClick = (e) => {
    if (emojiRef?.current?.contains(e.target)) {
      // inside click
      return;
    } else {
      setShowEmoji(false);
    }
    // outside click
  };

  const [t] = useTranslation();
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFile(selectedFiles);
  };

  //// send data
  const sendMessage = async (e) => {
    console.log("sendMessagesendMessagesendMessage");
    const data = {
      id: userChat?.user_id,
      type: "user",
      temporaryMsgId: 1,
      message: text,
    };
    try {
      const res = await axios.post(
        `${URL}/api/chatify/sendMessage`,
        data,

        {
          headers: {
            Accept: "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setText("");
      console.log(res, "send sms");
      setMessages((prev) => [...prev, res.data.message]);
      if (res.data) {
      }
    } catch (err) {
      console.log(err);
      // setIsFormsOpen(false);
    }
  };

  useEffect(() => {
    if (userChat) {
      fetchMoreData();
    }
  }, [userChat]);

  //getAllmessage use pagination
  const fetchMoreData = async (page) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${URL}/api/chatify/fetchMessages?page=${2}`,
        {
          id: userChat?.user_id,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "allmessage");
      setMessages((prevData) => [
        ...response.data.messages?.reverse(),
        ...prevData,
      ]);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setLoading(false);
  };
  return (
    <div
      className="main__chatcontent"
      style={chatActive ? { left: "0" } : { left: "107%" }}
    >
      <div className="content__header card">
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="current-chatting-user">
            <AiOutlineArrowRight
              className="font-xl cursor-pointer backChat ms-2 "
              onClick={() => setChatActive(false)}
            />

            <Avatar
              isOnline="active"
              image={
                user?.profile?.image
                  ? `${URL}/storage/${user?.profile?.image}`
                  : selectedcover
              }
            />
            <div className="name-user">
              <p> {userChat?.first_name + " " + userChat?.last_name} </p>
              <span className="seen">last seen 5 mins ago </span>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
            {/* <FaPhone
              className="font-xl cursor-pointer"
            /> */}
            <IoSearch className="font-xl cursor-pointer" />
            <IoMdInformationCircleOutline
              className="font-xl cursor-pointer "
              onClick={() => {
                setInfoActive(true);
                setInfo(!info);
              }}
            />
            <BsThreeDotsVertical className="font-xl cursor-pointer " />
          </div>
        </div>
      </div>
      <div
        className="content__body"
        style={{
          height: "80vh",
          overflow: "auto",
          border: "1px solid black",
        }}
      >
        <div className="chat__items">
          {messages.length > 0 &&
            messages?.map((message, index) => {
              return (
                <ChatItem
                  scrollRef={scrollRef}
                  animationDelay={index + 2}
                  message={message}
                  key={index}
                  user={message.from_id == user?.id ? "me" : "other"}
                  msg={message?.message || message?.body}
                  image={message.image}
                />
              );
            })}
        </div>
      </div>
      <div className="d-flex align-items-center gap-3 p-2">
        {file.map((file, index) => (
          <img
            key={index}
            style={{ width: "90px", height: "110px" }}
            src={URL.createObjectURL(file)}
            alt=""
          />
        ))}
      </div>
      <div className="content__footer  position-relative d-flex justify-content-between align-items-center">
        <div>
          <BsEmojiSmile
            onClick={() => setShowEmoji((val) => !val)}
            style={{
              cursor: "pointer",
              // height: "20px",
              fontSize: "25px",
            }}
          />
          {showEmoji && (
            <div ref={emojiRef}>
              <Picker
                pickerStyle={{ width: "100%" }}
                onEmojiClick={addEmoji}
                // onEmojiClick={addEmoji}
                style={{
                  height: "398px",
                  width: "80%",
                  position: "absolute",
                  bottom: "44px",
                  left: "55px",
                }}
              />
            </div>
          )}
        </div>
        <div className="sendNewMessage d-flex  align-items-center">
          <div
            className="addFiles d-flex align-items-center gap-2"
            // ref={emojiRef}
          >
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="d-none"
              id="file"
            />
            <label htmlFor="file">
              <AiOutlinePlus
                className="cursor-pointer font-lg"
                htmlFor="file"
              />
            </label>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("Message")}
            className="w-full bg-transparent outline-none resize-none text-sm"
            cols="30"
            rows="2"
          ></textarea>
        </div>
        <div className="send" onClick={() => sendMessage()}>
          <IoSend className="font-xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default ChatContent;

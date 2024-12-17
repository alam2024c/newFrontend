import { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./chatContent.css";
import Avatar from "../ChatList/Avatar";
import ChatItem from "./ChatItem";
import { BsEmojiSmile, BsThreeDotsVertical } from "react-icons/bs";
import { FaMicrophoneAlt } from "react-icons/fa";

import Picker from "emoji-picker-react";
import {
  IoSend,
  IoClose,
  // IoMdInformationCircleOutline,
} from "react-icons/io5";
import {
  AiOutlineArrowRight,
  AiOutlineClose,
  AiOutlinePlus,
} from "react-icons/ai";
import Pusher from "pusher-js";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { getDataMessage } from "../../posts/getDataPost";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { getDateLabel } from "./dateUtils";
import Loading from "../../Loading/Loading";

function ChatContent({
  setInfo,
  info,
  chatActive,
  setChatActive,
  setInfoActive,
  userChat,
  chatMobile = false,
  setChatUser,
  setIdChat,
  setChangeContact,
  userIsOnline,
  changeContact,
  loadingPage,
}) {
  const { token, user, deleteMessage_id } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const URL__API = import.meta.env.VITE_REACT_APP_API_KEY;
  const [file, setFile] = useState([]);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const user_name = useParams().id;
  const [loading, setLoading] = useState(false);
  const [seen, setSeen] = useState(false);
  const { items, hasMore, loadMore, setItems } = getDataMessage(
    1,
    token,
    userChat?.user_id
  );

  const { i18n } = useTranslation(); // Use the translation hook

  const currentLanguage = i18n.language;

  const mediaRecorderRef = useRef(null);


  const [isRecording, setIsRecording] = useState(false);
const [audioBlob, setAudioBlob] = useState(null);

let mediaRecorder;

const startRecording = () => {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();
      setIsRecording(true);

      const audioChunks = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
        setAudioBlob(audioBlob);
        setIsRecording(false);

        // Trigger download
        const url = URL.createObjectURL(audioBlob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'voice_message.mp3'; 
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url); // Clean up
        document.body.removeChild(a);
      };
    })
    .catch((error) => {
      console.error('Error accessing microphone:', error);
    });
};




const stopRecording = () => {
  if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
  }
};

useEffect(() => {
  return () => {
      if (mediaRecorderRef.current) {
          mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      }
  };
}, []);



  useEffect(() => {
    // console.log(deleteMessage_id, "deleteMessage_id");
    if (deleteMessage_id?.post_id) {
      setItems((prevItems) =>
        prevItems.filter((item) => item.id !== deleteMessage_id?.post_id)
      );
    }
  }, [deleteMessage_id]);

  useEffect(() => {
    setMessages([]);

    setItems([]);
  }, [user_name]);

  useEffect(() => {
    let channel;
    if (userChat?.user_id) {
      Pusher.logToConsole = false;
      const pusher = new Pusher("29003cf7a18fad5a715b", {
        cluster: "mt1",
        channelAuthorization: {
          endpoint: `${URL__API}/api/chatify/chat/auth`,
          headers: { Authorization: `Bearer ${token}` },
        },
        encrypted: true,
      });

      channel = pusher.subscribe(`private-chatify${user?.id}`);

      channel.bind("messaging", function (data) {
        if (data?.seen == 1) {
          setSeen(true);
        } else {
          console.log(data, "data?.message");
          console.log(data?.message?.from_id, userChat?.user_id);
          if (chatMobile != "true") {
            // console.log("chatMobilechatMobile");
            setChangeContact(data);
          }
          if (data?.message?.from_id == userChat?.user_id) {
            setMessages((prev) => [...prev, data?.message]);
            setItems((prev) => [...prev, data?.message]);
          }
        }
      });
      return () => {
        channel.unbind_all();
        channel.unsubscribe();
        pusher.disconnect();
      };
    }
  }, [userChat]);

  useEffect(() => {
    if (seen) {
      const updatedData = items.map((item) => ({
        ...item,
        seen: 1,
      }));
      setItems(updatedData);
    }
  }, [seen]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [showEmoji, setShowEmoji] = useState(false);
  const [text, setText] = useState("");
  const [currentPlayingId, setCurrentPlayingId] = useState(null);
  const [stopPreviousInstance, setStopPreviousInstance] = useState(null);

  const addEmoji = (emojiObject) => {
    let sym = emojiObject.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setText(text ? text + emoji : emoji);
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
      return;
    } else {
      setShowEmoji(false);
    }
  };

  const [t] = useTranslation();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFile(selectedFiles);
  };

  const sendMessage = async () => {
    if (!text && !audioBlob && file.length === 0) {
      console.error("No content to send!");
      return;
    }
    setLoading(true);
    let temporaryMsgId = Math.floor(Math.random() * 100);
    const data = {
      id: userChat?.user_id,
      type: "user",
      temporaryMsgId: temporaryMsgId,
      message: text,
      // file: file,
    };
    setItems((prev) => [
      ...prev,
      {
        id: temporaryMsgId,
        type: "user",
        temporaryMsgId: temporaryMsgId,
        message: text,
        from_id: user?.id,
        to_id: userChat?.user_id,
        body: text,
        attachment: null,
        seen: 2,

        created_at: Date.now(),
      },
    ]);
    setMessages((prev) => [
      ...prev,
      {
        id: temporaryMsgId,
        type: "user",
        temporaryMsgId: temporaryMsgId,
        message: text,
        from_id: user?.id,
        to_id: userChat?.user_id,
        body: text,
        attachment: null,
        seen: 2,
      },
    ]);
    setFile([]);
    setText("");
    setLoading(false);

    const textarea = textareaRef.current;
    textarea.style.height = "40px";
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    for (let i = 0; i < file.length; i++) {
      formData.append("file", file[i]);
    }
    if (audioBlob) formData.append("voice", audioBlob, "voice_message.mp3"); 
    // console.log('Recorded audioBlob type a: ', audioBlob.type);

    console.log(data);
    try {
      const res = await axios.post(
        `${URL__API}/api/chatify/sendMessage`,
        formData,
        {
          headers: {
            Accept: "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
     setText("");
      setAudioBlob(null);
      setFile([]);

      setSeen(false);
      if (chatMobile != "true") {
        setChangeContact(res.data);
      }
      console.log(res.data, "sendMessage");
      setText("");
      const newMessage = res.data.message;

      setMessages((prev) =>
        prev.map((msg) =>
          msg.temporaryMsgId === temporaryMsgId ? newMessage : msg
        )
      );
      setMessages((prev) =>
        prev.map((msg) =>
          msg.temporaryMsgId === temporaryMsgId ? newMessage : msg
        )
      );
      setItems((prev) =>
        prev.map((item) =>
          item.temporaryMsgId === temporaryMsgId ? newMessage : item
        )
      );
      // setMessages((prev) => [...prev, res.data.message]);
      // setItems((prev) => [...prev, res.data.message]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // console.log(items);
  }, [items]);

  // see
  const seenMessage = async () => {
    const data = {
      id: userChat?.user_id,
    };
    console.log(data, "idseen");

    try {
      const res = await axios.post(`${URL__API}/api/chatify/makeSeen`, data, {
        headers: {
          Accept: "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res, "seeeeen");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    seenMessage();
  }, [userChat, messages]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (text) {
      textarea.style.height = "40px"; // Reset height to auto to shrink if necessary
      textarea.style.height = `${Math.min(
        textarea.scrollHeight,
        window.innerHeight * 0.5
      )}px`;
    } else {
      textarea.style.height = "40px";
    }
  };

  useEffect(() => {
    if (text) {
      adjustTextareaHeight();
    }
  }, [text]);
  const textareaRef = useRef(null);
  const removeFile = (index) => {
    const updatedFiles = [...file];
    updatedFiles.splice(index, 1);
    setFile(updatedFiles);
  };

  const groupedMessages = items?.reduce((groups, message) => {
    const dateLabel = getDateLabel(message.created_at);
    if (!groups[dateLabel]) {
      groups[dateLabel] = [];
    }
    groups[dateLabel].push(message);
    return groups;
  }, {});
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // منع النزول لسطر جديد
      sendMessage();
    }
  };
  return (
    <div
      className="main__chatcontent"
      style={chatActive ? { left: "0" } : { left: "107%" }}
    >
      {loadingPage ? (
        <Loading />
      ) : (
        <>
          {" "}
          <div className="content__header card">
            <div className="d-flex align-items-center justify-content-between w-100">
              <div
                className="current-chatting-user curosor-pointer"
                onClick={() => navigate(`/profile/${userChat?.user_name}`)}
              >
                <AiOutlineArrowRight
                  className="font-xl cursor-pointer backChat ms-2 "
                  onClick={() => setChatActive(false)}
                />
                <Avatar
                  isOnline={userIsOnline}
                  // isOnline="active"
                  image={
                    userChat?.user_img &&
                    `${URL__API}/storage/${userChat?.user_img}`
                  }
                />
                <div className="name-user">
                  <p> {userChat?.first_name + " " + userChat?.last_name} </p>
                  <span className="seen"> {userIsOnline == "active" ? t("Avilable") : t("Unavilable now") } </span>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
                {!chatMobile && (
                  <IoMdInformationCircleOutline
                    className="font-xl cursor-pointer"
                    onClick={() => {
                      setInfoActive(true);
                      setInfo(!info);
                    }}
                  />
                )}
                {/* <BsThreeDotsVertical className="font-xl cursor-pointer " /> */}
                {chatMobile && (
                  <IoClose
                    className="fs-2 cursor-pointer"
                    style={{ fontSize: "30px" }}
                    onClick={() => {
                      setIdChat("");
                      setChatUser("");
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <div
            className="content__body"
            id="scrollableDiv"
            style={{
              border: "1px solid black",
              overflow: "auto",
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            <InfiniteScroll
              dataLength={items.length}
              next={loadMore}
              hasMore={hasMore}
              style={{ display: "flex", flexDirection: "column-reverse" }}
              inverse={true}
              scrollableTarget="scrollableDiv"
            >
              <div className="chat__items">
                {Object.keys(groupedMessages).map((dateLabel) => (
                  <div key={dateLabel} className="chat__date-group">
                    <div className="chat__date-label">{dateLabel}</div>
                    {groupedMessages[dateLabel].map((message) => (
                      <ChatItem
                        scrollRef={scrollRef}
                        // animationDelay={index + 2}
                        message={message}
                        // key={index}
                        user={message.from_id == user?.id ? "me" : "other"}
                        msg={message?.message || message?.body}
                        image={message.image}
                        userChat={userChat}
                        seen={seen}
                        language={currentLanguage} 
                        currentPlayingId={currentPlayingId}
                        setCurrentPlayingId={setCurrentPlayingId}
                        stopPreviousInstance={stopPreviousInstance} // Callback to stop the current instance
                        setStopPreviousInstance={setStopPreviousInstance} // Setter for the callback

                      />
                    ))}
                  </div>
                ))}
                {/* {items.length > 0 &&
              items.map((message, index) => {
                return (
                  <ChatItem
                    scrollRef={scrollRef}
                    animationDelay={index + 2}
                    message={message}
                    key={index}
                    user={message.from_id == user?.id ? "me" : "other"}
                    msg={message?.message || message?.body}
                    image={message.image}
                    userChat={userChat}
                    seen={seen}
                  />
                );
              })} */}
              </div>
            </InfiniteScroll>
          </div>
          {file.length >0 && (
            <div className="d-flex align-items-center gap-3 p-2">
              {file.map((file, index) => (
                <div
                  key={index}
                  className="selectedFile"
                  style={{ position: "relative" }}
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    style={{ height: "200px", width: "auto" }}
                  />
                  <div
                    className="close"
                    style={{
                      position: "absolute",
                      top: "5px",
                      left: "5px",
                      background: "red",
                      color: "#fff",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "30px",
                      height: "30px",
                      cursor: "pointer",
                    }}
                  >
                    <AiOutlineClose
                      className="deleteIcon"
                      style={{
                        background: "red",
                        color: "#fff",
                        borderRadius: "50%",
                      }}
                      onClick={() => removeFile(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          <form
            className="content__footer position-relative d-flex justify-content-between px-2"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >



            <div className="d-flex align-items-end gap-2 mb-4">
              <div
                className=""
                style={{ alignItems: "flex-end", display: "flex" }}
              >
                <BsEmojiSmile
                  onClick={() => setShowEmoji((val) => !val)}
                  style={{ cursor: "pointer", fontSize: "25px" }}
                />
                {showEmoji && (
                  <div ref={emojiRef}>
                    <Picker
                      pickerStyle={{ width: "100%" }}
                      onEmojiClick={addEmoji}
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
              {/* <div
                className="addFiles d-flex align-items-start gap-2 "
                style={{ alignItems: "flex-end" }}
              >
                <input
                  type="file"
                 
                  onChange={handleFileChange}
                  className="d-none"
                  accept=".png,.jpg,.jpeg"
                  id="file"
                />
                <label htmlFor="file">
                  <AiOutlinePlus
                    className="cursor-pointer font-lg"
                    htmlFor="file"
                  />
                </label>
              </div> */}
              
                 {/* Voice Recording */}
  {/* <div className=" d-flex align-items-end gap-2"  style={{ alignItems: "flex-end" }}>
  <FaMicrophoneAlt
      onClick={isRecording ? stopRecording : startRecording}
      style={{
        fontSize: "20px",
        cursor: "pointer",
        color: isRecording ? "red" : "black",
      }}
    />


              </div> */}
            </div>



            <div className="sendNewMessage d-flex">
  <textarea
    onKeyDown={handleKeyDown}
    ref={textareaRef}
    value={text}
    style={{ height: "40px", maxHeight: "25vh" }}
    onChange={(e) => {
      setText(e.target.value);
      adjustTextareaHeight(e);
    }}
    placeholder={t("Message")}
    className="w-full bg-transparent outline-none resize-none text-lg"
    cols="30"
    rows="2"
  ></textarea>
</div>

{/* Conditionally render the file and voice icons or the submit button */}
{text || file.length > 0 || audioBlob ? (
  // Submit button
  <button
    type="submit"
    disabled={loading}
    className="send not__bg mb-3 align-items-end  d-flex"
  >
    <IoSend className="font-xl cursor-pointer" />
  </button>
) : (
  // File and voice icons
  <div className="d-flex align-items-end gap-2 mb-4 ml-2">
    <div
      className="addFiles d-flex align-items-start gap-2 "
      
    >
      <input
        type="file"
        onChange={handleFileChange}
        className="d-none"
        accept=".png,.jpg,.jpeg"
        id="file"
      />
      <label htmlFor="file">
        <AiOutlinePlus
          className="cursor-pointer font-lg"
          htmlFor="file"
        />
      </label>
    </div>
    <div
      className=" d-flex align-items-end gap-2"
      style={{ alignItems: "flex-end" }}
    >
      <FaMicrophoneAlt
        onClick={isRecording ? stopRecording : startRecording}
        style={{
          fontSize: "20px",
          cursor: "pointer",
          color: isRecording ? "red" : "black",
        }}
      />
    </div>
  </div>
)}



            {/* {text || file.length > 0 || audioBlob ? (
              <button
                type="submit"
                disabled={loading}
                className="send not__bg mb-3 align-items-end  d-flex"
              >
                <IoSend className="font-xl cursor-pointer" />
              </button>
            ) : (
              <button
                disabled={true}
                style={{ color: "gray" }}
                className="send not__bg mb-3 align-items-end  d-flex"
                // onClick={sendMessage}
              >
                <IoSend className="font-xl cursor-pointer" />
              </button>
            )} */}
          </form>
        </>
      )}
    </div>
  );
}

export default ChatContent;

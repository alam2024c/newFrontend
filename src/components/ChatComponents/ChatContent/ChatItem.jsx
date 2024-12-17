import React, { useRef, useEffect, useState } from "react";
import TextPost from "../../PostHeader/TextPost";
import { FaRegClock } from "react-icons/fa";
import { Dropdown } from "../../ui";
import { dots } from "../../../assets/icons";
import { SlideshowLightbox } from "lightbox.js-react";
import { useTranslation } from "react-i18next";

import WaveSurfer from "wavesurfer.js";

import { trash } from "../../../assets/images/icons";
function ChatItem({ msg, user, scrollRef, message, userChat, seen , language,
currentPlayingId, setCurrentPlayingId}) {
  // const themeColor = localStorage.getItem("themeColor");
  // const [t, i18n] = useTranslation();

  const URL__API = import.meta.env.VITE_REACT_APP_API_KEY;
  function convertDateFormat(originalDate) {
    // Convert the original date string to a Date object
    const dateObj = new Date(originalDate);

    const formattedDate = dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Return the formatted date
    return formattedDate;
  }
  const dropdownDataMe = [
    { name: "delete message", image: trash, value: "delete" },
    // { name: "edit post", image: edit, value: "edit" },
  ];

   // References for the waveform and WaveSurfer instance
   const waveformRef = useRef(null);
   const wavesurferRef = useRef(null);
   const [isPlaying, setIsPlaying] = useState(false); // State for play/pause
   const { t } = useTranslation(); // Use the translation hook

   useEffect(() => {
    if (message.voice && waveformRef.current) {
      // تدمير أي موجة سابقة
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
  
      // إنشاء WaveSurfer جديد مع دعم RTL عند اللغة العربية
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#4CAF50", // لون الموجة
        progressColor: "#000", // لون التقدم
        height: 50, // ارتفاع الموجة
        barWidth: 3, // عرض كل بار
        barGap: 2, // الفجوة بين الأعمدة
        barRadius: 3, // الأطراف المستديرة
        responsive: true, // دعم الحجم الديناميكي
        cursorColor: "#78e378", // لون المؤشر
        rtl: language === "ar", // عكس الاتجاه إذا كانت اللغة عربية
      });
  
      // تحميل ملف الصوت
      wavesurferRef.current.load(`${URL__API}/storage/${message.voice}`);
  
      // تنظيف عند إلغاء التثبيت
      return () => {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null; // إعادة تعيين المرجع
      };
    }
  }, [message.voice, URL__API, language]); // إضافة اللغة كعامل مؤثر
  
  

  // Play/Pause handler
  const handlePlayPause = () => {
    if (!wavesurferRef.current) return;
  
    if (currentPlayingId && currentPlayingId !== message.id) {
      // Stop the currently playing instance
      if (stopPreviousInstance) {
        stopPreviousInstance(); // Stop the previous instance
      }
    }
  
    // Play or pause the current message
    wavesurferRef.current.playPause();
  
    const isNowPlaying = !isPlaying;
    setIsPlaying(isNowPlaying);
  
    if (isNowPlaying) {
      // Start playing and set this as the global playing instance
      setCurrentPlayingId(message.id);
      setStopPreviousInstance(() => () => {
        wavesurferRef.current.pause();
        wavesurferRef.current.seekTo(0); // Reset to the start
        setIsPlaying(false);
      });
    } else {
      // Stop playing and clear the global playing ID
      setCurrentPlayingId(null);
      setStopPreviousInstance(null);
    }
  };
  
  
  


  return (
    <div ref={scrollRef} className={`chat__item ${user ? user : ""}`}>



  {/* Check if it's a voice message */}
  {message.voice ? (
    <div className={`chat__item__content  align-items-center  `}  style={{
            borderRadius: "25px", 
            backgroundColor: "#91F48F",
            // padding: "10px", 
            // display: "flex",
            // alignItems: "center",
          }}>
    {user === "me" && (
            <div className="d-flex" style={{ justifyContent: "end" }}>
              <Dropdown
                buttonData={<img className="w-5" src={dots} alt="" />}
                data={dropdownDataMe}
                post={message}
                type="message"
              />
            </div>
          )}

        <div
          className={`chat__item__content voice-message-container gap-1 align-items-center py-1`}
       
        >
        

          {/* Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            className="play-pause-button"
            style={{
              border: "none",
              background: "none",
              outline: "none",
              cursor: "pointer",
              padding: "0",
            }}
          >
            {isPlaying ? (
                // Pause Button

              <div
    style={{
      width: "15px",
      height: "15px",
      display: "flex",
      justifyContent: "space-between", 
      alignItems: "center", 
    }}
  >


    <div
      style={{
        width: "4px", 
        height: "15px",
        backgroundColor: "#000", 
      }}
    ></div>
    <div
      style={{
        width: "4px", // Width of each bar
        height: "15px", // Height of the bar
        backgroundColor: "#000", // Black color
      }}
    ></div>
  </div>
  
) : (

   // Play Button
   <div
    style={{
      width: "15px",
      height: "15px",
      backgroundColor: "#000", // Black color
      clipPath: "polygon(0% 0%, 0% 100%, 100% 50%)"
                    // language === "ar" // Check the language
                    // ? "polygon(100% 0%, 100% 100%, 0% 50%)"
                       // Triangle points left for Arabic
                      // : "polygon(0% 0%, 0% 100%, 100% 50%)", 
                      // Triangle points right for English

    }}
  ></div>



)}

          </button>

          {/* Render waveform */}
          <div
            ref={waveformRef}
            style={{ flex: 1, marginLeft: "10px" , direction: language === "ar" ? "ltr" : "rtl" }} // Align and size the waveform
           
          ></div>

          {/* Render message metadata */}
          {/* Abdallah remove the date of send to be like requesr order  */}
          {/* <span
            style={{ marginLeft: "10px", color: "gray", fontSize: "12px" }}
          >
            {convertDateFormat(message?.created_at)}
          </span> */}



          {/* {user === "me" && (
            <div className="d-flex" style={{ justifyContent: "end" }}>
              <Dropdown
                buttonData={<img className="w-5" src={dots} alt="" />}
                data={dropdownDataMe}
                post={message}
                type="message"
              />
            </div>
          )} */}


        </div>
        </div>
      ) : (
      <div className={`chat__item__content  gap-3 align-items-center  py-1`}>
        {user == "me" && (
          <div className="d-flex" style={{ justifyContent: "end" }}>
            <Dropdown
              buttonData={<img className="w-5" src={dots} alt="" />}
              data={dropdownDataMe}
              post={message}
              type="message"
            />
          </div>
        )}

        {message?.attachment && (
          <>
            <SlideshowLightbox className="">
              <img
                className="w-100 mb-2 rounded"
                src={`${URL__API}/storage/attachments/${
                  message?.attachment?.new_name || message?.attachment?.file}`}
                alt=""
              />
            </SlideshowLightbox>
          </>
        )}


        
        <div className="chat__msg">
          <TextPost text={msg} />
        </div>

        <div className="chat__meta">
          {user == "me" && (
            <>
              {/* {seen ? (
                <svg
                  fill="green"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.305,11.235a1,1,0,0,1,1.414.024l3.206,3.319L14.3,7.289A1,1,0,0,1,15.7,8.711l-8.091,8a1,1,0,0,1-.7.289H6.9a1,1,0,0,1-.708-.3L2.281,12.649A1,1,0,0,1,2.305,11.235ZM20.3,7.289l-7.372,7.289-.263-.273a1,1,0,1,0-1.438,1.39l.966,1a1,1,0,0,0,.708.3h.011a1,1,0,0,0,.7-.289l8.091-8A1,1,0,0,0,20.3,7.289Z" />
                </svg>
              ) : ( */}
              <>
                {message?.seen != 2 ? (
                  <>
                    {" "}
                    {message?.seen == 1 ? (
                      <svg
                        fill="green"
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2.305,11.235a1,1,0,0,1,1.414.024l3.206,3.319L14.3,7.289A1,1,0,0,1,15.7,8.711l-8.091,8a1,1,0,0,1-.7.289H6.9a1,1,0,0,1-.708-.3L2.281,12.649A1,1,0,0,1,2.305,11.235ZM20.3,7.289l-7.372,7.289-.263-.273a1,1,0,1,0-1.438,1.39l.966,1a1,1,0,0,0,.708.3h.011a1,1,0,0,0,.7-.289l8.091-8A1,1,0,0,0,20.3,7.289Z" />
                      </svg>
                    ) : (
                      <svg
                        width="15px"
                        height="15px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>i</title>
                        <g id="Complete">
                          <g id="tick">
                            <polyline
                              points="3.7 14.3 9.6 19 20.3 5"
                              fill="none"
                              stroke="#000000"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                            />
                          </g>
                        </g>
                      </svg>
                    )}
                  </>
                ) : (
                  <FaRegClock />
                )}
              </>
              {/* )} */}
            </>
          )}
          
<span>{t("Sent at")}: {convertDateFormat(message?.created_at)}</span>

        </div>
      </div>
)}    </div>
  );
}

export default ChatItem;





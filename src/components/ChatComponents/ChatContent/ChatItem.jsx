import TextPost from "../../PostHeader/TextPost";
import { useSelector } from "react-redux";
import { FaRegClock } from "react-icons/fa";
import { Dropdown } from "../../ui";
import { dots } from "../../../assets/icons";
import { SlideshowLightbox } from "lightbox.js-react";

import { trash } from "../../../assets/images/icons";
function ChatItem({ msg, user, scrollRef, message, userChat, seen }) {
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
  return (
    <div ref={scrollRef} className={`chat__item ${user ? user : ""}`}>
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
                  message?.attachment?.new_name || message?.attachment?.file
                }`}
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
          <span style={{ color: "gray", direction: "ltr" }} dir="ltr">
            {convertDateFormat(message?.created_at)}
          </span>
        </div>
      </div>
      {/* <Avatar isOnline="active" image={image} /> */}
    </div>
  );
}

export default ChatItem;

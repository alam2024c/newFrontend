import { useTranslation } from "react-i18next";
import Header from "../../../assets/images/Header.png";
import character from "../../../assets/images/character-of-the-week.png";
import send from "../../../assets/images/send.png";
import Actions from "./Actions";
import { useNavigate } from "react-router-dom";
import AcceptFollow from "../FriendRequest/AcceptFollow";

// eslint-disable-next-line react/prop-types
export default function Cartfriend({ type, data, button, user }) {
  const [t] = useTranslation();
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const navigate = useNavigate();
  console.log(user);
  return (
    <div className="border-0 shadow-xss rounded-3 bg-[#F7F9FA]">
      {/* <img className="w-full" src={Header} alt="" /> */}
      <div onClick={() => navigate(`/profile/${user?.user_name}`)}>
        {user?.profile?.cover ? (
          <img
            style={{ height: "100px" }}
            src={`${URL}/storage/${user?.profile?.cover}`}
            className="w-full"
            alt="profile"
          />
        ) : (
          <img src={Header} alt="profile" className="w-full" />
        )}
      </div>
      <div
        className="mt-4  px-3 text-black relative"
        onClick={() => navigate(`/profile/${user?.user_name}`)}
      >
        {user?.profile?.image ? (
          <img
            src={`${URL}/storage/${user?.profile.image}`}
            className="absolute -top-16 w-20"
            alt="profile"
            style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          />
        ) : (
          <img
            src={character}
            alt="profile"
            className="absolute -top-16 w-20"
            style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          />
        )}
        {/* <img className="absolute -top-16 w-20" src={character} alt="" /> */}

        <h2 className="">
          {" "}
          {user?.first_name.length > 14
            ? `${user?.first_name.slice(0, 14)} ...`
            : user?.first_name}{" "}
          {user?.last_name}
        </h2>
        {/* <div>{details}</div> */}
      </div>
      <div className="friend__box__buttons d-flex align-items-center gap-1 my-2 px-3">
        {type == "suggest" ? (
          <Actions user={user} />
        ) : type == "request" ? (
          <AcceptFollow e={user} />
        ) : (
          <div className=" pt-0   gap-1 ">
            <button
              className="font-xss  text-white text-center font-xssss align-items-center"
              style={{
                borderRadius: "50px",
                border: "1px solid",
                fontSize: "17px",
                borderRadius: "50px",
                padding: "6px 10px",
                lineHeight: "normal",
                fontSize: "17px",
                color: "#fff",
                // marginRight: "15px",
              }}
              onClick={() => navigate(`/profile/${user.user_name}`)}
            >
              <span> {t(button)}</span>
            </button>
          </div>
        )}
        <button
          onClick={() => navigate(`/chat/${user?.user_name}`)}
          className=" text-center  bg-red-600   d-flex d-felx align-items-center gap-2"
          style={{
            borderRadius: "50px",
            border: "1px solid",
            fontSize: "17px",
            borderRadius: "50px",
            padding: "6px 14px",
            lineHeight: "normal",
            fontSize: "17px",
            color: "#fff",
            // marginRight: "15px",
          }}
        >
          {t("Send")} <img src={send} alt="" style={{ width: "15px" }} />
        </button>
        {/* <img className="delete" src={delet} alt="profile" /> */}
      </div>

      {/* <div className="m-4">
        <Button className="rounded-md md:px-16" children={"view profile"} />
      </div> */}
    </div>
  );
}

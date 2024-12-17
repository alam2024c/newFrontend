import React, { useState } from "react";
import { Button, Modal } from "../ui";
import { useTranslation } from "react-i18next";
import {
  facebook,
  twitter,
  reddit,
  whatsApp2,
  copy,
} from "../../assets/images/icons";
import "./ShareModel.scss";
import SinglePost from "../singlePost/SinglePost";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

export default function ShareModel({
  isShareOpen,
  closeShareModal,
  setIsShareModelOpen,
  data,
}) {
  const socialIcons = [
    { icon: twitter, name: "Twitter" },
    { icon: facebook, name: "Facebook" },
    { icon: reddit, name: "Reddit" },
    { icon: whatsApp2, name: "WhatsApp" },
  ];

  const [t] = useTranslation();
  const [text, setText] = useState();
  const [isArabic, setIsArabic] = useState(false);

  const { token, user } = useSelector((state) => state.auth);

  //upload text and photo and audio
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const handleClick = async () => {
    setIsShareModelOpen(false);
    const sendData = {
      text,
      share_id: data?.id,
      classification_id: 8,
      category_id: 1,
      // classification_id: data?.classification_id,
      // category_id: data?.category_id,
      privacy: "public",
    };
    try {
      const res = await axios.post(
        `${URL}/api/post/create_post`,
        sendData,

        {
          headers: {
            Accept: "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data) {
        toast.success("تم نشر المنشور");

        setText("");
      }
    } catch (err) {
      toast.error(t("A network error occurred"));
      setText("");
    }
  };

  const handleCopyClick = () => {
    copyToClipboard(`https://alam.foundation/singlePost/${data.id}`);
    toast.success("Coped");
  };

  const copyToClipboard = (text) => {
    const textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  return (
    <div>
      <Modal
        isOpen={isShareOpen}
        closeModal={closeShareModal}
        title={t("Share this post")}
        closeIcon={true}
        isFullScreen={true}
      >
        <textarea
          value={text}
          placeholder={t("what's on your mind")+" " + user?.first_name}
          onChange={(e) => setText(e.target.value)}
          className={`w-full outline-none resize-none px-2 h-28 text-xl w-100 `}
          // placeholder={
          //   placeholder
          //     ? t(placeholder)
          //     : `${t("write something")} ${t(",")} ${user.first_name}`
          // }
        />
        {/* <div style={{ border: "1px solid #ccc", borderRadius: "10px" }}>
          <SinglePost key={data.id} data={data} type="true" />
        </div> */}
        <div className="w-100 d-flex align-items-center  mt-4">
          <button
            onClick={() => handleClick()}
            className="   text-white d-flex mb-4 d-felx align-items-center gap-2"
            // onClick={() => handleFollow()}
            style={{
              borderRadius: "50px",
              backgroundColor: "rgb(0, 153, 171)",
              padding: "6px 21px",
              lineHeight: "normal",
              fontSize: "17px",
              marginRight: "15px",
            }}
            // className={` bg-primary-gradiant ms-2 text-whit text-center font-xssss align-items-center"`}
          >
            <div className={`children`}>{t("Share")}</div>
          </button>
          {/* <p className="text-stone-900 text-lg">
            {t("if you like this post share it with your friends!")}
          </p> */}
        </div>

        <ul className="sharingButtons mb-4">
          <FacebookShareButton
            url={`https://alam.foundation/singlePost/${data.id}`}
            quote={"title"}
          >
            <li className={"Facebook"} role="button">
              <button>
                <img src={facebook} alt={"Facebook"} />
              </button>
              <p>{t("Facebook")}</p>{" "}
            </li>
          </FacebookShareButton>
          <TwitterShareButton
            url={`https://alam.foundation/singlePost/${data.id}`}
            quote={"title"}
          >
            <li className={"Twitter"} role="button">
              <button>
                <img src={twitter} alt={"Twitter"} />
              </button>
              <p>{t("Twitter")}</p>{" "}
            </li>
          </TwitterShareButton>
          <WhatsappShareButton
            url={`https://alam.foundation/singlePost/${data.id}`}
            quote={"title"}
          >
            <li className={"WhatsApp"} role="button">
              <button>
                <img src={whatsApp2} alt={"WhatsApp"} />
              </button>
              <p>{t("WhatsApp")}</p>{" "}
            </li>
          </WhatsappShareButton>
        </ul>

        <div className="share__link">
          <input
            type="text"
            disabled
            value={`https://alam.foundation/singlePost/${data.id}`}
            placeholder={t("Now copy the link from here")}
          />
          <button onClick={() => handleCopyClick()}>
            <img src={copy} alt="" role="button" />
          </button>
        </div>
      </Modal>
    </div>
  );
}

import { Modal } from "../ui";
import {
  facebook,
  twitter,
  reddit,
  whatsApp2,
  copy,
  close1,
} from "../../assets/images/icons";
import "./ShareModal.scss";
import { t } from "i18next";

export default function ShareModal({ isOpen, closeModal }) {
  const socialIcons = [
    { icon: twitter, name: "Twitter" },
    { icon: facebook, name: "Facebook" },
    { icon: reddit, name: "Reddit" },
    { icon: whatsApp2, name: "WhatsApp" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      width="w-[35rem]"
      height="h-auto"
    >
      <div className="flex justify-between">
        <h2 className="font-bold text-xl py-2">{t("Share this post")}</h2>
        <button onClick={closeModal}>
          <img src={close1} alt="" role="button" />
        </button>
      </div>

      <p className="text-stone-900 text-lg ">
        {t("if you like this post share it with your friends.")}
      </p>

      <ul className="sharingButtons">
        {socialIcons.map((socialIcon, index) => (
          <li
            key={index}
            className={socialIcon.name}
            role="button"
          >
            <button>
              <img src={socialIcon.icon} alt={socialIcon.name} />
            </button>
            <p>{t(socialIcon.name)}</p>
          </li>
        ))}
      </ul>

      <div className="share__link">
        <input
          type="text"
          disabled
          placeholder={t("Now copy the link from here")}
        />
        <button>
          <img src={copy} alt="" role="button" />
        </button>
      </div>
    </Modal>
  );
}

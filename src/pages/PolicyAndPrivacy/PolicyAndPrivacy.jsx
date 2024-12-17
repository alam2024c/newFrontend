import React from "react";
import { useTranslation } from "react-i18next";
import { MdEmail } from "react-icons/md";

function PolicyAndPrivacy() {
  const themeColor = localStorage.getItem("themeColor");
  const [t, i18n] = useTranslation();

  return (
    <div className="max-w-4xl m-auto pt-5 p-3">
      <h3 className={`font-xxl fw-bolder text-current mb-4`}>
        {t("Privacy Policy")}
      </h3>
      <div className="mb-5">
        <p>
          {t(
            "We are committed to protecting the privacy of our users. This privacy policy explains how we collect, use, and protect your personal information when you use our platform. We respect your privacy and strive to ensure that your personal information is protected in the best possible ways."
          )}
        </p>
      </div>
      <div className="mb-5">
        <h3 className={`font-xxl fw-bolder text-current mb-4`}>
          {t("Information We Collect:")}
        </h3>
        <ul>
          <li>
            {t(
              "Information you provide directly to us, such as your name and email address."
            )}
          </li>
          <li>
            {t(
              "Information we collect automatically when you use our platform, such as your IP address and browsing history."
            )}
          </li>
          <li>
            {t(
              "Information we obtain from third parties, such as social media data."
            )}
          </li>
        </ul>
      </div>
      <div className="mb-5">
        <h3 className={`font-xxl fw-bolder text-current mb-4`}>
          {t("How We Use Information:")}
        </h3>
        <ul>
          <li>{t("To provide and improve our services.")}</li>
          <li>{t("To personalize your experience on our platform.")}</li>
          <li>{t("To communicate with you about updates and services.")}</li>
          <li>{t("For security purposes and to protect users.")}</li>
        </ul>
      </div>
      <div className="mb-5">
        <h3 className={`font-xxl fw-bolder text-current mb-4`}>
          {t("Protecting Your Information:")}
        </h3>
        <p>
          {t(
            "We take necessary measures to protect your information from unauthorized access, alteration, disclosure, or destruction. We use security technologies such as encryption and firewalls to ensure the confidentiality of your information."
          )}
        </p>
      </div>
    </div>
  );
}

export default PolicyAndPrivacy;

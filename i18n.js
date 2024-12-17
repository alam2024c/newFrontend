import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "./src/locale/en.json";
import translationAr from "./src/locale/ar.json";
import LanguageDetector from "i18next-browser-languagedetector";
const lang = localStorage.getItem("i18nextLng");
const resources = {
  ar: {
    translation: translationAr,
  },
  en: { translation: translationEn },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: lang === "en" ? lang : "ar",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspanse: false,
    },
  });

export default i18n;

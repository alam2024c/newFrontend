/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";

export default function Pageheader({ onClick, activeType, button }) {
  const [t] = useTranslation();

  return (
    <div
      className={
        activeType == button
          ? "articleType cursor-pointer  active"
          : "articleType cursor-pointer "
      }
      style={
        activeType == button
          ? { borderBottom: "4px solid rgb(0, 153, 171)" }
          : {}
      }
      onClick={onClick}
    >
      <h3
        style={
          activeType == button
            ? {
                color: "#0099AB",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "28.5px",
                textAlign: "center",
              }
            : {
                color: "#000",
                fontWeight: 700,
                fontSize: "20px",
                lineHeight: "28.5px",
                textAlign: "center",
              }
        }
      >
        {t(button)}
      </h3>
    </div>
  );
}

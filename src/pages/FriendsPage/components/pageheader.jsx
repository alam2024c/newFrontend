import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Pageheader({
  activeType,
  setActiveTypeFriend,
  icon,
  title,
}) {
  const [t] = useTranslation();
  const name = useParams().name;
  const navigate = useNavigate();
  return (
    <div
      className={
        name == activeType
          ? "articleType col-xl-3 col-md-6  "
          : "articleType col-xl-3 col-md-6 "
      }
      style={
        name == activeType
          ? {
              borderBottom: "2px solid #0099AB",
              color: "#0099AB",
              backgroundColor: "transparent",
              transition: ".3s",
            }
          : { backgroundColor: "#fff", color: "#000", border: "none" }
      }
      onClick={() => {
        navigate(`/${activeType}`);
        // setActiveTypeFriend(activeType);
      }}
    >
      <h3
        style={
          // activeTypeFriend === activeType
          //     ?
          {
            color: "#0099AB",
            fontWeight: 700,
            fontSize: "19px",
            lineHeight: "28.5px",
            display: "flex",
          }
          // : { color: "#000", fontWeight: 700, fontSize: "19px", lineHeight: "28.5px" , display: "flex"  }
        }
      >
        {icon}
        {t(title)}
      </h3>
    </div>
  );
}

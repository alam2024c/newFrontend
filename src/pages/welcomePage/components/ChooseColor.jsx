import { useState } from "react";
import { Button } from "../../../components/ui";
import { check } from "/src//assets/icons";
import { useNavigate } from "react-router-dom";
import { BsCheck2 } from "react-icons/bs";
import { t } from "i18next";
import "./language.scss";
import { tick } from "../../../assets/images/icons";
import { useDispatch } from "react-redux";
import { colorDispacth } from "../../../rtk/slices/authSlice";
export default function ChooseColor({ themeColor, setThemecolor }) {
  const colors = [
    "#D91E1E",
    "#C2CD3A",
    "#26D623",
    "#1067CC",
    "#8A19CF",
    "#685628",
    "#FFAA06",
    "#000000",
    "#41DBDB",
    "#2D7621",
    "#81A5A3",
    "#0099AB",
    "#FF00B8",
    "#112A84",
  ];
  const [checked, setChecked] = useState("#0099AB");
  const navigate = useNavigate();
  const handleNextClick = () => {
    // Handle next button click
    // You can use the selectedLanguage state here
    // if (selectedLanguage) {
    // Navigate to the home page or your desired destination
    navigate("/");
    // }
  };
  var element = document.querySelector("body");
  const dispatch = useDispatch();

  const [selected, setSelected] = useState(
    localStorage.getItem("color-helnet")
      ? `#${localStorage.getItem("color-helnet").slice(1)}`
      : "#0099AB"
  );
  const handleButtonClick = (color) => {
    element.classList.remove(
      "ED91E1E",
      "EC2CD3A",
      "E26D623",
      "E1067CC",
      "E8A19CF",
      "E685628",
      "EFFAA06",
      "E000000",
      "E41DBDB",
      "E2D7621",
      "E81A5A3",
      "E0099AB",
      "EFF00B8",
      "E112A84"
    );
    element.classList.add(color);
    localStorage.setItem("color-helnet", color);
    dispatch(colorDispacth(color));
  };
  return (
    // <div className="flex flex-col justify-center items-center sm:text-center gap-20 m-2  md:p-7  ">
    //   <div>
    //     <p className="text-3xl pb-12">
    //       {"Please answer those Questions To get more details" + " .."}
    //     </p>
    //     <p className="text-xl">
    //       {"What language do you prefer"}
    //       {" ?"}
    //     </p>
    //   </div>
    //   <div className="flex flex-row flex-wrap flex-1 justify-center items-center sm:gap-8 gap-4">
    //     {colors.map((button, index) => (
    //       <button
    //         key={index}
    //         className="flex flex-col justify-center items-center gap-4 border shadow-lg rounded-3xl w-32 h-32"
    //         style={{
    //           backgroundColor: button,
    //         }}
    //         onClick={() => {
    //           setChecked(button);
    //         }}
    //       >
    //         {checked === button && (
    //           <img className="w-16 h-16" src={check} alt="" />
    //         )}
    //       </button>
    //     ))}
    //   </div>
    //   <div className="flex sm:flex-row flex-col justify-center sm:justify-between items-center gap-8">
    //     <Button
    //       className="px-14 capitalize rounded-lg border-0"
    //       backgroundColor="#B9BCBE"
    //       children="back"
    //     />
    //     <Button
    //       className="px-14 capitalize rounded-lg"
    //       children="next"
    //       onClick={handleNextClick}
    //     />
    //   </div>
    // </div>
    <div className="languagePage">
      <div className="cardLanguage p-4">
        <p>{t("Please answer those Questions To get more details ..")}</p>
        <h3>{t("What color do you prefer ?")}</h3>
        <div
          className="d-flex w-100 align-items-center justify-content-center flex-wrap gap-5"
          dir="ltr"
        >
          {" "}
          <div className="flex flex-wrap  align-items-center gap-5 justify-content-center">
            {" "}
            {colors.map((color) => (
              <div
                key={color}
                className="ColorCardOne"
                onClick={() => {
                  setSelected(color);
                  handleButtonClick("E" + color.slice(1));
                }}
                style={{
                  backgroundColor: color,
                }}
              >
                {" "}
                {color === selected && (
                  <img src={tick} alt="" style={{ width: "40px" }} />
                )}{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </div>
        <div className="d-flex buttonsLang justify-content-between">
          <button
            className={`next ${themeColor} bg-current2`}
            onClick={() => navigate("/language")}
          >
            {t("Back")}
          </button>
          <button
            className={`next ${themeColor} bg-current2`}
            onClick={() => navigate("/")}
          >
            {t("Finish")}
          </button>
        </div>
      </div>
    </div>
  );
}

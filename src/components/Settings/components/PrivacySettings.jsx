import { useDispatch, useSelector } from "react-redux";
import { chrome, location } from ".";
import FormSelect from "../../formSelect/FormSelect";
import { Button, Select } from "../../ui";
import axios from "axios";
import { useState } from "react";
import { t } from "i18next";
import { getUser } from "../../../rtk/Api/Api";
import { toast } from "react-toastify";
import { tick } from "../../../assets/images/icons";
import { colorDispacth } from "../../../rtk/slices/authSlice";
import SettingsInfo from "../../navBar/SettingsInfo";

export default function PrivacySettings() {
  const [formValues, setFormValues] = useState({});
  const { token, user } = useSelector((state) => state.auth);

  const inputsSelect = [
    {
      name: t("Account Privacy"),
      type: "select",
      select: ["Public", "Private"],
      state: "privacy",
    },
  ];

  const dispatch = useDispatch();

  //upload text
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const handleButtonClick = async () => {
    if (!formValues?.first_name) {
      formValues.first_name = user?.first_name;
    }
    if (!formValues?.last_name) {
      formValues.last_name = user?.last_name;
    }
    if (!formValues?.email) {
      formValues.email = user?.email;
    }
    //  if (!formValues?.first_name) {
    //    formValues.fName = user?.fName;
    //  }
    console.log(formValues);
    try {
      const res = await axios.post(
        `${URL}/api/profile/updateInformation`,
        formValues,

        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);

      if (res.status == 201) {
        await getUser(token, dispatch);
        toast.success(t("Updated Successfully"));
      }
    } catch (err) {
      // if (err?.response?.data?.error) {
      //   toast.error(err?.response?.data?.error?.phone[0]);
      // }

      console.log(err);
    }
  };
  const [selected, setSelected] = useState(
    localStorage.getItem("color-helnet")
      ? `#${localStorage.getItem("color-helnet").slice(1)}`
      : "#0099AB"
  );
  var element = document.querySelector("body");

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
  const handleButtonClick__color = (color) => {
    console.log(color);
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
    <div className="grid gap-4">
      <div className="updateInfo">
        <div className="inputSelect">
          <FormSelect
            inputs={inputsSelect}
            name={t("Save modifications")}
            setFormValues={setFormValues}
          />
          <Button
            children={t("Save modifications")}
            onClick={handleButtonClick}
          />
        </div>
      </div>
      {/* <div className="container">
        <div className="grid  gap-4 grid-cols-6 colors md:d-none">
          {" "}
          {colors.map((color) => (
            <div
              key={color}
              className="bg-[${color}] w-10 h-10 relative rounded-full flex justify-center items-center"
              onClick={() => {
                setSelected(color);
                handleButtonClick__color("E" + color.slice(1));
              }}
              style={{
                backgroundColor: color,
              }}
            >
              {" "}
              {color === selected && <img src={tick} alt="" />}{" "}
            </div>
          ))}{" "}
        </div>
      </div> */}
      <div className="colors">
        <SettingsInfo />
      </div>
    </div>
  );
}

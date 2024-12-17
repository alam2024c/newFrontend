import { eyeClose, eyeOpen } from "../../../assets/images/icons";
import { useEffect, useState } from "react";
import "./Input.scss";

export default function Input({
  inputID,
  type,
  value,
  label = "",
  className = "",
  inputClassName ,
  placeholder = "",
  hasIcon = false,
  bg = "bg-[#F2F2F2]",
  checked = false,
  required = false,
  readOnly = false,
  onClick = () => {},
  handleChange = () => {},
  ...rest
}) {
  const [direction, setDirection] = useState("ltr");

  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setDirection(localStorage.getItem("direction"));
  }, []);

  const togglePasswordVisibility = () => {
    setIsShown(!isShown);
  };

  const handleClick = (e) => {
    onClick(e);
  };

  return (
    <div className={`input d-flex  flex-column ${type} ${className}`}>
      {label && <label htmlFor={`input${inputID}`}>{label}</label>}
      <input
        id={inputID}
        type={isShown ? "text" : type}
        name={type}
        placeholder={placeholder}
        value={value}
        className={`${
          inputClassName ? inputClassName : "rounded-lg px-3"
        } ${bg}`}
        required={required}
        aria-label={label}
        aria-describedby={`input${inputID}-desc`}
        onClick={handleClick}
        onChange={handleChange}
      />

      {type === "password" && (
        <>
          <img
            className={`showPasswordIcon ${direction}`}
            src={isShown ? eyeOpen : eyeClose}
            alt={isShown ? "visible password" : "invisible password"}
            onClick={togglePasswordVisibility}
          />
          <p id={`input${inputID}-desc`} className="sr-only">
            {isShown ? "Password is visible" : "Password is hidden"}
          </p>
        </>
      )}
    </div>
  );
}

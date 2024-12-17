import React, { useEffect, useRef, useState } from "react";
import "./FormSelect.scss";
import DatePicker from "react-datepicker"; // Import DatePicker from react-datepicker
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
function FormSelect({
  inputs,
  header,
  name,
  formValues,
  setFormValues,
  post,
  required = false,
  error,
}) {
  const [date, setDate] = useState("");
  const [t] = useTranslation();
  useEffect(() => {
    if (post?.date) {
      const originalDate = post?.date;

      // Split the original date string by '-'
      const parts = originalDate?.split("-");

      // Rearrange the parts to form the desired format
      const rearrangedDate = `${parts[1]}-${parts[2]}-${parts[0]}`;

      setDate(rearrangedDate);
    }
  }, [post]);
  const handleDateChange = (inputName, date) => {
    // Format the date
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    // Format the date as MM-DD-YYYY
    setDate(date);
    const formattedDate = `${year}-${month}-${day}`;

    // Update the state with the formatted date
    setFormValues((prevValues) => ({
      ...prevValues,
      [inputName]: formattedDate,
    }));
  };
  const handleInputChange = (inputName, value, event) => {
    if (event) {
      event.target.style.height = "auto";
      event.target.style.height = event.target.scrollHeight + "px";
    }
    setFormValues((prevValues) => ({
      ...prevValues,
      [inputName]: value,
    }));
  };
  const errorRef = useRef(null);
  useEffect(() => {}, [formValues]);
  useEffect(() => {
    if (errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [error]);
  return (
    // <div className="inputSelect">
    <div className="inputSelect__All">
      {inputs?.map((tap, index) => (
        <div
          ref={error?.[tap?.state] ? errorRef : null}
          key={index}
          className={`${tap.class} input__select`}
        >
          {error?.[tap?.state] && ""}
          <label className="d-flex align-items-center gap-1">
            {t(tap.name)}{" "}
            {tap?.state != "file" && (
              <>
                {tap?.state != "url" && <span className="text-danger">*</span>}
              </>
            )}
          </label>
          {tap.type == "select" ? (
            <>
              <select
                required
                onChange={(e) => handleInputChange(tap.state, e.target.value)}
                defaultValue={tap?.default}
              >
                <option selected disabled>
                  {t("Select")}
                </option>

                {tap.select?.map((o, i) => (
                  <option key={i}>{t(o)}</option>
                ))}
              </select>
              {error?.[tap?.state]?.map((errorMsg, index) => (
                <span className="text-danger ">{errorMsg}</span>
              ))}
            </>
          ) : tap.type == "select-category" ? (
            <>
              <select
                required
                onChange={(e) => handleInputChange(tap.state, e.target.value)}
              >
                {tap?.select?.map((o, i) => (
                  <option key={i} value={o?.id}>
                    {o?.name}
                  </option>
                ))}
              </select>
              {error?.[tap?.state]?.map((errorMsg, index) => (
                <span className="text-danger ">{errorMsg}</span>
              ))}
            </>
          ) : tap.type == "filemulti" ? (
            <>
              <input
                type="file"
                multiple
                onChange={(e) =>
                  handleInputChange(tap.state, [...e.target.files])
                }
              />
              {error?.[tap?.state]?.map((errorMsg, index) => (
                <span className="text-danger ">{errorMsg}</span>
              ))}
            </>
          ) : tap.type == "file" ? (
            <>
              <input
                required={tap?.required ? true : false}
                type="file"
                multiple
                onChange={(e) =>
                  handleInputChange(tap.state, e.target.files[0])
                }
              />
              {error?.[tap?.state]?.map((errorMsg, index) => (
                <span className="text-danger ">{errorMsg}</span>
              ))}
            </>
          ) : tap.type == "video" ? (
            <>
              <input
                // required={required}
                type="file"
                accept=".mp4"
                required
                multiple
                onChange={(e) =>
                  handleInputChange(tap.state, e.target.files[0])
                }
              />
              {error?.[tap?.state]?.map((errorMsg, index) => (
                <span className="text-danger ">{errorMsg}</span>
              ))}
            </>
          ) : tap.type === "textarea" ? (
            <>
              <textarea
                style={error?.[tap?.state] ? { border: "1px solid red" } : {}}
                defaultValue={
                  post?.[tap?.state] ? post?.[tap?.state] : tap?.value
                }
                onChange={(e) =>
                  handleInputChange(tap.state, e.target.value, event)
                }
              />
              {error?.[tap?.state]?.map((errorMsg, index) => (
                <span className="text-danger ">{errorMsg}</span>
              ))}
            </>
          ) : tap.type === "date" ? (
            <>
              <DatePicker
                showIcon
                // className="px-5"
                selected={date}
                onChange={(date) => handleDateChange(tap.state, date)}
              />
              {error?.[tap?.state]?.map((errorMsg, index) => (
                <span className="text-danger ">{errorMsg}</span>
              ))}
            </>
          ) : (
            <>
              {/* {post?.[tap?.state]}as */}
              <>
                <input
                  style={error?.[tap?.state] ? { border: "1px solid red" } : {}}
                  required={tap?.state != "url"}
                  defaultValue={
                    formValues?.[tap?.state]
                      ? formValues?.[tap?.state]
                      : post?.[tap?.state]
                      ? post?.[tap?.state]
                      : tap?.value
                  }
                  type={tap.type}
                  onChange={(e) => handleInputChange(tap.state, e.target.value)}
                />
                {error?.[tap?.state]?.map((errorMsg, index) => (
                  <span className="text-danger ">{errorMsg}</span>
                ))}
              </>
            </>
          )}
        </div>
      ))}
    </div>
    // </div>
  );
}

export default FormSelect;

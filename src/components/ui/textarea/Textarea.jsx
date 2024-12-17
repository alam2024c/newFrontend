import axios from "axios";
import { useEffect, useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import { useSelector } from "react-redux";

export default function Textarea({
  placeholder,
  label = "",
  width = "w-full",
  height,
  bg = "bg-[#f2f2f2]",
  color = "text-black",
  setText,
  setMention,
  text,
  setreturn_metion,
  return_metion,
  border,
}) {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const { token } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [test, settest] = useState("");
  const handleTextChange = async (e) => {
    // تحديث النص الذي تم كتابته بما في ذلك العلامات @

    // التأكد من أن النص يبدأ بـ '@' قبل إرسال الطلب إلى الخادم
    const data = {
      query: e.slice(1),
    };
    try {
      const response = await axios.post(`${URL}/api/search-user`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }); // إزالة '@' قبل إرسال الاستعلام
      setUsers(response.data.data);
    } catch (error) {
      setUsers([]);
    }
  };
  useEffect(() => {
    handleTextChange("");
  }, []);
  const handleChangeTest = (event, newValue, newPlainTextValue, mentions) => {
    setText(newPlainTextValue);
    settest(newValue);
    setreturn_metion(newValue);
    setMention(mentions);
    // handleTextChange(newValue);
    if (newPlainTextValue == "@") {
      settest(newValue);
      handleTextChange(newValue);
    } else {
      const words = newPlainTextValue?.split(" ");
      const lastWord = words[words?.length - 1];
      if (lastWord.startsWith("@")) {
        settest(newValue);
        handleTextChange(lastWord);
      } else {
        // تنفيذ أي شيء آخر تحتاج إليه هنا إذا كانت الكلمة الأخيرة لا تبدأ بـ "@"
      }
    }
  };

  const renderSuggestion = (suggestion, search, highlightedDisplay) => (
    <div className="d-flex  align-items-center gap-2 my-1">
      <img
        src={suggestion.imageUrl}
        alt={suggestion.display}
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          marginRight: "8px",
        }}
      />
      {highlightedDisplay}
    </div>
  );

  return (
    <div className={"w-100 textarea "}>
      {label && (
        <label htmlFor={"textarea" + label} children={label} className="px-1" />
      )}
      <MentionsInput
        placeholder={placeholder}
        value={return_metion ? return_metion : ""}
        onChange={handleChangeTest}
        style={
          border
            ? {
                minHeight: "10vh",
                border: "1px solid #ccc",
                border: "1px solid #d1d2d1",
                backgroundColor: "rgb(242 242 242 / var(--tw-bg-opacity))",
                borderRadius: "10px",
              }
            : height
            ? { minHeight: "5vh" }
            : { minHeight: "20vh" }
        }
        className={border ? "" : " m-3"}
      >
        <Mention
          trigger="@"
          // value={return_metion}
          data={users}
          renderSuggestion={renderSuggestion}
          style={{
            backgroundColor: "#c7ecee",
            borderRadius: "4px",
          }}
        />
        {/* <Mention
          data={users}
          trigger="#"
          style={{
            backgroundColor: "yellow", // يمكنك تعديل اللون حسب الرغبة
            borderRadius: "4px",
          }}
        /> */}
      </MentionsInput>
      {/* 
      <textarea
        className={`resize-none rounded-xl p-3 my-1 outline-none w-full ${color} ${bg} ${height}`}
        id={"textarea" + label}
        name={"textarea" + label}
        // value={value}
        onChange={handleChange}
        placeholder={placeholder}
        style={{ minHeight: "20vh" }}
      /> */}
    </div>
  );
}

// SwitchButton.js
import { Switch } from "@headlessui/react";
import { useEffect, useState } from "react";

export default function SwitchButtonDark({ onClick, check }) {
  const [enabled, setEnabled] = useState(
    localStorage.getItem("darkMode") == "true" ? true : false
  );
  useEffect(() => {
    var element = document.querySelector("body");
    if (enabled) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }, []);
  var element = document.querySelector("body");
  const handleChange = (target) => {};

  const handleToggle = () => {
    setEnabled(!enabled);
    // setEnabled(target.checked);
    console.log(enabled);
    
    if (!enabled) {
      localStorage.setItem("darkMode", true);
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("darkMode", false);
    }
    if (onClick) {
      onClick(!enabled);
    }
  };

  return (
    <Switch
      dir="ltr"
      style={{ direction: "ltr" }}
      checked={enabled}
      onChange={handleToggle}
      className={`${enabled ? "bg-green-500" : "bg-gray-500"}
        relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${enabled ? "translate-x-6" : "translate-x-0"}
          pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
}

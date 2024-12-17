import React, { useEffect, useState } from "react";
import Toggle from "react-toggle";
import { useMediaQuery } from "react-responsive";

export const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("darkMode") == "true" ? true : false
  );

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") || ""
  );

  useEffect(() => {
    var element = document.querySelector("body");
    if (isDark) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }, []);
  var element = document.querySelector("body");
  const handleChange = (target) => {
    setIsDark(target.checked);
    if (target.checked) {
      localStorage.setItem("darkMode", true);
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("darkMode", false);
    }
  };

  return (
    <Toggle
      checked={isDark}
      onChange={({ target }) => handleChange(target)}
      icons={{ checked: "🌙", unchecked: "🔆" }}
      aria-label="Dark mode toggle"
    />
  );
};

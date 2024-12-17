// SwitchButton.js
import { Switch } from "@headlessui/react";
import { useState } from "react";

export default function SwitchButton({ onClick, check }) {
  const [enabled, setEnabled] = useState(check);

  const handleToggle = () => {
    setEnabled(!enabled);
    if (onClick) {
      onClick(!enabled);
    }
  };

  return (
    <Switch
      dir="ltr"
      checked={enabled}
      onChange={handleToggle}
      style={{direction:"ltr"}}
      className={`${enabled ? "bg-green-500 green" : "bg-gray-500"}
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

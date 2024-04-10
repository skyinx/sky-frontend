import { Switch as HeadlessSwitch } from "@headlessui/react";
import React, { useState } from "react";

export const Switch = ({
  label = false,
  value = false,
  onChange = () => {},
}) => {
  const [enabled, setEnabled] = useState(value);
  return (
    <div className="flex flex-col space-y-1">
      {label ? (
        <label
          htmlFor="product"
          className="text-xs font-medium inline-block text-black"
        >
          {label}
        </label>
      ) : (
        ""
      )}
      <HeadlessSwitch
        checked={enabled}
        onChange={() => {
          onChange(!enabled);
          setEnabled(!enabled);
        }}
        className={`${enabled ? "bg-primary" : "bg-gray-700"}
          relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
      >
        <span className="sr-only">{label}</span>
        <span
          aria-hidden="true"
          className={`${
            enabled ? "translate-x-6 text-primary" : "translate-x-0"
          }
            pointer-events-none inline-flex text-[10px] items-center justify-center font-semibold h-[28px] w-[28px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        >
          {enabled ? "Yes" : "No"}
        </span>
      </HeadlessSwitch>
    </div>
  );
};

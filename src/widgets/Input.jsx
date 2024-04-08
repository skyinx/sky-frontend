import React from "react";
import { MdClose } from "react-icons/md";

const Input = ({
  type = "text",
  placeholder,
  label,
  error,
  className,
  value,
  mandatory,
  onChange = () => false,
  onKeyDown = () => false,
  onClear = () => false,
  defaultValue = "",
  disabled = false,
  clearable = false,
  maxLength = "",
  minLength = "",
  rest,
  ...other
}) => (
  <div className="relative text-left w-full">
    {label && (
      <label className="text-xs font-medium mb-2 inline-block text-black">
        {label} {mandatory ? <span className="text-red-600">*</span> : ""}
      </label>
    )}
    <div className="relative">
      <input
        placeholder={placeholder}
        className={`text-left bg-white focus:outline-none p-3 font-medium text-xs rounded-xl placeholder:text-gray-400 placeholder:font-normal w-full focus:border focus:border-primary text-black transition border border-gray-300 ${className} ${
          disabled && "bg-gray-50 text-gray-400 cursor-not-allowed"
        }`}
        maxLength={maxLength}
        minLength={minLength}
        disabled={disabled}
        type={type}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        {...rest}
        {...other}
      />
      {value && clearable ? (
        <span
          className="absolute text-gray-400 top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
          onClick={onClear}
        >
          <MdClose />
        </span>
      ) : (
        ""
      )}
    </div>

    {error && <p className="text-xs font-medium mt-1 text-red-600">{error}</p>}
  </div>
);

export default Input;

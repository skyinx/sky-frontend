import React from "react";
import AsyncSelect from "react-select/async";

const Dropdown = ({
  label = "",
  className,
  id,
  value,
  placeholder,
  defaultOptions,
  onChange,
  loadOptions,
  onInputChange = () => {},
  error,
  isClearable = false,
  mandatory,
  isMulti = false,
  isDisabled = false,
  rest,
  ...other
}) => {
  const customStyles = {
    control: (provided, { isFocused }) => ({
      ...provided,
      minHeight: "36px",
      height: isMulti ? "auto" : "42px",
      padding: "0px",
      borderRadius: "12px",
      border: isFocused
        ? "1px solid #BA0101 !important"
        : "1px solid #D1D5DA !important",
      boxShadow: "none",
    }),
    option: (provided, { isFocused }) => ({
      ...provided,
      fontSize: 12,
      fontWeight: 500,
      padding: "12px",
      borderRadius: "12px",
      background: isFocused ? "#BA0101" : "#FFFFFF",
      color: isFocused ? "#FFFFFF" : "#BA0101",
    }),
    noOptionsMessage: (base) => ({
      ...base,
      fontSize: 12,
      fontWeight: 500,
      color: "#000000",
    }),
    valueContainer: (provided, { isFocused }) => ({
      ...provided,
      fontSize: 12,
      paddingInline: "12px",
      fontWeight: isFocused ? 500 : 400,
      color: "#000000",
    }),
    menuList: (base) => ({
      ...base,
      padding: "0px",
      borderRadius: "12px",
      maxHeight: "250px",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "12px",
      zIndex: "9999",
    }),
    indicatorSeparator: (styles) => {
      return {
        ...styles,
        display: "none",
      };
    },
    indicatorsContainer: (provided) => ({
      ...provided,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "5px 8px",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      padding: "5px",
    }),
  };

  return (
    <div className={className}>
      {label?.length ? (
        <label className="text-xs mb-2 inline-block font-medium text-foreground">
          {label} {mandatory ? <span className="text-red">*</span> : ""}
        </label>
      ) : (
        ""
      )}
      <AsyncSelect
        styles={customStyles}
        isClearable={isClearable}
        id={id}
        placeholder={placeholder}
        value={value}
        onInputChange={onInputChange}
        onChange={onChange}
        loadOptions={loadOptions}
        isMulti={isMulti}
        defaultOptions={defaultOptions}
        isDisabled={isDisabled}
        {...rest}
        {...other}
      />
      {error && <p className="text-xs font-medium mt-1 text-red">{error}</p>}
    </div>
  );
};

export default Dropdown;

import { post } from "@/api";
import { getQuery } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";

const Dropdown = ({
  id,
  value,
  error,
  mandatory,
  className,
  filter = [],
  label = "",
  module = "",
  placeholder,
  action = "list",
  isMulti = false,
  isClearable = false,
  isDisabled = false,
  searchFields = ["name"],
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
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        textTransform: 'capitalize'
      };
    },
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
      color: "#BA0101 !important",
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

  const [defaultOptions, setDefaultOptions] = useState([]);

  const loadOptions = async (search = "", callback) => {
    const data = await post({
      module,
      action,
      data: {
        query: {
          ...getQuery(searchFields, search),
        },
        options: {
          limit: 5,
        },
      },
    }).then(({ data }) => {
      return data?.data?.map((r) => ({
        ...r,
        label: r.name,
        value: r._id,
      }));
    });
    callback?.(data);
  };

  const filterOption = (opt) => {
    return !filter.find(({ value }) => {
      return value === opt.value;
    });
  };

  useEffect(() => {
    loadOptions("", setDefaultOptions);
  }, []);

  return (
    <div className={className}>
      {label?.length ? (
        <label className="text-foreground mb-2 inline-block text-xs font-medium">
          {label} {mandatory ? <span className="text-red">*</span> : ""}
        </label>
      ) : (
        ""
      )}
      <AsyncSelect
        id={id}
        value={value}
        isMulti={isMulti}
        styles={customStyles}
        isDisabled={isDisabled}
        isClearable={isClearable}
        placeholder={placeholder}
        loadOptions={loadOptions}
        filterOption={filterOption}
        defaultOptions={defaultOptions}
        {...rest}
        {...other}
      />
      {error && <p className="text-red mt-1 text-xs font-medium">{error}</p>}
    </div>
  );
};

export default Dropdown;

import React, { useState } from "react";
import Input from "@/widgets/Input";
import useSearch from "@/hooks/common/useSearch";

export const Search = ({ title, search = "", setSearch = () => {} }) => {
  const [value, setValue] = useState(search);
  const { onSearch } = useSearch({
    setSearchValue: setSearch,
    setValue,
  });
  return (
    <Input
      clearable
      value={value}
      placeholder={`Search ${title}`}
      className="!w-64 !rounded-lg"
      onClear={() => setSearch("")}
      onChange={onSearch}
    />
  );
};

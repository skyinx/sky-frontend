import React from "react";
import { useDebouncedCallback } from "use-debounce";

const useSearch = ({ setSearchValue, setValue }) => {
  const onSearch = (event) => {
    const input = event.target.value;
    debounced(input), setValue(input);
  };
  const debounced = useDebouncedCallback((input) => {
    setSearchValue(input);
  }, 350);
  return { onSearch };
};

export default useSearch;

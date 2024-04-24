import { useState } from "react";
import { useDebouncedCallback } from "@mantine/hooks";
import { TextInput, CloseButton } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export default function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  const debouncedSetSearchValue = useDebouncedCallback((value) => {
    setDebouncedSearchValue(value);
    onSearch(value);
  }, 1000);

  const handleChange = (event) => {
    setSearchValue(event.currentTarget.value);
    debouncedSetSearchValue(event.currentTarget.value);
  };

  const handleClear = () => {
    setSearchValue("");
    setDebouncedSearchValue("");
    onSearch("");
  };

  return (
    <TextInput
      size="xs"
      leftSection={<IconSearch style={{ width: 16, height: 16 }} />}
      value={searchValue}
      onChange={handleChange}
      rightSection={
        <CloseButton
          aria-label="Clear input"
          onClick={handleClear}
          style={{ display: searchValue ? undefined : "none" }}
        />
      }
    />
  );
}

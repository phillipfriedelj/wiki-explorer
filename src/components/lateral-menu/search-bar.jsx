import { useState } from "react";
import { useDebouncedCallback } from "@mantine/hooks";
import {
  TextInput,
  CloseButton,
  ActionIcon,
  Transition,
  Group,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export default function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [open, setOpen] = useState(false);

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
        <CloseButton aria-label="Clear input" onClick={() => setOpen(false)} />
      }
    />
    // <Group gap={"xs"} wrap="nowrap">
    //   <ActionIcon
    //     variant="filled"
    //     aria-label="Search"
    //     onClick={() => setOpen(true)}
    //     radius={"sm"}
    //   >
    //     <IconSearch style={{ width: 15, height: 15 }} />
    //   </ActionIcon>
    //   <Transition
    //     mounted={open}
    //     transition="fade"
    //     duration={400}
    //     timingFunction="ease"
    //   >
    //     {(styles) => (
    //       <TextInput
    //         size="xs"
    //         leftSection={<IconSearch style={{ width: 16, height: 16 }} />}
    //         value={searchValue}
    //         onChange={handleChange}
    //         rightSection={
    //           <CloseButton
    //             aria-label="Clear input"
    //             onClick={() => setOpen(false)}
    //           />
    //         }
    //         style={{ ...styles }}
    //       />
    //     )}
    //   </Transition>
    // </Group>
  );
}

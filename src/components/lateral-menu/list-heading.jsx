import { Group, Title, Stack, ActionIcon } from "@mantine/core";
import SearchBar from "./search-bar";
import LetterSelect from "./letter_select";
import { IconSearch } from "@tabler/icons-react";
export default function ListHeading({
  selectedLetter,
  setSelectedLetter,
  handleSearch,
  setIsSearching,
}) {
  return (
    <Group wrap="nowrap" gap={"xs"} justify="space-between">
      {/* <Stack justify="flex-start" gap={"xs"}> */}
      <Title order={3} size="h5">
        Categories
      </Title>
      <ActionIcon onClick={() => setIsSearching(true)} size={"xs"}>
        <IconSearch style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
      {/* // <Group wrap="nowrap" gap={"xs"} justify="space-between">
      // <SearchBar onSearch={handleSearch} />
      // <LetterSelect
      //   selectedLetter={selectedLetter}
      //   setSelectedLetter={setSelectedLetter}
      // />
      // </Group> */}
    </Group>
  );
}

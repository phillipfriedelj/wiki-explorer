import { Group, Title, Stack } from "@mantine/core";
import SearchBar from "./search-bar";
import LetterSelect from "./letter_select";
export default function ListHeading({
  selectedLetter,
  setSelectedLetter,
  handleSearch,
}) {
  return (
    <Stack justify="flex-start" gap={"xs"}>
      <Title order={3} size="h5">
        Categories
      </Title>
      <Group wrap="nowrap" gap={"xs"} justify="space-between">
        <SearchBar onSearch={handleSearch} />
        <LetterSelect
          selectedLetter={selectedLetter}
          setSelectedLetter={setSelectedLetter}
        />
      </Group>
    </Stack>
  );
}

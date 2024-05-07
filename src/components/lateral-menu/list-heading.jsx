import { Group, Title } from "@mantine/core";
import SearchBar from "./search-bar";
import LetterSelect from "./letter_select";

export default function ListHeading({
  selectedLetter,
  setSelectedLetter,
  handleSearch,
}) {
  return (
    <Group justify="space-between" gap="md" wrap="nowrap">
      <Title order={3} size="h5">
        Categories
      </Title>
      <Group gap={"xs"} wrap="nowrap">
        <SearchBar onSearch={handleSearch} />
        <LetterSelect
          selectedLetter={selectedLetter}
          setSelectedLetter={setSelectedLetter}
        />
      </Group>
    </Group>
  );
}

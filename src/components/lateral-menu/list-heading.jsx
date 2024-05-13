import { Group, Title, ActionIcon, Stack } from "@mantine/core";
import SearchBar from "./search-bar";
import LetterSelect from "./letter_select";
import { IconArticle, IconCategory, IconSearch } from "@tabler/icons-react";
import { useState } from "react";

export default function ListHeading({
  selectedLetter,
  setSelectedLetter,
  handleSearch,
}) {
  const [searching, setSearching] = useState(false);
  return (
    <Stack>
      <Title order={3} size="h5">
        Categories
      </Title>
      {/* <Group justify="space-between" gap="md" wrap="nowrap">
      </Group> */}
      <Group wrap="nowrap" gap={"xs"} justify="space-between">
        <ActionIcon.Group>
          <ActionIcon variant="filled" aria-label="categories filter">
            <IconCategory
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon variant="filled" aria-label="pages filter">
            <IconArticle style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </ActionIcon.Group>
        <SearchBar onSearch={handleSearch} />
        <LetterSelect
          selectedLetter={selectedLetter}
          setSelectedLetter={setSelectedLetter}
        />
        {/* <Group gap={"xs"} wrap="nowrap">
          <ActionIcon
            variant="filled"
            aria-label="Settings"
            onClick={() => setSearching(!searching)}
          >
            <IconSearch style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>

        </Group> */}
      </Group>
    </Stack>
  );
}

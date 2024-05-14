import { Group, Title, ActionIcon } from "@mantine/core";
import LetterSelect from "../letter_select";
import { IconSearch } from "@tabler/icons-react";

export default function CategoryListHeading({
  selectedLetter,
  setSelectedLetter,
  setDisplayedMenu,
}) {
  return (
    <Group justify="space-between" gap="md" wrap="nowrap">
      <Title order={3} size="h5">
        Categories
      </Title>
      <Group wrap="nowrap" gap={"xs"} justify="space-between">
        <ActionIcon
          variant="filled"
          aria-label="pages filter"
          onClick={() => setDisplayedMenu("search")}
        >
          <IconSearch style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
        <LetterSelect
          selectedLetter={selectedLetter}
          setSelectedLetter={setSelectedLetter}
        />
      </Group>
    </Group>
  );
}

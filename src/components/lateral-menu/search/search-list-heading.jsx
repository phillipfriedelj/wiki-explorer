import { Group, Title, ActionIcon, Stack, CloseButton } from "@mantine/core";
import SearchBar from "../search-bar";
import { IconArticle, IconCategory } from "@tabler/icons-react";

export default function SearchListHeading({ handleSearch, setDisplayedMenu }) {
  return (
    <Stack>
      <Group wrap="nowrap" gap={"xs"} justify="space-between">
        <Title order={3} size="h5">
          Search
        </Title>
        <CloseButton onClick={() => setDisplayedMenu("category")} />
      </Group>
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
      </Group>
    </Stack>
  );
}

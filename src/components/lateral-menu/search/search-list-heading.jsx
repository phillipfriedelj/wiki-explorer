import { ActionIcon } from "@mantine/core";
import SearchBar from "../search-bar";
import { IconArticle, IconCategory } from "@tabler/icons-react";
import ListHeading from "../../../layout/list-heading";

export default function SearchListHeading({ handleSearch, setCollapsed }) {
  return (
    <ListHeading title={"Search"} onClose={setCollapsed}>
      <ActionIcon.Group>
        <ActionIcon variant="filled" aria-label="categories filter">
          <IconCategory style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon variant="filled" aria-label="pages filter">
          <IconArticle style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </ActionIcon.Group>
      <SearchBar onSearch={handleSearch} />
    </ListHeading>
  );
}

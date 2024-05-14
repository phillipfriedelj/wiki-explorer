import { ActionIcon } from "@mantine/core";
import SearchBar from "../search-bar";
import { IconArticle, IconCategory } from "@tabler/icons-react";
import ListHeading from "../../../layout/list-heading";

export default function SearchListHeading({ handleSearch, setCollapsed }) {
  return (
    <ListHeading title={"Search"} onClose={setCollapsed}>
      <SearchBar onSearch={handleSearch} />
    </ListHeading>
  );
}

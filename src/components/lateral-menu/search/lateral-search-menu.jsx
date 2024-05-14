import SearchListHeading from "./search-list-heading";
import {
  Stack,
  Group,
  Transition,
  ActionIcon,
  em,
  Divider,
} from "@mantine/core";
import ListPagination from "../list-pagination";
import { useEffect, useState } from "react";
import CategoryList from "@/components/lateral-menu/category-list";
import { IconCaretLeftRight } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

import {
  useFetchSearchResults,
  useFetchSearchResultsCount,
  usePrefetchSearchResults,
} from "../../../hooks/search-hooks";
export default function LateralSearchMenu({
  setSelectedLink,
  setDisplayedMenu,
  setCollapsed,
  collapsed,
}) {
  const entriesPerPage = 50;
  const [activePage, setActivePage] = useState(1);
  const [searchActivePage, setSearchActivePage] = useState(1);

  const [searchValue, setSearchValue] = useState("");

  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const { isLoadingSearchCount, searchCount } =
    useFetchSearchResultsCount(searchValue);
  const { isLoadingSearch, searchResults } = useFetchSearchResults(
    searchValue,
    searchActivePage,
    entriesPerPage
  );
  usePrefetchSearchResults(searchValue, activePage, entriesPerPage);

  useEffect(() => {
    var initialSet = false;
    if (isMobile && !initialSet) {
      initialSet = true;
      setCollapsed(true);
    }
  }, [isMobile]);

  function handleSearch(newSearchValue) {
    if (newSearchValue === "") {
      setSearchActivePage(1);
    }
    setSearchValue(newSearchValue);
  }

  return (
    <Group
      wrap="nowrap"
      h={"100%"}
      gap={"xs"}
      preventGrowOverflow
      styles={{
        root: {
          backgroundColor: "var(--mantine-color-body)",
        },
      }}
    >
      <ActionIcon
        onClick={() => setCollapsed(!collapsed)}
        size={"xs"}
        h={"100%"}
        className="place-self-start"
      >
        <IconCaretLeftRight style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
      <Transition
        mounted={!collapsed}
        transition="fade"
        duration={15}
        timingFunction="ease-in-out"
      >
        {(styles) => (
          <Stack h={"100%"} gap={"xs"} wrap="nowrap" style={styles}>
            <SearchListHeading
              setCollapsed={setCollapsed}
              handleSearch={handleSearch}
            />
            <Divider />
            <CategoryList
              data={searchResults}
              isLoading={isLoadingSearch}
              setSelectedLink={setSelectedLink}
            />
            {!isLoadingSearchCount && (
              <ListPagination
                pageTotal={searchCount / entriesPerPage}
                activePage={activePage}
                setActivePage={setActivePage}
              />
            )}
          </Stack>
        )}
      </Transition>
    </Group>
  );
}
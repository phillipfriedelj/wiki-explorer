import {
  Stack,
  Group,
  Transition,
  ActionIcon,
  em,
  Divider,
  Text,
} from "@mantine/core";
import CategoryPagination from "../components/lateral-menu/category_pagination";
import { useEffect, useState } from "react";
import CategoryList from "@/components/lateral-menu/category-list";
import ListHeading from "@/components/lateral-menu/list-heading";
import { IconCaretLeftRight } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

import {
  useFetchCategories,
  useFetchCategoryCount,
  usePrefetchCategories,
} from "../hooks/category-hooks";

import {
  useFetchSearchResults,
  useFetchSearchResultsCount,
  usePrefetchSearchResults,
} from "@/hooks/search-hooks";

export default function LateralMenu({ setSelectedLink }) {
  const entriesPerPage = 50;
  const [selectedLetter, setSelectedLetter] = useState("a");
  const [activePage, setActivePage] = useState(1);
  const [searchActivePage, setSearchActivePage] = useState(1);

  const [searchValue, setSearchValue] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const { isLoadingCount, categoryCount } =
    useFetchCategoryCount(selectedLetter);
  const { isLoading, data } = useFetchCategories(
    selectedLetter,
    activePage,
    entriesPerPage
  );
  usePrefetchCategories(activePage, selectedLetter, entriesPerPage);

  const { isLoadingSearchCount, searchCount } =
    useFetchSearchResultsCount(searchValue);
  const { isLoadingSearch, searchResults } = useFetchSearchResults(
    searchValue,
    searchActivePage,
    entriesPerPage
  );
  usePrefetchSearchResults(searchValue, activePage, entriesPerPage);

  // useEffect(() => {
  //   setActivePage(1);
  // }, [selectedLetter]);

  useEffect(() => {
    var initialSet = false;
    if (isMobile && !initialSet) {
      initialSet = true;
      setCollapsed(false);
    }
  }, [isMobile]);

  function displayResultsList() {
    if (searchValue && searchValue !== "") {
      console.log("SEARCHING");
      if (!isLoadingSearch && searchResults.length === 0) {
        return <Text>No matching results found...</Text>;
      } else {
        return (
          <CategoryList
            data={searchResults}
            isLoading={isLoadingSearch}
            setSelectedLink={setSelectedLink}
          />
        );
      }
    } else {
      console.log("NORMAL");
      return (
        <CategoryList
          data={data}
          isLoading={isLoading}
          setSelectedLink={setSelectedLink}
        />
      );
    }
  }

  function getPageNumber() {
    console.log("SR ------ ", searchResults);
    if (searchResults && searchResults.length > 0) {
      if (!isLoadingSearch && searchResults.length === 0) {
        return 0;
      } else {
        return searchCount / entriesPerPage;
      }
    } else {
      return categoryCount / entriesPerPage;
    }

    // else if (categoryCount && categoryCount > 0) {
    //   return categoryCount / entriesPerPage;
    // } else {
    //   return 0;
    // }
  }

  return (
    <Group wrap="nowrap" h={"100%"} gap={"xs"} preventGrowOverflow>
      <ActionIcon
        onClick={() => setCollapsed(!collapsed)}
        size={"input-xs"}
        className="justify-self-start self-start place-self-start"
      >
        <IconCaretLeftRight style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
      <Transition
        mounted={!collapsed}
        transition="fade"
        duration={150}
        timingFunction="ease-in-out"
      >
        {(styles) => (
          <Stack h={"100%"} gap={"xs"} wrap="nowrap" style={styles}>
            <ListHeading
              selectedLetter={selectedLetter}
              setSelectedLetter={setSelectedLetter}
              handleSearch={setSearchValue}
              setCollapsed={setCollapsed}
            />
            <Divider />
            {displayResultsList()}
            {!isLoadingCount && (
              <CategoryPagination
                pageTotal={getPageNumber()}
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

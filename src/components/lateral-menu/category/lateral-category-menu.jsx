import {
  Stack,
  Group,
  Transition,
  ActionIcon,
  em,
  Divider,
  Text,
} from "@mantine/core";
import CategoryPagination from "../category_pagination";
import { useEffect, useState } from "react";
import CategoryList from "@/components/lateral-menu/category-list";
import CategoryListHeading from "./category-list-heading";
import { IconCaretLeftRight } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

import {
  useFetchCategories,
  useFetchCategoryCount,
  usePrefetchCategories,
} from "../../../hooks/category-hooks";

import {
  useFetchSearchResults,
  useFetchSearchResultsCount,
  usePrefetchSearchResults,
} from "../../../hooks/search-hooks";

export default function LateralCategoryMenu({
  setSelectedLink,
  setDisplayedMenu,
  setCollapsed,
  collapsed,
}) {
  const entriesPerPage = 50;
  const [selectedLetter, setSelectedLetter] = useState("a");
  const [activePage, setActivePage] = useState(1);
  const [searchActivePage, setSearchActivePage] = useState(1);

  const [searchValue, setSearchValue] = useState("");

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

  useEffect(() => {
    var initialSet = false;
    if (isMobile && !initialSet) {
      initialSet = true;
      setCollapsed(true);
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

  function handleSearch(newSearchValue) {
    if (newSearchValue === "") {
      setSearchActivePage(1);
    }
    setSearchValue(newSearchValue);
  }

  function getPageNumber() {
    if (searchResults && searchResults.length > 0) {
      if (!isLoadingSearch && searchResults.length === 0) {
        return 0;
      } else {
        return searchCount / entriesPerPage;
      }
    } else {
      return categoryCount / entriesPerPage;
    }
  }

  function getActivePage() {
    if (searchResults && searchResults.length > 0) {
      if (!isLoadingSearch && searchResults.length === 0) {
        return activePage;
      } else {
        return searchActivePage;
      }
    } else {
      return activePage;
    }
  }

  function getActivePageSetter() {
    if (searchResults && searchResults.length > 0) {
      if (!isLoadingSearch && searchResults.length === 0) {
        return setActivePage;
      } else {
        return setSearchActivePage;
      }
    } else {
      return setActivePage;
    }
  }

  useEffect(() => {
    setActivePage(1);
  }, [selectedLetter]);

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
            <CategoryListHeading
              selectedLetter={selectedLetter}
              setSelectedLetter={setSelectedLetter}
              setDisplayedMenu={setDisplayedMenu}
            />
            <Divider />
            {displayResultsList()}
            {!isLoadingCount && (
              <CategoryPagination
                pageTotal={getPageNumber()}
                activePage={getActivePage()}
                setActivePage={getActivePageSetter()}
              />
            )}
          </Stack>
        )}
      </Transition>
    </Group>
  );
}

import SearchListHeading from "./search-list-heading";
import { em } from "@mantine/core";
import ListPagination from "../list-pagination";
import { useEffect, useState } from "react";
import CategoryList from "@/components/lateral-menu/category-list";
import { useMediaQuery } from "@mantine/hooks";

import LateralMenu from "@/layout/lateral-menu";

import {
  useFetchSearchResults,
  useFetchSearchResultsCount,
  usePrefetchSearchResults,
} from "../../../hooks/search-hooks";
export default function LateralSearchMenu({
  setSelectedLink,
  setCollapsed,
  setDisplayedMenu,
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

  function handleLateralIconClick(clickedIcon) {
    if (clickedIcon === "search") {
      setCollapsed(!collapsed);
      setDisplayedMenu("search");
    } else {
      setCollapsed(false);
      setDisplayedMenu("category");
    }
  }

  function handleLinkSet(newLink) {
    if (isMobile) {
      setCollapsed(true);
    }
    setSelectedLink(newLink);
  }

  return (
    <LateralMenu
      collapsed={collapsed}
      handleLateralIconClick={handleLateralIconClick}
    >
      <SearchListHeading
        setCollapsed={setCollapsed}
        handleSearch={handleSearch}
      />
      <CategoryList
        data={searchResults}
        isLoading={isLoadingSearch}
        setSelectedLink={handleLinkSet}
      />
      {!isLoadingSearchCount && (
        <ListPagination
          pageTotal={searchCount / entriesPerPage}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      )}
    </LateralMenu>
  );
}

import SearchListHeading from "./search-list-heading";
import ListPagination from "../list-pagination";
import { useState, useEffect } from "react";
import CategoryList from "@/components/lateral-menu/category-list";
import LateralMenu from "@/layout/lateral-menu";
import useLateralMenuStore from "@/hooks/lateral-menu-store";
import {
  useFetchSearchResults,
  useFetchSearchResultsCount,
  usePrefetchSearchResults,
} from "../../../hooks/search-hooks";

export default function LateralSearchMenu() {
  const { collapsed, setCollapsed, setDisplayedMenu } = useLateralMenuStore();

  const entriesPerPage = 50;
  const [activePage, setActivePage] = useState(1);

  const [searchValue, setSearchValue] = useState("");

  const { isLoadingSearchCount, searchCount } =
    useFetchSearchResultsCount(searchValue);
  const { isLoadingSearch, searchResults } = useFetchSearchResults(
    searchValue,
    activePage,
    entriesPerPage
  );
  usePrefetchSearchResults(searchValue, activePage, entriesPerPage);

  function handleSearch(newSearchValue) {
    if (newSearchValue === "") {
      setActivePage(1);
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

  useEffect(() => {
    console.log("NEW PAGE ", activePage);
  }, [activePage]);

  return (
    <LateralMenu
      collapsed={collapsed}
      handleLateralIconClick={handleLateralIconClick}
    >
      <SearchListHeading
        setCollapsed={setCollapsed}
        handleSearch={handleSearch}
      />
      <CategoryList data={searchResults} isLoading={isLoadingSearch} />
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

import { em } from "@mantine/core";
import ListPagination from "../list-pagination";
import { useEffect, useState } from "react";
import CategoryList from "@/components/lateral-menu/category-list";
import CategoryListHeading from "./category-list-heading";
import { useMediaQuery } from "@mantine/hooks";
import LateralMenu from "@/layout/lateral-menu";

import {
  useFetchCategories,
  useFetchCategoryCount,
  usePrefetchCategories,
} from "../../../hooks/category-hooks";

export default function LateralCategoryMenu({
  setSelectedLink,
  setDisplayedMenu,
  setCollapsed,
  collapsed,
}) {
  const entriesPerPage = 50;
  const [selectedLetter, setSelectedLetter] = useState("a");
  const [activePage, setActivePage] = useState(1);

  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const { isLoadingCount, categoryCount } =
    useFetchCategoryCount(selectedLetter);
  const { isLoading, data } = useFetchCategories(
    selectedLetter,
    activePage,
    entriesPerPage
  );
  usePrefetchCategories(activePage, selectedLetter, entriesPerPage);

  useEffect(() => {
    var initialSet = false;
    if (isMobile && !initialSet) {
      initialSet = true;
      setCollapsed(true);
    }
  }, [isMobile, setCollapsed]);

  useEffect(() => {
    setActivePage(1);
  }, [selectedLetter]);

  function handleLateralIconClick(clickedIcon) {
    if (clickedIcon === "category") {
      setCollapsed(!collapsed);
      setDisplayedMenu("category");
    } else {
      setCollapsed(false);
      setDisplayedMenu("search");
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
      <CategoryListHeading
        selectedLetter={selectedLetter}
        setSelectedLetter={setSelectedLetter}
        setDisplayedMenu={setDisplayedMenu}
        setCollapsed={setCollapsed}
      />
      <CategoryList
        data={data}
        isLoading={isLoading}
        setSelectedLink={handleLinkSet}
      />
      {!isLoadingCount && (
        <ListPagination
          pageTotal={categoryCount / entriesPerPage}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      )}
    </LateralMenu>
  );
}

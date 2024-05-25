import { em } from "@mantine/core";
import ListPagination from "../list-pagination";
import { useEffect, useState } from "react";
import CategoryList from "@/components/lateral-menu/category-list";
import CategoryListHeading from "./category-list-heading";
import LateralMenu from "@/layout/lateral-menu";
import useSelectedLetterStore from "@/hooks/selected-letter-store";
import {
  useFetchCategories,
  useFetchCategoryCount,
  usePrefetchCategories,
} from "../../../hooks/category-hooks";
import useLateralMenuStore from "@/hooks/lateral-menu-store";

export default function LateralCategoryMenu() {
  const { collapsed, setCollapsed, setDisplayedMenu } = useLateralMenuStore();

  const entriesPerPage = 50;
  const { selectedLetter } = useSelectedLetterStore();
  const [activePage, setActivePage] = useState(1);

  const { isLoadingCount, categoryCount } =
    useFetchCategoryCount(selectedLetter);
  const { isLoading, data } = useFetchCategories(
    selectedLetter,
    activePage,
    entriesPerPage
  );
  usePrefetchCategories(activePage, selectedLetter, entriesPerPage);

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

  return (
    <LateralMenu
      collapsed={collapsed}
      handleLateralIconClick={handleLateralIconClick}
    >
      <CategoryListHeading setCollapsed={setCollapsed} />
      <CategoryList data={data} isLoading={isLoading} />
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

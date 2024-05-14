import { useState } from "react";
import LateralCategoryMenu from "@/components/lateral-menu/category/lateral-category-menu";
import LateralSearchMenu from "@/components/lateral-menu/search/lateral-search-menu";

export default function LateralMenu({ setSelectedLink }) {
  const [displayedMenu, setDisplayedMenu] = useState("category");
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      {displayedMenu === "category" ? (
        <LateralCategoryMenu
          setSelectedLink={setSelectedLink}
          setDisplayedMenu={setDisplayedMenu}
          setCollapsed={setCollapsed}
          collapsed={collapsed}
        />
      ) : (
        <LateralSearchMenu
          setSelectedLink={setSelectedLink}
          setDisplayedMenu={setDisplayedMenu}
          setCollapsed={setCollapsed}
          collapsed={collapsed}
        />
      )}
    </>
  );
}

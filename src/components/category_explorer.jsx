"use client";

import { useState } from "react";
import PageLayout from "@/layout/page-layout";
import Iframe from "../components/iframe";
import LateralCategoryMenu from "./lateral-menu/category/lateral-category-menu";
import LateralSearchMenu from "./lateral-menu/search/lateral-search-menu";

export default function CategoryExplorer() {
  const [selectedLink, setSelectedLink] = useState("");
  const [displayedMenu, setDisplayedMenu] = useState("category");
  const [collapsed, setCollapsed] = useState(false);

  function getLateralMenu() {
    if (displayedMenu === "category") {
      return (
        <LateralCategoryMenu
          setSelectedLink={setSelectedLink}
          setDisplayedMenu={setDisplayedMenu}
          setCollapsed={setCollapsed}
          collapsed={collapsed}
        />
      );
    } else {
      return (
        <LateralSearchMenu
          setSelectedLink={setSelectedLink}
          setDisplayedMenu={setDisplayedMenu}
          setCollapsed={setCollapsed}
          collapsed={collapsed}
        />
      );
    }
  }

  return (
    <PageLayout
      lateralMenu={getLateralMenu()}
      mainContent={<Iframe selectedLink={selectedLink} />}
    />
  );
}

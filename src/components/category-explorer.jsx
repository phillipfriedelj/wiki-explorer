"use client";

import { useState } from "react";
import PageLayout from "@/layout/page-layout";
import Iframe from "./iframe";
import LateralCategoryMenu from "./lateral-menu/category/lateral-category-menu";
import LateralSearchMenu from "./lateral-menu/search/lateral-search-menu";
import useLateralMenuStore from "@/hooks/lateral-menu-store";

export default function CategoryExplorer() {
  const { displayedMenu } = useLateralMenuStore();

  function getLateralMenu() {
    if (displayedMenu === "category") {
      return <LateralCategoryMenu />;
    } else {
      return <LateralSearchMenu />;
    }
  }

  return <PageLayout lateralMenu={getLateralMenu()} mainContent={<Iframe />} />;
}

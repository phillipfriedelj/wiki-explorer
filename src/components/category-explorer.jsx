"use client";

import { useState } from "react";
import PageLayout from "@/layout/page-layout";
import Iframe from "./iframe";
import LateralCategoryMenu from "./lateral-menu/category/lateral-category-menu";
import LateralSearchMenu from "./lateral-menu/search/lateral-search-menu";
import useLateralMenuStore from "@/hooks/lateral-menu-store";
import IntroModal from "./intro-modal";

export default function CategoryExplorer() {
  const { displayedMenu } = useLateralMenuStore();

  function getLateralMenu() {
    if (displayedMenu === "category") {
      return <LateralCategoryMenu />;
    } else {
      return <LateralSearchMenu />;
    }
  }

  return (
    <>
      <IntroModal />
      <PageLayout lateralMenu={getLateralMenu()} mainContent={<Iframe />} />
    </>
  );
}

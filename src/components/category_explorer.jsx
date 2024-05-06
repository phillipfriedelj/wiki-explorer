"use client";

import { useState } from "react";
import { Flex } from "@mantine/core";
import PageLayout from "@/layout/page_layout";
import Iframe from "./iframe";
import LateralMenu from "@/layout/lateral-menu";

export default function CategoryExplorer() {
  const [selectedLink, setSelectedLink] = useState("");

  return (
    <PageLayout
      lateralMenu={<LateralMenu setSelectedLink={setSelectedLink} />}
      mainContent={<Iframe selectedLink={selectedLink} />}
    />
  );
}

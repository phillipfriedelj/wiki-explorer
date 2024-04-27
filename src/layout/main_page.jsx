"use client";
import PageLayout from "./page_layout";
import CategoryVisualizer from "@/sections/category_visualizer";
import FunctionTabs from "@/components/function_tabs";
import { useEffect, useState } from "react";
import Overview from "@/sections/overview";
import NodeGraph from "@/components/node-graph";

export default function MainPage() {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    console.log("RERENDER");
  }, []);

  function handleTabChange(newTab) {
    console.log("TAB CHANGE -- ", newTab);
    setActiveTab(newTab);
  }

  function getActiveTabContent() {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "explore-categories":
        return <CategoryVisualizer />;
    }
  }

  return (
    <PageLayout>
      <FunctionTabs activeTab={activeTab} setActiveTab={handleTabChange} />
      {getActiveTabContent()}
    </PageLayout>
  );
}

// subtitle={"Explore Wikipedia's categories"}

"use client";
import FunctionTabs from "@/components/function_tabs";
import PageLayout from "@/layout/page_layout";
import { useState, useEffect } from "react";
import Overview from "@/sections/overview";
import CategoryVisualizer from "@/sections/category_visualizer";

export default function Home() {
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
    <main className="flex flex-col flex-grow h-full min-h-screen">
      {/* <MainPage /> */}
      <PageLayout>
        <FunctionTabs activeTab={activeTab} setActiveTab={handleTabChange} />
        {getActiveTabContent()}
      </PageLayout>
    </main>
  );
}

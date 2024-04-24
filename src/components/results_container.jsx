"use client";
import { ScrollArea } from "@mantine/core";
import CategoryPagination from "./category_pagination";
import { useEffect, useState, useCallback } from "react";

export default function ResultsContainer({
  results,
  selectedLink,
  selectedLetter,
}) {
  const [pageTotal, setPageTotal] = useState(0);
  const [splitResults, setSplitResults] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [activeSplit, setActiveSplit] = useState(0);

  const entriesPerPage = 100;

  const getCategoryCount = useCallback(async () => {
    const response = await fetch(`/api/categories/count/${selectedLetter}`);
    if (response.status === 200) {
      const categoryCount = await response.json();
      setPageTotal(categoryCount / entriesPerPage);
    } else {
      console.log("500 STATUS ", response.status);
    }
  }, [selectedLetter, entriesPerPage]);

  function splitResultsPerPage() {
    console.log("RESULTS ", results);
    const split = [];
    for (let i = 0; i < results.length; i += entriesPerPage) {
      split.push(results.slice(i, i + entriesPerPage));
    }
    console.log("SPLIT -- ", split);
    setActiveSplit(split[activePage - 1]);
    setSplitResults(split);
  }

  useEffect(() => {
    splitResultsPerPage();
    getCategoryCount();
  }, [results, getCategoryCount]);

  useEffect(() => {
    setActivePage(1);
    setSplitResults([]);
  }, [selectedLetter]);

  useEffect(() => {
    setActiveSplit(splitResults[activePage - 1]);
  }, [activePage]);

  return (
    <>
      <div className="flex bg-gray-100 py-2 flex-1 overflow-y-auto w-full h-full max-h-screen">
        <div className="flex flex-grow">
          <div className="flex flex-col w-1/2 h-full">
            <ScrollArea w={"100%"} h={"100%"} offsetScrollbars>
              {activeSplit}
            </ScrollArea>
            <CategoryPagination
              pageTotal={pageTotal}
              activePage={activePage}
              setActivePage={setActivePage}
            />
          </div>
          <div className="w-1/2 flex-1">
            <iframe
              src={selectedLink ? selectedLink : "https://en.wikipedia.org"}
              height={"100%"}
              width={"100%"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

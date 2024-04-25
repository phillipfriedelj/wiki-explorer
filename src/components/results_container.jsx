"use client";
import { ScrollArea, LoadingOverlay } from "@mantine/core";
import CategoryPagination from "./category_pagination";
import { useEffect, useState, useCallback } from "react";

export default function ResultsContainer({
  results,
  selectedLink,
  selectedLetter,
  loading,
}) {
  const [pageTotal, setPageTotal] = useState(0);
  const [splitResults, setSplitResults] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [activeSplit, setActiveSplit] = useState([]);
  const [window, setWindow] = useState([]);
  const [boundingIds, setBoundingIds] = useState({});
  const entriesPerPage = 100;
  const windowSize = 5;

  const getCategoryCount = useCallback(async () => {
    const response = await fetch(`/api/categories/count/${selectedLetter}`);
    if (response.status === 200) {
      const categoryCount = await response.json();
      setPageTotal(Math.floor(categoryCount / entriesPerPage));
    } else {
      console.log("500 STATUS ", response.status);
    }
  }, [selectedLetter, entriesPerPage]);

  async function handlePageChange(newActivePage) {
    setActivePage(newActivePage);

    if (newActivePage <= window.start || newActivePage >= window.end) {
      var end;
      var start;

      if (newActivePage === 1) {
        start = 1;
      } else {
        start = newActivePage - Math.floor(windowSize / 2);
        start = start === 0 ? 1 - start : start;
      }

      if (newActivePage === pageTotal) {
        end = pageTotal;
        start = pageTotal - windowSize;
      } else {
        end = newActivePage + Math.floor(windowSize / 2);
        end = start + windowSize > end ? start + windowSize - 1 : end;
      }

      var newWindow = {
        start: start,
        end: end,
      };

      var newWindowPageSplits = [];
      var nextId;
      var direction;
      if (activePage - newActivePage < 0) {
        newWindowPageSplits = splitResults.slice(Math.floor(windowSize / 2));
        nextId = boundingIds.max;
        direction = "up";
      } else if (activePage - newActivePage > 0) {
        newWindowPageSplits = splitResults.slice(0, Math.floor(windowSize / 2));
        nextId = boundingIds.min;
        direction = "down";
      }

      const response = await fetch(
        `/api/categories/${selectedLetter}/${
          2 * entriesPerPage
        }/${direction}/${nextId}`
      );
      if (response.status === 200) {
        const newPages = await response.json();
        console.log("NEW PAGES -- ", newPages);
        //PARSE RESULTS TO COMPONENT
        //ADD TO NEW SPLIT
        //SET NEW SPLIT
      } else {
        console.log("500 STATUS ", response.status);
      }

      setWindow(newWindow);
    }
  }

  function getBoundingIds() {
    if (results && results.length > 0) {
      const min = results[0].props.category.id;
      const max = results[results.length - 1].props.category.id;

      setBoundingIds({ min: min, max: max });
    }
  }

  function splitResultsPerPage() {
    const split = [];
    for (let i = 0; i < results.length; i += entriesPerPage) {
      split.push(results.slice(i, i + entriesPerPage));
    }
    setActiveSplit(split[activePage - 1]);
    setSplitResults(split);
  }

  useEffect(() => {
    setWindow({ start: 1, end: windowSize });
    getBoundingIds();
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

  //TODO Add skeleton if no data
  return (
    <>
      <div className="flex py-2 flex-1 overflow-y-auto w-full h-full max-h-screen">
        <div className="flex flex-grow">
          <div className="flex flex-col w-1/2 h-full relative">
            <LoadingOverlay
              visible={loading}
              zIndex={1000}
              overlayProps={{ radius: "md", blur: 2 }}
            />
            <ScrollArea w={"100%"} h={"100%"} offsetScrollbars>
              {activeSplit}
            </ScrollArea>
            <CategoryPagination
              pageTotal={pageTotal}
              activePage={activePage}
              setActivePage={handlePageChange}
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

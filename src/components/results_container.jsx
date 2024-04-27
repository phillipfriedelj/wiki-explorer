"use client";
import { ScrollArea, LoadingOverlay } from "@mantine/core";
import CategoryPagination from "./category_pagination";
import { useEffect, useState, useCallback } from "react";
import CategoryCard from "./category_card";

export default function ResultsContainer({
  selectedLetter,
  setLoading,
  loading,
}) {
  const [pageTotal, setPageTotal] = useState(0);
  const [splitResults, setSplitResults] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [activeSplit, setActiveSplit] = useState([]);
  const [window, setWindow] = useState([]);
  const entriesPerPage = 100;
  const windowSize = 5;

  //RESULTS FETCHING
  const [selectedLink, setSelectedLink] = useState("");

  const fetchCategoriesAndArticles = useCallback(async () => {
    console.log("CALLED FCANDARTS");
    setLoading(true);
    const response = await fetch(
      `/api/categories?letter=${selectedLetter}&pageFrom=${1}&pageTo=${5}`
    );
    if (response.status === 200) {
      const data = await response.json();
      const parsedData = parseResults(data);

      setWindow({ start: 1, end: windowSize });
      const split = splitResultsPerPage(parsedData);

      setActiveSplit(split[activePage - 1]);
      setSplitResults(split);
      getCategoryCount();

      setLoading(false);
    } else {
      console.log("500 STATUS ", response.status);
    }
  }, [selectedLetter]);

  function parseResults(data) {
    const parsedResults = data.map((entry) => {
      return (
        <CategoryCard
          key={entry.title}
          category={entry}
          setSelectedLink={setSelectedLink}
        />
      );
    });
    return parsedResults;
  }

  //TODO Refactor

  const getCategoryCount = useCallback(async () => {
    const response = await fetch(`/api/categories/count/${selectedLetter}`);
    if (response.status === 200) {
      const categoryCount = await response.json();
      setPageTotal(Math.floor(categoryCount / entriesPerPage));
    } else {
      console.log("500 STATUS ", response.status);
    }
  }, [selectedLetter, entriesPerPage]);

  function calculateNewWindow(newActivePage) {
    var end;
    var start;

    if (newActivePage === 1) {
      start = 1;
      end = 5;
    } else {
      start = newActivePage - Math.floor(windowSize / 2);
      start = start === 0 ? 1 - start : start;
    }
    if (newActivePage === pageTotal) {
      end = pageTotal;
      start = pageTotal - (windowSize - 1);
    } else {
      end = newActivePage + Math.floor(windowSize / 2);
      end = start + windowSize > end ? start + windowSize - 1 : end;
    }
    var newWindow = {
      start: start,
      end: end,
    };

    return newWindow;
  }

  async function handlePageChange(newActivePage) {
    setActivePage(newActivePage);
    if (activePage === newActivePage) {
      return;
    } else if (newActivePage >= window.start && newActivePage <= window.end) {
      const slope = (5 - 1) / (window.end - window.start);
      const mappedPos = 1 + slope * (newActivePage - window.start);
      setActiveSplit(splitResults[mappedPos - 1]);
      return;
    }
    setLoading(true);
    const newWindow = calculateNewWindow(newActivePage);
    var direction = activePage - newActivePage < 0 ? "up" : "down";

    var keepSlices;
    var fetchFrom;
    var fetchTo;
    if (direction === "up") {
      var commonPages = newWindow.start - window.end;
      if (commonPages <= 0) {
        keepSlices = splitResults.slice(commonPages - 1);
        commonPages = Math.abs(commonPages) + 1;
        fetchFrom = newWindow.start + commonPages;
        fetchTo = newWindow.end;
      } else {
        fetchFrom = newWindow.start;
        fetchTo = newWindow.end;
      }
    } else if (direction === "down") {
      var commonPages = newWindow.end - window.start;
      if (commonPages >= 0) {
        keepSlices = splitResults.slice(0, commonPages + 1);
        fetchFrom = newWindow.start;
        fetchTo = newWindow.end - (commonPages - 1);
      } else {
        fetchFrom = newWindow.start;
        fetchTo = newWindow.end;
      }
    }

    const response = await fetch(
      `/api/categories?letter=${selectedLetter}&pageFrom=${fetchFrom}&pageTo=${fetchTo}`
    );

    if (response.status === 200) {
      const newPages = await response.json();
      console.log("NEW WINDOW :: ", newWindow);
      console.log("NEW PAGES :: ", newPages);
      const parsedResults = parseResults(newPages);
      const split = splitResultsPerPage(parsedResults);

      var newWindowPageSplits = keepSlices || [];
      if (direction === "up") {
        newWindowPageSplits = [...newWindowPageSplits, ...split];
      } else if (direction === "down") {
        newWindowPageSplits = [...split, ...newWindowPageSplits];
      }

      const slope = (5 - 1) / (newWindow.end - newWindow.start);
      const mappedPos = 1 + slope * (newActivePage - newWindow.start);
      setActiveSplit(newWindowPageSplits[mappedPos - 1]);
      setSplitResults(newWindowPageSplits);
      setLoading(false);
    } else if (response.status === 500) {
      console.log("500 STATUS ", response.status);
    }

    setWindow(newWindow);
  }

  function splitResultsPerPage(data) {
    const split = [];
    for (let i = 0; i < data.length; i += entriesPerPage) {
      split.push(data.slice(i, i + entriesPerPage));
    }

    return split;
  }

  useEffect(() => {
    fetchCategoriesAndArticles("a");
  }, []);

  useEffect(() => {
    fetchCategoriesAndArticles();
    setActivePage(1);
    setSplitResults([]);
  }, [selectedLetter]);

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

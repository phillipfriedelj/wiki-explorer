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
  const [boundingIds, setBoundingIds] = useState({});
  const entriesPerPage = 100;
  const windowSize = 5;

  //RESULTS FETCHING
  const [results, setResults] = useState([]);
  const [selectedLink, setSelectedLink] = useState("");

  const fetchCategoriesAndArticles = useCallback(async () => {
    setLoading(true);
    const response = await fetch(`/api/categories/${selectedLetter}`);
    if (response.status === 200) {
      const data = await response.json();
      const parsedData = parseResults(data);

      setResults(parsedData);
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

  //RESULTS FETCHING

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
        const parsedResults = parseResults(newPages);
        const split = splitResultsPerPage(parsedResults);
        console.log("SPLIT R :: ", splitResults);
        console.log("SPLIT NEW --- ", split);
        //ADD TO NEW SPLIT
        if (direction === "up") {
          newWindowPageSplits = [...newWindowPageSplits, ...split];
        } else if (direction === "down") {
          newWindowPageSplits = [...split, ...newWindowPageSplits];
        }
        const boundIds = getBoundingIds(newWindowPageSplits);
        setBoundingIds(boundIds);
        console.log("### BOUND IDS NEW ", boundIds);
        //SET NEW SPLIT
        console.log("NEW SPLIT FINAL -- ", newWindowPageSplits);
        setSplitResults(newWindowPageSplits);
      } else {
        console.log("500 STATUS ", response.status);
      }

      setWindow(newWindow);
    }
  }

  function getBoundingIds(dataRange) {
    if (dataRange && dataRange.length > 0) {
      const min = dataRange[0][0].props.category.id;

      const lastArr = dataRange[dataRange.length - 1];
      const lastEntry = lastArr[lastArr.length - 1];
      const max = lastEntry.props.category.id;
      console.log("MIN -- ", min, " -- MAX -- ", max);
      return { min: min, max: max };
    }
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
  }, [selectedLetter]);

  useEffect(() => {
    setWindow({ start: 1, end: windowSize });
    const split = splitResultsPerPage(results);
    const boundingIds = getBoundingIds(split);
    setBoundingIds(boundingIds);
    console.log("START SPLIT -- ", split);
    setActiveSplit(split[activePage - 1]);
    setSplitResults(split);
    getCategoryCount();
  }, [results, getCategoryCount]);

  useEffect(() => {
    setActivePage(1);
    setSplitResults([]);
  }, [selectedLetter]);

  useEffect(() => {
    // const slope = (window.end - window.start) / (5 - 1);
    // const output = window.start + slope * (activePage - 1);
    const slope = (5 - 1) / (window.end - window.start);
    const mappedPos = 1 + slope * (activePage - window.start);

    // console.log("POS IN WINDOW: ", output);

    setActiveSplit(splitResults[mappedPos - 1]);
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

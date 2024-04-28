"use client";
import { ScrollArea, LoadingOverlay } from "@mantine/core";
import CategoryPagination from "./category_pagination";
import { useEffect, useState, useCallback } from "react";
import CategoryCard from "./category_card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCategoriesByLetterAndPage,
  getCategoryCount,
} from "@/queries/get-categories";

export async function getStaticProps() {
  const categories = await getCategoriesByLetterAndPage("a", 1, 5);
  // const categoryCount = await getCategoryCount("a");
  return { categories };
}

export default function ResultsContainer({ selectedLetter, categories }) {
  const [activePage, setActivePage] = useState(1);
  const [pageTotal, setPageTotal] = useState(0);
  const entriesPerPage = 100;

  const queryClient = useQueryClient();

  //RESULTS FETCHING
  const [selectedLink, setSelectedLink] = useState("");
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["categories", selectedLetter, activePage],
    queryFn: () =>
      getCategoriesByLetterAndPage(selectedLetter, activePage, activePage),
    initialData: categories,
    staleTime: 0,
    keepPreviousData: true,
  });

  const {
    isLoadingCount,
    isErrorCount,
    data: categoryCountData,
  } = useQuery({
    queryKey: ["categoryCount", selectedLetter],
    queryFn: () => getCategoryCount(selectedLetter),
    staleTime: 0,
  });

  function fetchCategoriesAndArticles() {
    console.log("DATA ", data);
    if (!isError && !isLoading && data.length > 0) {
      const parsedData = parseResults(data);

      return parsedData;
    } else {
      console.log("500 STATUS ", error);
      return <p>Error loading data...</p>;
    }
  }

  useEffect(() => {
    if (!isLoadingCount && !isErrorCount && categoryCountData) {
      setPageTotal(categoryCountData / entriesPerPage);
    }
  }, [isLoadingCount, isErrorCount, categoryCountData]);

  useEffect(() => {
    const nextPage = activePage + 1;
    queryClient.prefetchQuery({
      queryKey: ["categories", selectedLetter, nextPage],
      queryFn: () =>
        getCategoriesByLetterAndPage(selectedLetter, nextPage, nextPage),
    });
  }, [activePage, queryClient]);

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

  async function handlePageChange(newActivePage) {
    setActivePage(newActivePage);
  }

  //TODO Add skeleton if no data
  return (
    <>
      <div className="flex py-2 flex-1 overflow-y-auto w-full h-full max-h-screen">
        <div className="flex flex-grow">
          <div className="flex flex-col w-1/2 h-full relative">
            <LoadingOverlay
              visible={isLoading}
              zIndex={1000}
              overlayProps={{ radius: "md", blur: 2 }}
            />
            <ScrollArea w={"100%"} h={"100%"} offsetScrollbars>
              {!isLoading && data && fetchCategoriesAndArticles()}
            </ScrollArea>
            {!isLoadingCount && !isErrorCount && pageTotal > 0 && (
              <CategoryPagination
                pageTotal={pageTotal}
                activePage={activePage}
                setActivePage={handlePageChange}
              />
            )}
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

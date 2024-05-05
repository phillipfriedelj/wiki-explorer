"use client";
import {
  ScrollArea,
  LoadingOverlay,
  Flex,
  Button,
  Group,
  Stack,
  Title,
} from "@mantine/core";
import CategoryPagination from "./category_pagination";
import { useEffect, useState } from "react";
import CategoryCard from "./category_card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCategoriesByLetterAndPage,
  getCategoryCount,
} from "@/queries/get-categories";
import Iframe from "./iframe";

export async function getStaticProps() {
  const categories = await getCategoriesByLetterAndPage("a", 1, 50);
  // const categoryCount = await getCategoryCount("a");
  return { categories };
}

export default function ResultsContainer({ selectedLetter, categories }) {
  const [activePage, setActivePage] = useState(1);
  const [pageTotal, setPageTotal] = useState(0);
  const entriesPerPage = 50;

  const queryClient = useQueryClient();

  const [selectedLink, setSelectedLink] = useState("");
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["categories", selectedLetter, activePage],
    queryFn: () =>
      getCategoriesByLetterAndPage(selectedLetter, activePage, entriesPerPage),
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
    if (!isError && !isLoading && data.length > 0) {
      return data.map((entry) => {
        return (
          <CategoryCard
            key={entry.title}
            category={entry}
            setSelectedLink={setSelectedLink}
          />
        );
      });
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
        getCategoriesByLetterAndPage(selectedLetter, nextPage, entriesPerPage),
    });
  }, [activePage, queryClient, selectedLetter]);

  useEffect(() => {
    setActivePage(1);
  }, [selectedLetter]);

  //TODO Add skeleton if no data
  return (
    <>
      <Flex
        w={"100%"}
        h={"100%"}
        mah={"100vh"}
        className="flex-1 overflow-y-auto"
      >
        <Flex className="flex-grow" py={"10px"}>
          <Stack w={"40%"} h={"100%"} className="relative" gap={"xs"}>
            <Title order={3} size="h5" px={"8px"}>
              Categories
            </Title>
            <LoadingOverlay
              visible={isLoading}
              zIndex={1000}
              overlayProps={{ radius: "md", blur: 2 }}
            />
            <ScrollArea w={"100%"} h={"100%"} offsetScrollbars scrollbars="y">
              {!isLoading && fetchCategoriesAndArticles()}
            </ScrollArea>
            {!isLoadingCount && (
              <CategoryPagination
                pageTotal={pageTotal}
                activePage={activePage}
                setActivePage={setActivePage}
              />
            )}
          </Stack>
          <Iframe selectedLink={selectedLink} />
        </Flex>
      </Flex>
    </>
  );
}

"use client";
import {
  ScrollArea,
  LoadingOverlay,
  Flex,
  Group,
  Stack,
  Title,
  Skeleton,
  Box,
} from "@mantine/core";
import CategoryPagination from "./category_pagination";
import { useEffect, useState } from "react";
import CategoryCard from "./category_card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LetterButtons from "./letter_buttons";
import {
  getCategoriesByLetterAndPage,
  getCategoryCount,
} from "@/queries/get-categories";
import Iframe from "./iframe";
import SearchBar from "./search_bar";

export async function getStaticProps() {
  const categories = await getCategoriesByLetterAndPage("a", 1, 50);
  // const categoryCount = await getCategoryCount("a");
  return { categories };
}

export default function ResultsContainer({ categories }) {
  const [activePage, setActivePage] = useState(1);
  const [pageTotal, setPageTotal] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState("a");
  const [searchResults, setSearchResults] = useState([]);
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

  async function handleSearch(searchValue) {
    const response = await fetch(`/api/search/${searchValue}`);
    if (response.status === 200) {
      const data = await response.json();
      console.log("SEARCH FOR ", data);
    } else {
      console.log("500 STATUS ", response.status);
    }
  }

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

  function generateSkeleton() {
    return (
      <Box w={"100%"} className="p-2">
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              color="blue"
              my={"5px"}
              key={index}
              h={"30px"}
              animate={false}
            />
          ))}
      </Box>
    );
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
            <Group justify="space-between" gap="md" wrap="nowrap" px={"8px"}>
              <Title order={3} size="h5" px={"8px"}>
                Categories
              </Title>
              <Group gap={"xs"}>
                <SearchBar onSearch={handleSearch} />
                <LetterButtons
                  selectedLetter={selectedLetter}
                  setSelectedLetter={setSelectedLetter}
                />
              </Group>
            </Group>
            <ScrollArea w={"100%"} h={"100%"} offsetScrollbars scrollbars="y">
              <LoadingOverlay
                visible={isLoading}
                zIndex={1000}
                overlayProps={{ radius: "md", blur: 2 }}
              />
              {isLoading ? generateSkeleton() : fetchCategoriesAndArticles()}
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

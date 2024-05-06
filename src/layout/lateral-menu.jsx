import {
  ScrollArea,
  LoadingOverlay,
  Group,
  Stack,
  Title,
  Skeleton,
  Box,
} from "@mantine/core";
import CategoryPagination from "../components/category_pagination";
import { useEffect, useState } from "react";
import CategoryCard from "../components/category_card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LetterSelect from "../components/letter_select";
import {
  getCategoriesByLetterAndPage,
  getCategoryCount,
} from "@/queries/get-categories";
import SearchBar from "../components/search_bar";

export default function LateralMenu({ setSelectedLink }) {
  const [selectedLetter, setSelectedLetter] = useState("a");
  const [activePage, setActivePage] = useState(1);
  const [pageTotal, setPageTotal] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const entriesPerPage = 50;

  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["categories", selectedLetter, activePage],
    queryFn: () =>
      getCategoriesByLetterAndPage(selectedLetter, activePage, entriesPerPage),
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

  function generateCategoryList() {
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
      <Box miw={"265px"} w={"265px"} className="p-2">
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

  return (
    <Stack h={"100%"} gap={"xs"} wrap="nowrap">
      <Group justify="space-between" gap="md" wrap="nowrap">
        <Title order={3} size="h5">
          Categories
        </Title>
        <Group gap={"xs"} wrap="nowrap">
          <SearchBar onSearch={handleSearch} />
          <LetterSelect
            selectedLetter={selectedLetter}
            setSelectedLetter={setSelectedLetter}
          />
        </Group>
      </Group>
      <ScrollArea offsetScrollbars scrollbars="y" className="flex">
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "md", blur: 2 }}
        />
        {isLoading ? generateSkeleton() : generateCategoryList()}
      </ScrollArea>
      {!isLoadingCount && (
        <CategoryPagination
          pageTotal={pageTotal}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      )}
    </Stack>
  );
}

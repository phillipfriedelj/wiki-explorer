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

export function CategoryList({ selectedLetter, setSelectedLink }) {
  const [activePage, setActivePage] = useState(1);
  const [pageTotal, setPageTotal] = useState(0);
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
  }, [activePage, queryClient]);

  useEffect(() => {
    setActivePage(1);
  }, selectedLetter);
  //CATEGORY FETCHING AND DISPLAY

  return (
    <Stack w={"100%"} h={"100%"} className="relative" gap={"xs"}>
      <Title order={3} size="h4" px={"8px"}>
        Categories
      </Title>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "md", blur: 2 }}
      />
      <ScrollArea
        bg={"red"}
        w={"100%"}
        h={"100%"}
        offsetScrollbars
        type="always"
        scrollbars="y"
      >
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
  );
}

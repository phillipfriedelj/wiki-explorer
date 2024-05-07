import { Stack } from "@mantine/core";
import CategoryPagination from "../components/lateral-menu/category_pagination";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCategoriesByLetterAndPage,
  getCategoryCount,
} from "@/queries/get-categories";
import { getSearchResults } from "@/queries/get-search-results";
import CategoryList from "@/components/lateral-menu/category-list";
import ListHeading from "@/components/lateral-menu/list-heading";

export default function LateralMenu({ setSelectedLink }) {
  const entriesPerPage = 50;
  const [selectedLetter, setSelectedLetter] = useState("a");
  const [activePage, setActivePage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["categories", selectedLetter, activePage],
    queryFn: () =>
      getCategoriesByLetterAndPage(selectedLetter, activePage, entriesPerPage),
    staleTime: 0,
    keepPreviousData: true,
  });

  const { isLoading: isLoadingCount, data: categoryCount } = useQuery({
    queryKey: ["categoryCount", selectedLetter],
    queryFn: () => getCategoryCount(selectedLetter),
    staleTime: 0,
  });

  const { isFetching: isFetchingSearchResults, data: searchResults } = useQuery(
    {
      queryKey: ["search", searchValue],
      queryFn: () => getSearchResults(),
      staleTime: 0,
      keepPreviousData: true,
    }
  );

  async function handleSearch(searchValue) {
    console.log("SV :: ", searchValue);
    // setSearchValue(searchValue);

    //   const searchResults = await getSearchResults(searchValue);
    //   console.log("SR :: ", searchResults);
  }

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
      <ListHeading
        selectedLetter={selectedLetter}
        setSelectedLetter={setSelectedLetter}
        handleSearch={handleSearch}
      />
      <CategoryList
        data={data}
        isLoading={isLoading}
        setSelectedLink={setSelectedLink}
      />
      {!isLoadingCount && (
        <CategoryPagination
          pageTotal={categoryCount / entriesPerPage}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      )}
    </Stack>
  );
}

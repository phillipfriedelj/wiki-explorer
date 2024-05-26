import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSearchResults,
  getSearchResultsCount,
} from "@/queries/get-search-results";
import { useEffect } from "react";

function useFetchSearchResultsCount(searchValue) {
  const { isLoading: isLoadingSearchCount, data: searchCount } = useQuery({
    queryKey: ["search", searchValue],
    queryFn: () => getSearchResultsCount(searchValue),
    staleTime: 0,
  });

  return { isLoadingSearchCount, searchCount };
}

function useFetchSearchResults(searchValue, activePage, entriesPerPage) {
  const { isLoading: isLoadingSearch, data: searchResults } = useQuery({
    queryKey: ["search", searchValue, activePage],
    queryFn: () => getSearchResults(searchValue, activePage, entriesPerPage),
    enabled: Boolean(searchValue),
  });

  return { isLoadingSearch, searchResults };
}

function usePrefetchSearchResults(searchValue, activePage, entriesPerPage) {
  const queryClient = useQueryClient();
  useEffect(() => {
    const nextPage = activePage + 1;
    queryClient.prefetchQuery({
      queryKey: ["search", searchValue, nextPage],
      queryFn: () => getSearchResults(searchValue, nextPage, entriesPerPage),
    });
  }, [activePage, queryClient, searchValue, entriesPerPage]);
}

export {
  useFetchSearchResults,
  usePrefetchSearchResults,
  useFetchSearchResultsCount,
};

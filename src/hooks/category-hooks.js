import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCategoryCount,
  getCategoriesByLetterAndPage,
} from "@/queries/get-categories";

function useFetchCategoryCount(selectedLetter) {
  const { isLoading: isLoadingCount, data: categoryCount } = useQuery({
    queryKey: ["categoryCount", selectedLetter],
    queryFn: () => getCategoryCount(selectedLetter),
    staleTime: 0,
  });

  return { isLoadingCount, categoryCount };
}

function useFetchCategories(selectedLetter, activePage, entriesPerPage) {
  const { isLoading, data } = useQuery({
    queryKey: ["categories", selectedLetter, activePage],
    queryFn: () =>
      getCategoriesByLetterAndPage(selectedLetter, activePage, entriesPerPage),
    staleTime: 0,
    keepPreviousData: true,
  });

  return { isLoading, data };
}

function usePrefetchCategories(activePage, selectedLetter, entriesPerPage) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const nextPage = activePage + 1;
    queryClient.prefetchQuery({
      queryKey: ["categories", selectedLetter, nextPage],
      queryFn: () =>
        getCategoriesByLetterAndPage(selectedLetter, nextPage, entriesPerPage),
    });
  }, [activePage, queryClient, selectedLetter, entriesPerPage]);
}

export { useFetchCategories, useFetchCategoryCount, usePrefetchCategories };

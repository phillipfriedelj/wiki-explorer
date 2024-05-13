import {
  Stack,
  Group,
  Transition,
  ActionIcon,
  em,
  Divider,
  Text,
} from "@mantine/core";
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
import { IconCaretLeftRight } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

export default function LateralMenu({ setSelectedLink }) {
  const entriesPerPage = 50;
  const [selectedLetter, setSelectedLetter] = useState("a");
  const [activePage, setActivePage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const queryClient = useQueryClient();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const { isLoading, data } = useQuery({
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

  const { isLoading: isLoadingSearch, data: searchResults } = useQuery({
    queryKey: ["search", searchValue],
    queryFn: () => getSearchResults(searchValue),
  });

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

  useEffect(() => {
    var initialSet = false;
    if (isMobile && !initialSet) {
      initialSet = true;
      setCollapsed(false);
    }
  }, [isMobile]);

  useEffect(() => {
    console.log("SR :: ", searchResults);
  }, [searchResults]);

  function displayResultsList() {
    if (searchValue && searchValue !== "") {
      console.log("SEARCHING");
      if (!isLoadingSearch && searchResults.length === 0) {
        return <Text>No matching results found...</Text>;
      } else {
        return (
          <CategoryList
            data={searchResults}
            isLoading={isLoadingSearch}
            setSelectedLink={setSelectedLink}
          />
        );
      }
    } else {
      console.log("NORMAL");
      return (
        <CategoryList
          data={data}
          isLoading={isLoading}
          setSelectedLink={setSelectedLink}
        />
      );
    }
  }

  function getPageNumber() {
    console.log("SR ------ ", searchResults);
    if (searchResults && searchResults.length > 0) {
      if (!isLoadingSearch && searchResults.length === 0) {
        return 0;
      } else {
        return searchResults.length / entriesPerPage;
      }
    } else {
      return categoryCount / entriesPerPage;
    }

    // else if (categoryCount && categoryCount > 0) {
    //   return categoryCount / entriesPerPage;
    // } else {
    //   return 0;
    // }
  }

  return (
    <Group wrap="nowrap" h={"100%"} gap={"xs"} preventGrowOverflow>
      <ActionIcon
        onClick={() => setCollapsed(!collapsed)}
        size={"input-xs"}
        className="justify-self-start self-start place-self-start"
      >
        <IconCaretLeftRight style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
      <Transition
        mounted={!collapsed}
        transition="fade"
        duration={150}
        timingFunction="ease-in-out"
      >
        {(styles) => (
          <Stack h={"100%"} gap={"xs"} wrap="nowrap" style={styles}>
            <ListHeading
              selectedLetter={selectedLetter}
              setSelectedLetter={setSelectedLetter}
              handleSearch={setSearchValue}
              setCollapsed={setCollapsed}
            />
            <Divider />
            {displayResultsList()}
            {!isLoadingCount && (
              <CategoryPagination
                pageTotal={getPageNumber()}
                activePage={activePage}
                setActivePage={setActivePage}
              />
            )}
          </Stack>
        )}
      </Transition>
    </Group>
  );
}

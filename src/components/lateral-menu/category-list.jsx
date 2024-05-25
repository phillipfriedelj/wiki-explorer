import CategoryCard from "./category-card";
import { Box, Skeleton, ScrollArea, LoadingOverlay, Text } from "@mantine/core";
import ListSkeleton from "./list-skeleton";

export default function CategoryList({ data, isLoading }) {
  function getDisplayedListContent() {
    if (!isLoading && (!data || data.length === 0)) {
      return (
        <>
          <Text miw={"300px"} w={"300px"} h={"100%"}>
            No results found...
          </Text>
        </>
      );
    } else if (isLoading) {
      return (
        <>
          <LoadingOverlay
            visible={isLoading}
            zIndex={1000}
            overlayProps={{ radius: "md", blur: 2 }}
          />
          <ListSkeleton />
        </>
      );
    } else {
      return generateCategoryList();
    }
  }

  function generateCategoryList() {
    return data.map((entry) => (
      <CategoryCard key={entry.title} category={entry} />
    ));
  }

  function compare_title(a, b) {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  }

  return (
    <ScrollArea offsetScrollbars scrollbars="y" className="flex">
      {getDisplayedListContent()}
    </ScrollArea>
  );
}

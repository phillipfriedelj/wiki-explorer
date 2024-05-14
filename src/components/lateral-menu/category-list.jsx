import CategoryCard from "./category_card";
import { Box, Skeleton, ScrollArea, LoadingOverlay, Text } from "@mantine/core";

export default function CategoryList({ data, isLoading, setSelectedLink }) {
  function generateCategoryList() {
    return data.map((entry) => (
      <CategoryCard
        key={entry.title}
        category={entry}
        setSelectedLink={setSelectedLink}
      />
    ));
  }

  function generateSkeleton() {
    return (
      <Box miw={"300px"} w={"300px"} className="p-2">
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

  function getDisplayedListContent() {
    if (!isLoading && (!data || data.length === 0)) {
      return (
        <>
          <Text h={"100%"}>No results found...</Text>
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
          {generateSkeleton()}
        </>
      );
    } else {
      return generateCategoryList();
    }
  }

  return (
    <ScrollArea offsetScrollbars scrollbars="y" className="flex">
      {getDisplayedListContent()}
    </ScrollArea>
  );
}

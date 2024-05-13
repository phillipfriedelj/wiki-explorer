import CategoryCard from "./category_card";
import { Box, Skeleton, ScrollArea, LoadingOverlay } from "@mantine/core";

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

  return (
    <ScrollArea offsetScrollbars scrollbars="y" className="flex">
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "md", blur: 2 }}
      />
      {isLoading ? generateSkeleton() : generateCategoryList()}
    </ScrollArea>
  );
}

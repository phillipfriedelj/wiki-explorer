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

  //   function     () {
  //     if (isFetchingSearchResults && searchResults) {
  //       return searchResults.map((entry) => {
  //         return (
  //           <CategoryCard
  //             key={entry.title}
  //             category={entry}
  //             setSelectedLink={setSelectedLink}
  //           />
  //         );
  //       });
  //     } else if (!isError && !isLoading && data.length > 0) {
  //       return data.map((entry) => {
  //         return (
  //           <CategoryCard
  //             key={entry.title}
  //             category={entry}
  //             setSelectedLink={setSelectedLink}
  //           />
  //         );
  //       });
  //     } else {
  //       console.log("500 STATUS ", error);
  //       return <p>Error loading data...</p>;
  //     }
  //   }

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

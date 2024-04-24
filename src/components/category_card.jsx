import { Group, Box, Button, Collapse, ScrollArea, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function CategoryCard({ category, setSelectedLink }) {
  const [opened, { toggle }] = useDisclosure(false);

  function parseArticles(articles) {
    var sorted = articles?.sort((entry) => entry.articles.first_letter);
    return sorted.map((entry) => {
      return (
        <button
          onClick={() => handleArticleClick(entry.articles.title)}
          className="text-xs bg-gray-300 rounded-md mr-10 pl-2 py-1 text-left hover:bg-gray-200"
        >
          {entry.articles.title}
        </button>
      );
    });
  }

  function handleArticleClick(clickedArticle) {
    console.log("CLICKED :: ", clickedArticle);
    setSelectedLink(`https://en.wikipedia.org/wiki/${clickedArticle}`);
  }

  return (
    <Box w={"100%"} className="p-2">
      <Group
        justify="space-between"
        wrap="nowrap"
        className={`bg-gray-400 rounded-t-sm transition-all cursor-pointer ${
          opened ? "" : "rounded-b-sm"
        }`}
        onClick={toggle}
      >
        <button
          className="text-xs text-[#646cff] text-left p-2"
          onClick={() => {
            setSelectedLink(`https://en.wikipedia.org/wiki/${category.title}`);
          }}
        >
          <span className="text-sm font-bold pr-4 text-black capitalize">
            {category.title}
          </span>
          {"Go ->"}
        </button>
        <button onClick={toggle} className="bg-blue-500 px-4">
          a
        </button>
      </Group>

      <Collapse
        in={opened}
        className="bg-gray-400 py-2 px-2 max-h-52 overflow-x-auto rounded-b-sm border-t-2 border-gray-300"
      >
        <Stack align="stretch" justify="flex-start" gap="xs">
          {parseArticles(category.categories_articles)}
        </Stack>
        {/* <ScrollArea h={"100%"}>
        </ScrollArea> */}
      </Collapse>
    </Box>
  );
}

// <div className="m-1 rounded-md p-2 bg-gray-400">
//   <div className="flex space-x-1">
//     <p className="text-sm font-bold">{category.title}</p>

//   </div>
//   <div className="flex flex-col space-y-2">
//     {parseArticles(category.categories_articles)}
//   </div>
// </div>

import { Group, Box, Collapse, Stack, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";

export default function CategoryCard({ category, setSelectedLink }) {
  const [opened, { toggle }] = useDisclosure(false);

  function parseArticles(articles) {
    var sorted = articles?.sort((entry) => entry.articles.first_letter);
    return sorted.map((entry) => {
      return (
        <button
          key={entry.articles.title}
          onClick={() => handleArticleClick(entry.articles.title)}
          className="text-xs bg-gray-300 rounded-md mr-10 pl-2 py-1 text-left hover:bg-gray-200"
        >
          {entry.articles.title}
        </button>
      );
    });
  }

  function handleArticleClick(clickedArticle) {
    setSelectedLink(
      `https://en.wikipedia.org/wiki/${clickedArticle.replace(" ", "_")}`
    );
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
        <p className="p-2 text-left text-sm font-bold text-black capitalize">
          {category.title}
        </p>
        <button onClick={toggle} className="px-4">
          <IconChevronDown />
        </button>
      </Group>

      <Collapse
        in={opened}
        className="bg-gray-400 py-2 px-2 max-h-52 rounded-b-sm border-t-2 border-gray-300 overflow-y-auto"
      >
        <Stack align="stretch" justify="flex-start" gap="xs">
          {category &&
            category.categories_articles &&
            parseArticles(category.categories_articles)}
        </Stack>
      </Collapse>
    </Box>
  );
}

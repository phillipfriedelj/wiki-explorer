import {
  Group,
  Box,
  Collapse,
  Stack,
  Button,
  ScrollArea,
  Card,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";

export default function CategoryCard({ category, setSelectedLink }) {
  const [opened, { toggle }] = useDisclosure(false);

  function parseArticles(articles) {
    var sorted = articles?.sort((entry) => entry.articles.first_letter);
    return sorted.map((entry) => {
      return (
        <Button
          key={entry.articles.title}
          onClick={() => handleArticleClick(entry.articles.title)}
          variant="light"
          color="blue"
          size="xs"
          fullWidth
          justify="start"
          my={"5px"}
        >
          {entry.articles.title}
        </Button>
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
      <Button
        variant="filled"
        size="xs"
        fullWidth
        justify="space-between"
        rightSection={<IconChevronDown size={14} />}
        onClick={toggle}
        // radius={"0px"}
        styles={{
          root: {
            transition: "all 1s ease-out;",
            borderBottomRightRadius: `${
              opened ? "0px" : "var(--mantine-radius-default)"
            }`,
            borderBottomLeftRadius: `${
              opened ? "0px" : "var(--mantine-radius-default)"
            }`,
          },
        }}
      >
        {category.title}
      </Button>
      <Collapse in={opened} className=" max-h-52 flex">
        <ScrollArea.Autosize
          mah={"200px"}
          w={"100%"}
          gap="xs"
          styles={{
            root: {
              borderBottomLeftRadius: "var(--mantine-radius-default)",
              borderBottomRightRadius: "var(--mantine-radius-default)",
              border:
                "0.5px solid light-dark(var(--mantine-color-blue-1), var(--mantine-color-dark-6)",
            },
            viewport: { padding: "2px 10px" },
          }}
        >
          {category &&
            category.categories_articles &&
            parseArticles(category.categories_articles)}
        </ScrollArea.Autosize>
      </Collapse>
    </Box>
  );
}

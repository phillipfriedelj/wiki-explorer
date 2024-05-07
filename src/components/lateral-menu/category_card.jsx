import {
  Stack,
  Collapse,
  Button,
  Text,
  rem,
  ScrollArea,
  Flex,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";

export default function CategoryCard({ category, setSelectedLink }) {
  const [opened, { toggle }] = useDisclosure(false);

  function parseArticles(articles) {
    var sorted = articles?.sort((entry) => entry.articles.first_letter);
    return (
      <Stack
        align="stretch"
        justify="flex-start"
        gap="0px"
        px={"5px"}
        py={"2px"}
        maw={"255px"}
      >
        {sorted.map((entry) => {
          return (
            <Button
              key={entry.articles.title}
              onClick={() => handleArticleClick(entry.articles.title)}
              variant="light"
              color="blue"
              size="xs"
              justify="start"
              my={"2px"}
            >
              <Text size={rem(10)} fw={300} truncate="end">
                {entry.articles.title}
              </Text>
            </Button>
          );
        })}
      </Stack>
    );
  }

  function handleArticleClick(clickedArticle) {
    setSelectedLink(
      `https://en.wikipedia.org/wiki/${clickedArticle.replace(" ", "_")}`
    );
  }

  return (
    <Flex
      py={rem("8px")}
      align="stretch"
      justify="flex-start"
      gap="0px"
      direction="column"
      wrap="nowrap"
      maw={"300px"}
      w={"300px"}
    >
      <Button
        variant="filled"
        size="xs"
        justify="space-between"
        rightSection={<IconChevronDown size={14} />}
        onClick={toggle}
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
        <Text size={rem(12)} fw={500} truncate="end">
          {category.title}
        </Text>
      </Button>
      <Collapse in={opened} mah={"200px"}>
        <ScrollArea.Autosize
          mah={"200px"}
          styles={{
            root: {
              borderBottomLeftRadius: "var(--mantine-radius-default)",
              borderBottomRightRadius: "var(--mantine-radius-default)",
              border:
                "0.5px solid light-dark(var(--mantine-color-blue-1), var(--mantine-color-dark-6)",
            },
          }}
        >
          {category &&
            category.categories_articles &&
            parseArticles(category.categories_articles)}
        </ScrollArea.Autosize>
      </Collapse>
    </Flex>
  );
}

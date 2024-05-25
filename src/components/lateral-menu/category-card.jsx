import { Collapse, Button, Text, rem, ScrollArea, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import PageContainer from "./page-container";

export default function CategoryCard({ category, setSelectedLink }) {
  const [opened, { toggle }] = useDisclosure(false);

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
        rightSection={
          category.categories_articles.length > 0 ? (
            <IconChevronDown size={14} />
          ) : (
            <></>
          )
        }
        onClick={
          category.categories_articles.length > 0
            ? toggle
            : setSelectedLink(category.title)
        }
        styles={{
          root: {
            transition: "all 1s ease-out",
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
          {category.title.replaceAll("_", " ")}
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
          {category && category.categories_articles && (
            <PageContainer
              articles={category.categories_articles}
              setSelectedLink={setSelectedLink}
            />
          )}
        </ScrollArea.Autosize>
      </Collapse>
    </Flex>
  );
}

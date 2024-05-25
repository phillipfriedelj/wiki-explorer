import {
  Collapse,
  Button,
  Text,
  rem,
  ScrollArea,
  Flex,
  ActionIcon,
  Badge,
} from "@mantine/core";
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
      miw={0}
    >
      <Flex
        miw={0}
        align={"center"}
        gap={"xs"}
        className={`p-1 justify-between rounded-t-sm ${
          opened ? "rounded-b-none" : "rounded-b-sm"
        }`}
        styles={{
          root: {
            border:
              "0.5px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4)",
          },
        }}
      >
        <div className={`flex space-x-1 items-center min-w-0`}>
          <Badge size="xs" color="blue" circle variant="light">
            <Text size={rem(8)} fw={300} truncate="end">
              {category.categories_articles.length}
            </Text>
          </Badge>
          <Button
            miw={0}
            size="compact-xs"
            onClick={() => {
              console.log(`Category:${category.title}`);
              setSelectedLink(
                `https://en.wikipedia.org/wiki/Category:${category.title}`
              );
            }}
          >
            <Text size={rem(12)} fw={500} truncate="end">
              {category.title.replaceAll("_", " ")}
            </Text>
          </Button>
        </div>
        <ActionIcon
          disabled={!category.categories_articles.length > 0}
          onClick={toggle}
        >
          <IconChevronDown size={14} />
        </ActionIcon>
      </Flex>
      {category.categories_articles.length > 0 && (
        <Collapse in={opened} mah={"200px"}>
          <ScrollArea.Autosize
            mah={"200px"}
            styles={{
              root: {
                borderBottomLeftRadius: "var(--mantine-radius-default)",
                borderBottomRightRadius: "var(--mantine-radius-default)",
                border:
                  "0.5px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4)",
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
      )}
    </Flex>
  );
}

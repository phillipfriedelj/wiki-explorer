import {
  Collapse,
  Button,
  Text,
  rem,
  em,
  ScrollArea,
  Flex,
  ActionIcon,
  Badge,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import PageContainer from "./page-container";
import useSelectedLinkStore from "@/hooks/selected-link-store";

export default function CategoryCard({ category }) {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const { setSelectedLink } = useSelectedLinkStore();
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
              if (isMobile) {
                // setCollapsed(true);
              }
              setSelectedLink(`Category:${category.title}`);
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
              <PageContainer articles={category.categories_articles} />
            )}
          </ScrollArea.Autosize>
        </Collapse>
      )}
    </Flex>
  );
}

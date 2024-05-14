import {
  Stack,
  Group,
  Transition,
  ActionIcon,
  em,
  Divider,
} from "@mantine/core";
import ListPagination from "../list-pagination";
import { useEffect, useState } from "react";
import CategoryList from "@/components/lateral-menu/category-list";
import CategoryListHeading from "./category-list-heading";
import { IconCaretLeftRight } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

import {
  useFetchCategories,
  useFetchCategoryCount,
  usePrefetchCategories,
} from "../../../hooks/category-hooks";

export default function LateralCategoryMenu({
  setSelectedLink,
  setDisplayedMenu,
  setCollapsed,
  collapsed,
}) {
  const entriesPerPage = 50;
  const [selectedLetter, setSelectedLetter] = useState("a");
  const [activePage, setActivePage] = useState(1);

  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const { isLoadingCount, categoryCount } =
    useFetchCategoryCount(selectedLetter);
  const { isLoading, data } = useFetchCategories(
    selectedLetter,
    activePage,
    entriesPerPage
  );
  usePrefetchCategories(activePage, selectedLetter, entriesPerPage);

  useEffect(() => {
    var initialSet = false;
    if (isMobile && !initialSet) {
      initialSet = true;
      setCollapsed(true);
    }
  }, [isMobile]);

  useEffect(() => {
    setActivePage(1);
  }, [selectedLetter]);

  return (
    <Group
      wrap="nowrap"
      h={"100%"}
      gap={"xs"}
      preventGrowOverflow
      styles={{
        root: {
          backgroundColor: "var(--mantine-color-body)",
        },
      }}
    >
      <ActionIcon
        onClick={() => setCollapsed(!collapsed)}
        size={"xs"}
        h={"100%"}
        className="place-self-start"
      >
        <IconCaretLeftRight style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
      <Transition
        mounted={!collapsed}
        transition="fade"
        duration={15}
        timingFunction="ease-in-out"
      >
        {(styles) => (
          <Stack h={"100%"} gap={"xs"} wrap="nowrap" style={styles}>
            <CategoryListHeading
              selectedLetter={selectedLetter}
              setSelectedLetter={setSelectedLetter}
              setDisplayedMenu={setDisplayedMenu}
            />
            <Divider />
            <CategoryList
              data={data}
              isLoading={isLoading}
              setSelectedLink={setSelectedLink}
            />
            {!isLoadingCount && (
              <ListPagination
                pageTotal={categoryCount / entriesPerPage}
                activePage={activePage}
                setActivePage={setActivePage}
              />
            )}
          </Stack>
        )}
      </Transition>
    </Group>
  );
}

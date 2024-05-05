import { Pagination, Group } from "@mantine/core";
import { useMatches } from "@mantine/hooks";

export default function CategoryPagination({
  pageTotal,
  activePage,
  setActivePage,
}) {
  // const siblings = useMatches()

  return (
    <Group justify="center">
      <Pagination
        total={pageTotal}
        size="xs"
        radius="xs"
        className="center"
        value={activePage}
        onChange={setActivePage}
        // withEdges
        siblings={0}
      />
    </Group>
  );
}

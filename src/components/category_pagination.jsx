import { Pagination, Group } from "@mantine/core";

export default function CategoryPagination({
  pageTotal,
  activePage,
  setActivePage,
}) {
  return (
    <Group justify="center">
      <Pagination
        total={pageTotal}
        size="xs"
        radius="xs"
        className="center"
        value={activePage}
        onChange={setActivePage}
        withEdges
        // siblings={2}
      />
    </Group>
  );
}

import { Pagination, Group } from "@mantine/core";

export default function CategoryPagination({
  pageTotal,
  activePage,
  setActivePage,
}) {
  return (
    <Group justify="center" mt={8}>
      <Pagination
        total={pageTotal}
        size="sm"
        radius="xs"
        className="center"
        value={activePage}
        onChange={setActivePage}
      />
    </Group>
  );
}

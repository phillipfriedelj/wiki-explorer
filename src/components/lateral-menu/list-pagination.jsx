import { Pagination, Group } from "@mantine/core";

export default function ListPagination({
  pageTotal,
  activePage,
  setActivePage,
}) {
  return (
    <Group justify="center" wrap="nowrap">
      <Pagination
        total={pageTotal}
        size="xs"
        radius="xs"
        className="center"
        value={activePage}
        onChange={setActivePage}
        siblings={1}
      />
    </Group>
  );
}

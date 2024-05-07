import { Pagination, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function CategoryPagination({
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

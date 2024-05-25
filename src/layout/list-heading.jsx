import { Group, Title, Stack, CloseButton, Divider } from "@mantine/core";
import useLateralMenuStore from "@/hooks/lateral-menu-store";
export default function ListHeading({ title, children }) {
  const { setCollapsed } = useLateralMenuStore();
  return (
    <>
      <Stack gap={"0"}>
        <CloseButton onClick={setCollapsed} className="self-end" />
        <Group wrap="nowrap" gap={"xs"} justify="space-between">
          <Title order={3} size="h5">
            {title}
          </Title>
          <Group wrap="nowrap" gap={"xs"} justify="space-between">
            {children}
          </Group>
        </Group>
      </Stack>
      <Divider />
    </>
  );
}

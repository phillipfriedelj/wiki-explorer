import { Group, Title, Stack, CloseButton, Divider } from "@mantine/core";
export default function ListHeading({ title, onClose, children }) {
  return (
    <>
      <Stack>
        <Group wrap="nowrap" gap={"xs"} justify="space-between">
          <Title order={3} size="h5">
            {title}
          </Title>
          <CloseButton onClick={onClose} />
        </Group>
        <Group wrap="nowrap" gap={"xs"} justify="flex-end">
          {children}
        </Group>
      </Stack>
      <Divider />
    </>
  );
}

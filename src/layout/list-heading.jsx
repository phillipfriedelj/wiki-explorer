import { Group, Title, Stack, CloseButton, Divider } from "@mantine/core";
export default function ListHeading({ title, onClose, children }) {
  return (
    <>
      <Stack gap={"0"}>
        <CloseButton onClick={onClose} className="self-end" />
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

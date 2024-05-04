import { Stack, Title } from "@mantine/core";
export default function PageLayout({ subtitle, children }) {
  return (
    <Stack
      h={"100vh"}
      bg="var(--mantine-color-body)"
      align="stretch"
      justify="space-between"
      gap="md"
    >
      <Stack px={"8px"}>
        <Title order={1}>Wiki Explorer</Title>
        <Title order={2}>{subtitle}</Title>
      </Stack>
      {children}
    </Stack>
  );
}

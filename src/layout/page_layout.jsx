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
      <Stack px={"8px"} gap={"1"}>
        <Title order={1} size={"h2"} fw={700}>
          Wiki Explorer
        </Title>
        <Title order={2} size={"h4"} fw={400}>
          {subtitle}
        </Title>
      </Stack>
      {children}
    </Stack>
  );
}

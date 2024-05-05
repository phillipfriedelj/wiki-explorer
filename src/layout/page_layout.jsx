import { Stack, Title, AppShell, Group, ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLayoutSidebarLeftCollapseFilled,
  IconLayoutSidebarRightCollapseFilled,
} from "@tabler/icons-react";
export default function PageLayout({ subtitle, lateralContent, children }) {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <ActionIcon onClick={toggle}>
            {opened ? (
              <IconLayoutSidebarLeftCollapseFilled />
            ) : (
              <IconLayoutSidebarRightCollapseFilled />
            )}
          </ActionIcon>
          <Stack px={"8px"} gap={"1"}>
            <Title order={1} size={"h2"} fw={700}>
              Wiki Explorer
            </Title>
            <Title order={2} size={"h4"} fw={400}>
              {subtitle}
            </Title>
          </Stack>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">{lateralContent}</AppShell.Navbar>
      <AppShell.Main bg={"cyan"}>{children}</AppShell.Main>
    </AppShell>
    // <Stack
    //   h={"100vh"}
    //   bg="var(--mantine-color-body)"
    //   align="stretch"
    //   justify="space-between"
    //   gap="md"
    // >
    //   <Stack px={"8px"} gap={"1"}>
    //     <Title order={1} size={"h2"} fw={700}>
    //       Wiki Explorer
    //     </Title>
    //     <Title order={2} size={"h4"} fw={400}>
    //       {subtitle}
    //     </Title>
    //   </Stack>
    //   {children}
    // </Stack>
  );
}

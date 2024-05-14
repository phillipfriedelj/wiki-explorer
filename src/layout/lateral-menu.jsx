import { Group, Transition, Stack, ActionIcon, Divider } from "@mantine/core";
import { IconCategory, IconSearch } from "@tabler/icons-react";
export default function LateralMenu({
  collapsed,
  children,
  handleLateralIconClick,
}) {
  return (
    <Group
      wrap="nowrap"
      h={"100%"}
      gap={"xs"}
      preventGrowOverflow
      styles={{
        root: {
          backgroundColor: "var(--mantine-color-body)",
        },
      }}
    >
      <Stack justify={"flex-start"} align="center" h={"100%"}>
        <ActionIcon
          onClick={() => handleLateralIconClick("category")}
          size={"xs"}
          className="place-self-start"
        >
          <IconCategory style={{ width: "70%", height: "70%" }} />
        </ActionIcon>
        <ActionIcon
          onClick={() => handleLateralIconClick("search")}
          size={"xs"}
          className="place-self-start"
        >
          <IconSearch style={{ width: "70%", height: "70%" }} />
        </ActionIcon>
      </Stack>
      <Divider orientation="vertical" />
      <Transition
        mounted={!collapsed}
        transition="fade"
        duration={15}
        timingFunction="ease-in-out"
      >
        {(styles) => (
          <Stack h={"100%"} gap={"xs"} wrap="nowrap" style={styles}>
            {children}
          </Stack>
        )}
      </Transition>
    </Group>
  );
}

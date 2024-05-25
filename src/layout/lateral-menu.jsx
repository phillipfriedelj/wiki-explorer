import {
  Group,
  Transition,
  Stack,
  ActionIcon,
  Divider,
  em,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconCategory, IconSearch } from "@tabler/icons-react";
import useLateralMenuStore from "@/hooks/lateral-menu-store";

export default function LateralMenu({ children, handleLateralIconClick }) {
  const { collapsed } = useLateralMenuStore();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

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
      className="relative"
    >
      <Stack justify={"flex-start"} align="center" h={"100%"}>
        <ActionIcon
          onClick={() => handleLateralIconClick("category")}
          // size={"sm"}
          className="place-self-start"
        >
          <IconCategory style={{ width: "70%", height: "70%" }} />
        </ActionIcon>
        <ActionIcon
          onClick={() => handleLateralIconClick("search")}
          // size={"sm"}
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
          <div
            className={`gap-2  flex flex-col flex-nowrap h-full ${
              isMobile ? "absolute" : "inline"
            }`}
            style={{
              ...styles,
              backgroundColor: "var(--mantine-color-body)",
              left: "calc(100% + 10px)",
            }}
          >
            {children}
          </div>
        )}
      </Transition>
    </Group>
  );
}

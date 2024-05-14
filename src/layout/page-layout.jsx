import { Stack, Flex } from "@mantine/core";
import Navbar from "./navbar";

export default function PageLayout({ lateralMenu, mainContent }) {
  return (
    <Stack
      h={"100dvh"}
      mah={"100dvh"}
      align="stretch"
      justify="space-between"
      gap="xs"
    >
      <Navbar />
      <Flex
        className="flex-grow overflow-x-hidden"
        px={"8px"}
        pb={"8px"}
        gap={"xs"}
        style={{ overflow: "hidden" }}
      >
        {lateralMenu}
        {mainContent}
      </Flex>
    </Stack>
  );
}

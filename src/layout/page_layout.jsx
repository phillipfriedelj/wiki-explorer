import { Stack, Flex } from "@mantine/core";
import Navbar from "./navbar";

export default function PageLayout({ children }) {
  return (
    <Stack
      h={"100vh"}
      mah={"100vh"}
      bg="var(--mantine-color-body)"
      align="stretch"
      justify="space-between"
      gap="xs"
    >
      <Navbar />
      <Flex
        w={"100%"}
        h={"100%"}
        mah={"100vh"}
        px={"8px"}
        pb={"8px"}
        className="flex-1 overflow-y-auto"
      >
        <Flex className="flex-grow">{children}</Flex>
      </Flex>
    </Stack>
  );
}

import { Group, Stack, Title } from "@mantine/core";
import animatedWikiLogo from "../assets/wiki-logo.gif";
import wikiLogo from "../../public/wiki-logo.png";
import Image from "next/image";
export default function PageLayout({ subtitle, children }) {
  return (
    <Stack
      h={"100vh"}
      bg="var(--mantine-color-body)"
      align="stretch"
      justify="space-between"
      gap="md"
    >
      <Group px={"8px"} pt={"8px"}>
        <Image src={wikiLogo} height={"45"} alt="wikipedia-logo" />
        <Stack gap={"0"}>
          <Title order={1} size={"h3"} fw={700}>
            Wiki Explorer
          </Title>
          <Title order={2} size={"h6"} fw={400}>
            {subtitle}
          </Title>
        </Stack>
      </Group>
      {children}
    </Stack>
  );
}

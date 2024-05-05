import { Group, Stack, Title, ActionIcon, rem } from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";
import animatedWikiLogo from "../assets/wiki-logo.gif";
import wikiLogo from "../../public/wiki-logo.png";
import Image from "next/image";
import { IconSun, IconMoonStars, IconBrandGithub } from "@tabler/icons-react";

export default function PageLayout({ subtitle, children }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={"#fcb603"}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={"#5c5ff7"}
    />
  );

  return (
    <Stack
      h={"100vh"}
      bg="var(--mantine-color-body)"
      align="stretch"
      justify="space-between"
      gap="md"
    >
      <Group px={"8px"} pt={"8px"} justify="space-between">
        <Group>
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
        <Group>
          <ActionIcon onClick={() => toggleColorScheme()}>
            {colorScheme === "light" ? (
              <IconSun></IconSun>
            ) : (
              <IconMoonStars></IconMoonStars>
            )}
          </ActionIcon>
          <ActionIcon>
            <IconBrandGithub></IconBrandGithub>
          </ActionIcon>
        </Group>
      </Group>
      {children}
    </Stack>
  );
}

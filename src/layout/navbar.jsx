import { Group, Stack, Title, ActionIcon, rem } from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";
import Image from "next/image";
import { IconBrandGithub, IconSun, IconMoonStars } from "@tabler/icons-react";
import wikiLogo from "../../public/wiki-logo.png";

export default function Navbar() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group px={"8px"} pt={"8px"} justify="space-between">
      <Group>
        <Image src={wikiLogo} height={"30"} alt="wikipedia-logo" />
        <Stack gap={"0"}>
          <Title order={1} size={"1.25rem"} fw={700}>
            Wiki Explorer
          </Title>
          <Title order={2} size={"0.75rem"} fw={400} mt={"-3px"}>
            Explore Wikipedia's categories
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
  );
}

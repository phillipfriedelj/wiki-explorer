import { Group, Stack, Title, ActionIcon, rem } from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";
import Image from "next/image";
import { IconBrandGithub, IconSun, IconMoonStars } from "@tabler/icons-react";
import wikiLogo from "../../public/wiki-logo.png";

export default function Navbar() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <navbar>
      <Group px={"8px"} pt={"8px"} justify="space-between" wrap="nowrap">
        <Group wrap="nowrap">
          <Image src={wikiLogo} height={"30"} alt="wikipedia-logo" />
          <Stack gap={"0"}>
            <Title order={1} size={"1.25rem"} fw={700}>
              Wiki Explorer
            </Title>
            <Title order={2} size={"0.75rem"} fw={400} mt={"-3px"}>
              Explore Wikipedia&apos;s categories
            </Title>
          </Stack>
        </Group>
        <Group wrap="nowrap">
          <ActionIcon onClick={() => toggleColorScheme()}>
            {colorScheme === "light" ? (
              <IconSun style={{ width: "70%", height: "70%" }}></IconSun>
            ) : (
              <IconMoonStars
                style={{ width: "70%", height: "70%" }}
              ></IconMoonStars>
            )}
          </ActionIcon>
          <ActionIcon>
            <IconBrandGithub
              style={{ width: "70%", height: "70%" }}
            ></IconBrandGithub>
          </ActionIcon>
        </Group>
      </Group>
    </navbar>
  );
}

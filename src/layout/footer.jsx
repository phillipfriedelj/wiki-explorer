import { Group, Stack, Title, ActionIcon } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";

export default function Footer() {
  return (
    <navbar>
      <Group px={"8px"} pt={"8px"} justify="space-between" wrap="nowrap">
        <Stack gap={"0"}>
          <Title order={2} size={"0.5rem"} fw={300} mt={"-3px"}>
            Developed by: Phillip Friede
          </Title>
          <Title order={2} size={"0.5rem"} fw={300} mt={"-3px"}>
            hello@phillifriedel.com
          </Title>
          <p className="bg-pink-500">IN FOOTER</p>
        </Stack>
        <ActionIcon>
          <IconBrandGithub></IconBrandGithub>
        </ActionIcon>
      </Group>
    </navbar>
  );
}

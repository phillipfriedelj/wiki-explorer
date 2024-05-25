import useSelectedLinkStore from "@/hooks/selected-link-store";
import { Stack, Button, Text, rem } from "@mantine/core";
export default function PageContainer({ articles }) {
  const { setSelectedLink } = useSelectedLinkStore();

  function compare_title(a, b) {
    if (a.articles.title < b.articles.title) {
      return -1;
    }
    if (a.articles.title > b.articles.title) {
      return 1;
    }
    return 0;
  }

  return (
    <Stack
      align="stretch"
      justify="flex-start"
      gap="0px"
      px={"5px"}
      py={"2px"}
      maw={"255px"}
    >
      {articles.sort(compare_title).map((entry) => {
        return (
          <Button
            key={entry.articles.title}
            onClick={() =>
              setSelectedLink(entry.articles.title.replace(" ", "_"))
            }
            variant="light"
            color="blue"
            size="xs"
            justify="start"
            my={"2px"}
          >
            <Text size={rem(10)} fw={300} truncate="end">
              {entry.articles.title.replaceAll("_", " ")}
            </Text>
          </Button>
        );
      })}
    </Stack>
  );
}

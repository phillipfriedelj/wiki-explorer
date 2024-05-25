import { Stack, Button, Text, rem } from "@mantine/core";
export default function PageContainer({ articles, setSelectedLink }) {
  var sorted = articles?.sort((entry) => entry.articles.first_letter);

  function handleArticleClick(clickedArticle) {
    setSelectedLink(
      `https://en.wikipedia.org/wiki/${clickedArticle.replace(" ", "_")}`
    );
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
      {sorted.map((entry) => {
        return (
          <Button
            key={entry.articles.title}
            onClick={() => handleArticleClick(entry.articles.title)}
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

import { Group, Box, Button, Collapse, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function CategoryCard({ category, setSelectedLink }) {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <Box bg={"red"} w={"100%"}>
      <Group mb={5}>
        <button
          onClick={() => {
            toggle;
            setSelectedLink(`https://en.wikipedia.org/wiki/${category.title}`);
          }}
          className="text-xs text-[#646cff] w-full text-left p-2"
        >
          <span className="text-sm font-bold pr-4 text-black capitalize">
            {category.title}
          </span>
          {"Go ->"}
        </button>
      </Group>

      <Collapse in={opened}>
        <ScrollArea h={"100%"}>
          {parseArticles(category.categories_articles)}
        </ScrollArea>
      </Collapse>
    </Box>
    // <Accordion.Item
    //   className="capitalize"
    //   key={category.title}
    //   value={category.title}
    // >
    //   <Accordion.Control>{category.title}</Accordion.Control>
    //   {parseArticles(category.categories_articles)}
    // </Accordion.Item>
  );
}

function parseArticles(articles) {
  var sorted = articles?.sort((entry) => entry.articles.first_letter);
  return sorted.map((entry) => {
    return (
      <button
        onClick={(e) => console.log("CLICKED ", e.target.value)}
        className="text-xs bg-gray-100 rounded-md p-2 text-left hover:bg-gray-200"
      >
        {entry.articles.title}
      </button>
    );
  });
}

// <div className="m-1 rounded-md p-2 bg-gray-400">
//   <div className="flex space-x-1">
//     <p className="text-sm font-bold">{category.title}</p>

//   </div>
//   <div className="flex flex-col space-y-2">
//     {parseArticles(category.categories_articles)}
//   </div>
// </div>

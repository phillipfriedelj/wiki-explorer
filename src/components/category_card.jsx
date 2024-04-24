import { Accordion, ScrollArea } from "@mantine/core";

export default function CategoryCard({ category }) {
  return (
    <Accordion.Item
      className="capitalize"
      key={category.title}
      value={category.title}
    >
      <Accordion.Control>{category.title}</Accordion.Control>
      {parseArticles(category.categories_articles)}
    </Accordion.Item>
    // <div className="m-1 rounded-md p-2 bg-gray-400">
    //   <div className="flex space-x-1">
    //     <p className="text-sm font-bold">{category.title}</p>
    //     <button
    //       onClick={() =>
    //         setSelectedLink(`https://en.wikipedia.org/wiki/${category.title}`)
    //       }
    //       className="text-xs text-[#646cff]"
    //     >
    //       {"Go ->"}
    //     </button>
    //   </div>
    //   <div className="flex flex-col space-y-2">
    //     {parseArticles(category.categories_articles)}
    //   </div>
    // </div>
  );
}

function parseArticles(articles) {
  var sorted = articles?.sort((entry) => entry.articles.first_letter);
  return sorted.map((entry) => {
    return (
      <Accordion.Panel>
        <button
          onClick={(e) => console.log("CLICKED ", e.target.value)}
          className="text-xs bg-gray-100 rounded-md p-2 text-left hover:bg-gray-200"
        >
          {entry.articles.title}
        </button>
      </Accordion.Panel>
    );
  });
}

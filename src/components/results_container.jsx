"use client";
import { Flex, Stack, Center } from "@mantine/core";
// import { getCategoriesByLetterAndPage } from "@/queries/get-categories";
import Iframe from "./iframe";

// export async function getStaticProps() {
//   const categories = await getCategoriesByLetterAndPage("a", 1, 50);
//   // const categoryCount = await getCategoryCount("a");
//   return { categories };
// }

export default function ResultsContainer({ selectedLink }) {
  //TODO Add skeleton if no data
  return (
    // <Flex
    //   // w={"100%"}
    //   h={"100%"}
    //   mah={"100vh"}
    //   className="flex-grow overflow-y-auto"
    // >
    // <Center h={"100%"} w={"100%"} mah={"100%"} maw={"100%"}>
    <Stack h={"100%"}>
      a
      <iframe
        src={selectedLink ? selectedLink : "https://en.wikipedia.org"}
        height={"100%"}
        width={"100%"}
      />
    </Stack>
    // </Center>
    // <Iframe selectedLink={selectedLink} />
    // </Flex>
  );
}

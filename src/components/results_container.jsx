import { ScrollArea } from "@mantine/core";
import CategoryPagination from "./category_pagination";
export default function ResultsContainer({
  results,
  selectedLink,
  selectedLetter,
}) {
  return (
    <>
      <div className="flex bg-gray-100 py-2 flex-1 overflow-y-auto w-full h-full max-h-screen">
        <div className="flex flex-grow">
          <div className="flex flex-col w-1/2 h-full">
            <ScrollArea w={"100%"} h={"100%"} offsetScrollbars>
              {results}
            </ScrollArea>
            <CategoryPagination
              results={results}
              selectedLetter={selectedLetter}
            />
          </div>
          <div className="w-1/2 flex-1">
            <iframe
              src={selectedLink ? selectedLink : "https://en.wikipedia.org"}
              height={"100%"}
              width={"100%"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

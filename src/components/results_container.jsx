import { ScrollArea } from "@mantine/core";
export default function ResultsContainer({ results, selectedLink }) {
  return (
    <>
      <div className="flex bg-gray-100 py-2 flex-1 overflow-y-auto w-full h-full">
        <div className="flex flex-grow">
          <ScrollArea w={"50%"} h={"100%"} offsetScrollbars>
            {results}
          </ScrollArea>
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

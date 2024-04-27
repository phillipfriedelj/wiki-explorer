"use client";
import NodeGraph from "@/components/node-graph";
import { Title, Flex } from "@mantine/core";

export default function Overview() {
  return (
    <div className="flex flex-col py-2 flex-1 overflow-y-auto w-full h-full max-h-screen">
      <Title order={2}>Overview</Title>
      <Title order={3}>What is this?</Title>
      <div className="flex flex-col flex-grow bg-pink-600">
        <p>TEST</p>
        <NodeGraph />
      </div>
      {/* <Flex
        styles={{
          root: { backgroundColor: "red" },
        }}
        flexGrow={1}
        color="#C3FF36"
        b="#C3FF36"
        c="#C3FF36"
        w={"100%"}
        h={"100%"}
      >

      </Flex> */}
    </div>
    // <Flex
    //   mih={50}
    //   gap="md"
    //   justify="center"
    //   align="flex-start"
    //   direction="column"
    //   wrap="wrap"
    //   h={"100%"}
    //   className={"bg-pink-500"}
    // >

    // </Flex>
  );
}

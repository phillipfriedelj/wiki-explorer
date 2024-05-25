import { Box, Skeleton } from "@mantine/core";
export default function ListSkeleton() {
  return (
    <Box miw={"300px"} w={"300px"} className="p-2 overflow-y-clip">
      {Array(40)
        .fill(0)
        .map((_, index) => (
          <Skeleton
            color="blue"
            my={"5px"}
            key={index}
            h={"30px"}
            animate={false}
          />
        ))}
    </Box>
  );
}

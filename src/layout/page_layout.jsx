import FunctionTabs from "@/components/function_tabs";
import { Title, Stack } from "@mantine/core";
export default function PageLayout({ subtitle, children }) {
  return (
    // <Stack
    //   h={"100%"}
    //   flexGrow={1}
    //   styles={{ root: { backgroundColor: "green" } }}
    // >
    <div className="flex flex-col flex-grow h-full max-h-screen bg-blue-500">
      <div>
        <Title order={1}>Wiki Explorer</Title>
        <Title order={2}>{subtitle}</Title>
      </div>
      {children}
    </div>
    // </Stack>
  );
}

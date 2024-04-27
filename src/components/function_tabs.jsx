import { Tabs } from "@mantine/core";
import {
  IconWorld,
  IconCategory,
} from "@tabler/icons-react/dist/esm/tabler-icons-react";

export default function FunctionTabs({ activeTab, setActiveTab }) {
  return (
    <Tabs variant="outline" value={activeTab} onChange={setActiveTab}>
      <Tabs.List>
        <Tabs.Tab
          value="overview"
          leftSection={<IconWorld style={{ width: "10px", height: "10px" }} />}
        >
          Overview
        </Tabs.Tab>
        <Tabs.Tab
          value="explore-categories"
          leftSection={
            <IconCategory style={{ width: "10px", height: "10px" }} />
          }
        >
          Explore Categories
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}

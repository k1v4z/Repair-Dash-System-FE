import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { TabItem } from "@/types/globals.type";

interface SwitchableTabsProps {
  tabs: TabItem[];
  defaultTab: string;
}

const SwitchableTabs = ({ tabs, defaultTab }: SwitchableTabsProps) => {
  return (
    <div className="mt-8">
      <Tabs defaultValue={defaultTab}>
        <TabsList className="w-full h-12 justify-start p-2">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="h-full px-4 py-2 text-gray-700 rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SwitchableTabs;

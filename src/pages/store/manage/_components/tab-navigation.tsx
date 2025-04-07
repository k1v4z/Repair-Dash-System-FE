import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { TabItem } from "@/types/globals.type";
import { cn } from "@/lib/utils";

interface TabNavigationProps {
  tabs: TabItem[];
  defaultTab: string;
}

export function TabNavigation({ tabs, defaultTab }: TabNavigationProps) {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="w-full bg-white rounded-t-lg border-b border-gray-100 p-0 h-auto flex justify-start overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <TabsTrigger 
            key={tab.value} 
            value={tab.value}
            className={cn(
              "py-4 px-6 text-sm font-medium rounded-none relative transition-all duration-300 ease-in-out",
              "before:absolute before:bottom-0 before:left-0 before:h-[3px] before:w-full before:origin-left before:scale-x-0 before:bg-primary before:transition-transform before:duration-300 data-[state=active]:before:scale-x-100",
              "after:absolute after:bottom-0 after:left-0 after:h-full after:w-full after:origin-bottom after:scale-y-0 after:bg-primary/5 after:transition-transform after:duration-300 after:z-[-1] data-[state=active]:after:scale-y-100",
              "data-[state=active]:text-primary data-[state=active]:font-semibold",
              "data-[state=active]:shadow-none hover:bg-gray-50"
            )}
          >
            <span className="relative z-10">{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="bg-white p-6 rounded-b-lg shadow-sm transition-all duration-300 ease-in-out min-h-[400px] relative ">
        {tabs.map((tab) => (
          <TabsContent 
            key={tab.value} 
            value={tab.value}
            className={cn(
              "mt-0 absolute w-full transition-all duration-500 ease-in-out transform",
              "data-[state=inactive]:translate-x-[-100%] data-[state=inactive]:opacity-0",
              "data-[state=active]:translate-x-0 data-[state=active]:opacity-100"
            )}
          >
            {tab.content}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}


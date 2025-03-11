import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import StoreDescription from "./store-description";
import ReviewList from "./reviews";

const StoreTabs = () => {
  return (
    <div className="mt-8">
      <Tabs defaultValue="description">
        <TabsList className="w-full h-[50px] justify-start p-2">
          <TabsTrigger
            value="description"
            className="h-full px-4 py-2 text-gray-700 rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Mô tả cửa hàng
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="h-full px-4 py-2 text-gray-700 rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Đánh giá
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <StoreDescription />
        </TabsContent>
        <TabsContent value="reviews">
          <div className="border rounded-lg p-4 shadow bg-white mt-4">
            <ReviewList />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StoreTabs;

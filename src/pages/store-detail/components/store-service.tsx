import { useState } from "react";
import { Arrow } from "@/components/icons/glyphs/arrow";
import ServiceList from "./service-list";

const StoreService = () => {
  const [showAll, setShowAll] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h5 className="text-2xl font-bold text-primary-royalBlue">
          Danh sách dịch vụ
        </h5>
        <div
          className="flex items-center cursor-pointer hover:underline"
          onClick={() => setShowAll(!showAll)}
        >
          <span>{showAll ? "Thu gọn" : "Xem tất cả"}</span>
          <Arrow className="mt-1 w-5 h-5 -rotate-90" />
        </div>
      </div>

      <ServiceList showAll={showAll} />
    </div>
  );
};

export default StoreService;

import { useState } from "react";
import { useParams } from "react-router-dom";
import useStoreDetail from "@/features/store-detail/hooks/useStoreDetail";

const LIMIT = 700;

const StoreDescription = () => {
  const { id } = useParams();
  const { storeDetail } = useStoreDetail(id ?? "");

  const [expanded, setExpanded] = useState(false);

  const description = storeDetail?.store?.user_description ?? "";
  const showReadMore = description.length > LIMIT;
  const shortDescription = description.slice(0, LIMIT);

  return (
    <div className="border rounded-lg shadow p-4 bg-white">
      <p className="text-gray-600 text-lg leading-relaxed">
        {expanded || !showReadMore ? (
          description || (
            <span className="block text-center">Không có mô tả</span>
          )
        ) : (
          <>
            {shortDescription}...
            <span
              onClick={() => setExpanded(true)}
              className="text-gray-600 text-lg cursor-pointer hover:underline"
            >
              Xem thêm
            </span>
          </>
        )}
      </p>
      {expanded && showReadMore && (
        <span
          onClick={() => setExpanded(false)}
          className="text-gray-600 text-lg cursor-pointer hover:underline"
        >
          Thu gọn
        </span>
      )}
    </div>
  );
};

export default StoreDescription;

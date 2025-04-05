import type { Review } from "@/features/store/types/store-detail.type";
import ReviewList from "./review-list";

const REVIEWS: Review[] = [
  {
    customer_full_name: "Nguyễn Văn A",
    order_feedback: "Lắp đặt thành công, không có phụ phí",
    order_rating: 5,
  },
  {
    customer_full_name: "Lê Văn B",
    order_feedback: "Lắp đặt khá lâu",
    order_rating: 3.2,
  },
];

const StoreReview = () => {
  return (
    <div className="space-y-6 shadow p-4">
      <ReviewList list={REVIEWS} />
    </div>
  );
};

export default StoreReview;

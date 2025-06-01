import type { Review } from "@/features/store/types/store-detail.type";
import ReviewItem from "@/components/common/review-item";
import Icons from "@/components/icons";

interface ReviewProps {
  reviews: Review[];
}
const ServiceReview = ({ reviews }: ReviewProps) => {
  return (
    <div className="mt-10">
      <h4 className="text-xl font-semibold">Đánh giá từ khách hàng</h4>
      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <Icons glyph="message" className="w-12 h-12 mx-auto mb-3" />
          <p className="text-gray-500">Chưa có đánh giá nào</p>
        </div>
      ) : (
        <div className="max-h-[500px] overflow-y-auto space-y-4 mt-6 border rounded shadow p-4">
          {reviews.map((review, index) => (
            <ReviewItem key={index} review={review} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceReview;

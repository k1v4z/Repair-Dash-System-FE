import ReviewItem from "@/components/common/review-item";
import type { Review } from "@/features/store/types/store-detail.type";

interface ReviewProps {
  list: Review[];
}

const ReviewList = ({ list }: ReviewProps) => {
  return (
    <div className="max-h-80 overflow-y-auto space-y-4">
      {list.map((review: Review) => (
        <ReviewItem review={review} />
      ))}
    </div>
  );
};

export default ReviewList;

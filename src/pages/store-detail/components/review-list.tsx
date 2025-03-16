import ReviewItem from "./review-item";
import type { Review } from "@/features/store-detail/types/review";

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

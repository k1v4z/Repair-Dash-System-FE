import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Review } from "@/features/store-detail/types/store-detail.type";
import Rating from "@/components/common/rating";

interface ReviewProps {
  review: Review;
}

const ReviewItem = ({ review }: ReviewProps) => {
  return (
    <div className="flex gap-4 border-b pb-4 last:border-0">
      <Avatar>
        <AvatarFallback>{review.customer_full_name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold mt-1">
            {review.customer_full_name}
          </span>
          <div className="flex">
            <Rating number={review.order_rating} />
          </div>
        </div>
        <p className="text-gray-600">{review.order_feedback}</p>
      </div>
    </div>
  );
};

export default ReviewItem;

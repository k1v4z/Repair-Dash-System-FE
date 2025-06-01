import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Review } from "@/features/store/types/store-detail.type";
import Rating from "@/components/common/rating";
import { useState } from "react";

interface ReviewProps {
  review: Review;
}

const TEXT_LIMIT = 150; 

const ReviewItem = ({ review }: ReviewProps) => {
  const [isExpanded, setIsExpanded] = useState(false); 

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
        <div>
          <p className={`text-gray-600 w-full break-all ${!isExpanded ? 'line-clamp-2' : ''}`}>
          {review.order_feedback}
          </p>
          {review.order_feedback.length > TEXT_LIMIT && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-800 text-sm mt-1"
            >
              {isExpanded ? 'Thu gọn' : 'Hiển thị thêm'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;

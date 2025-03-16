import Icons from "@/components/icons";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Review } from "@/features/store-detail/types/review";

interface ReviewProps {
  review: Review;
}

const ReviewItem = ({ review }: ReviewProps) => {
  return (
    <div key={review.id} className="flex gap-4 border-b pb-4 last:border-0">
      <Avatar>
        <AvatarImage src={review.user.avatar} alt={review.user.name} />
        <AvatarFallback>{review.user.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold">{review.user.name}</span>
          <div className="flex">
            {[...Array(review.rating)].map((_, i) => (
              <Icons
                glyph="star"
                color="gold"
                className="w-5 h-5 mt-1"
                key={i}
              />
            ))}
          </div>
        </div>
        <p className="text-gray-600">{review.content}</p>
      </div>
    </div>
  );
};

export default ReviewItem;

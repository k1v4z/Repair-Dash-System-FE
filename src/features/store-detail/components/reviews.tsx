import { Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Review } from "../types/store-detail";
import { Input } from "@/components/ui/input";

const reviews: Review[] = [
  {
    id: 1,
    user: {
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    content: "This service was excellent! Highly recommended.",
    rating: 5,
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
    content: "Great experience, very professional service.",
    rating: 4,
  },
  {
    id: 3,
    user: {
      name: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    },
    content: "Good service, would use again.",
    rating: 4,
  },
];

const ReviewList = () => {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
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
                  <Star
                    key={i}
                    className="h-4 w-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600">{review.content}</p>
          </div>
        </div>
      ))}
      <div className="flex p-4 border rounded-lg shadow-sm gap-4">
        <Input
          className="w-full border p-2 rounded"
          placeholder="Nhập đánh giá của bạn..."
        />
        <Button className="h-full bg-primary-royalBlue hover:bg-primary-royalBlue/90">
          Gửi đánh giá
        </Button>
      </div>
    </div>
  );
};

export default ReviewList;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Review } from "../types/review";
import { Input } from "@/components/ui/input";
import ReviewList from "./review-list";

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

const StoreReview = () => {
  const [reviewValue, setReviewValue] = useState("");
  const [listReview, setListReview] = useState<Review[]>(reviews);

  const handleSubmitReview = () => {
    setReviewValue("");
    const review: Review = {
      id: 4,
      user: {
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      },
      content: reviewValue,
      rating: 5,
    };
    setListReview([...listReview, review]);
  };

  return (
    <div className="space-y-6 shadow p-4">
      <ReviewList list={listReview} />
      <div className="flex p-4 border rounded-lg shadow-sm gap-4">
        <Input
          value={reviewValue}
          onChange={(e) => setReviewValue(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Nhập đánh giá của bạn..."
        />
        <Button
          className="h-full bg-primary-royalBlue hover:bg-primary-royalBlue/90"
          onClick={handleSubmitReview}
        >
          Gửi đánh giá
        </Button>
      </div>
    </div>
  );
};

export default StoreReview;

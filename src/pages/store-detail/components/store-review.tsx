import { useState, useEffect } from "react";
import type { Review } from "@/features/store-detail/types/store-detail.type";
import ReviewList from "./review-list";

const REVIEWS: Review[] = [
  {
    id: 1,
    user: {
      name: "Trịnh Quý Thiện",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    content: "Dịch vụ sửa chữa rất tuyệt vời",
    rating: 5,
  },
  {
    id: 2,
    user: {
      name: "Nguyễn Thành Nhân",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
    content: "Chất lượng nhân viên rất tốt",
    rating: 4,
  },
  {
    id: 3,
    user: {
      name: "Nguyễn Nhật Thảo",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    },
    content: "Dịch vụ tạm ổn",
    rating: 4,
  },
  {
    id: 4,
    user: {
      name: "Lưu Văn Trường",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    },
    content: "Tôi không hài lòng về dịch vụ",
    rating: 2,
  },
  {
    id: 5,
    user: {
      name: "Đặng Văn Nhớ",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    },
    content: "Tôi không hài lòng với thái độ nhân viên",
    rating: 1,
  },
];

const StoreReview = () => {
  const [listReview, setListReview] = useState<Review[]>([]);

  useEffect(() => {
    setListReview(REVIEWS);
  }, []);

  return (
    <div className="space-y-6 shadow p-4">
      <ReviewList list={listReview} />
    </div>
  );
};

export default StoreReview;

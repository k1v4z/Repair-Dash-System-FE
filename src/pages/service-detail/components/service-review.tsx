import type { Review } from "@/features/store-detail/types/store-detail.type";
import ReviewItem from "@/components/common/review-item";
import Icons from "@/components/icons";

const REVIEWS: Review[] = [
  {
    id: 1,
    user: {
      name: "Trịnh Quý Thiện",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    content: "Dịch vụ sửa chữa rất tuyệt vời",
    rating: 3.8,
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

const ServiceReview = () => {
  return (
    <div className="mt-10">
      <h4 className="text-xl font-semibold">Đánh giá từ khách hàng</h4>
      {REVIEWS.length === 0 ? (
        <div className="text-center py-8">
          <Icons glyph="message" className="w-12 h-12 mx-auto mb-3" />
          <p className="text-gray-500">Chưa có đánh giá nào</p>
        </div>
      ) : (
        <div className="max-h-[500px] overflow-y-auto space-y-4 mt-6 border rounded shadow p-4">
          {REVIEWS.map((review: Review) => (
            <ReviewItem review={review} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceReview;

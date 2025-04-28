import type { PricingPlan } from "../types/plan-pricing.type";

export const PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Miễn Phí",
    price: "0đ",
    description: "Gói cơ bản cho người bắt đầu",
    features: [
      { text: "Tối đa 20 đơn được hoàn thành", included: true },
      {
        text: "Không được ưu tiên hiển thị trong kết quả tìm kiếm",
        included: false,
      },
      {
        text: "Không có hỗ trợ từ đội ngũ admin (chỉ hỗ trợ qua email, chậm hơn)",
        included: false,
      },
    ],
    buttonText: "Bắt Đầu Miễn Phí",
    type: "FREE",
  },
  {
    id: "monthly",
    name: "Hàng Tháng",
    price: "80.000đ",
    description: "Mở khóa tất cả tính năng cao cấp",
    features: [
      { text: "Tối đa 100 đơn được hoàn thành", included: true },
      {
        text: "Ưu tiên hiển thị trên đầu trang khi khách tìm kiếm dịch vụ",
        included: true,
      },
      { text: "Được đội ngũ admin hỗ trợ trực tiếp", included: true },
    ],
    buttonText: "Nâng Cấp Ngay",
    popular: true,
    type: "MONTHLY",
  },
  {
    id: "yearly",
    name: "Hàng Năm",
    price: "800.000đ",
    description: "Tiết kiệm 2 tháng phí",
    features: [
      { text: "Tối đa 100 đơn được hoàn thành mỗi tháng", included: true },
      {
        text: "Ưu tiên hiển thị trên đầu trang khi khách tìm kiếm dịch vụ",
        included: true,
      },
      { text: "Được đội ngũ admin hỗ trợ trực tiếp", included: true },
    ],
    buttonText: "Nâng Cấp Ngay",
    badge: "10 tháng",
    annualDiscount: "Tiết kiệm 16%",
    type: "YEARLY",
  },
];

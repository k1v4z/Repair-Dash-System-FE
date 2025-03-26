import { OrderStatus } from "@/features/order/types/orders.type";

interface OrderStatusBarProps {
  status: OrderStatus;
}

const getStatusConfig = (status: OrderStatus) => {
  switch (status) {
    case "PENDING":
      return {
        color: "bg-yellow-200 text-yellow-800",
        label: "Chờ xử lý",
        description: "Đơn hàng của bạn đang chờ xử lý từ cửa hàng",
      };
    case "PROCESSING":
      return {
        color: "bg-green-200 text-green-800",
        label: "Đang xử lý",
        description: "Đơn hàng của bạn đang được xử lý",
      };
    case "CANCELED":
      return {
        color: "bg-red-200 text-red-800",
        label: "Đã hủy",
        description: "Đơn hàng đã bị hủy",
      };
    case "COMPLETED":
      return {
        color: "bg-blue-200 text-blue-800",
        label: "Hoàn thành",
        description: "Đơn hàng đã hoàn thành",
      };
    default:
      return {
        color: "bg-gray-200 text-gray-800",
        label: "Không xác định",
        description: "Trạng thái đơn hàng không xác định",
      };
  }
};

export default function OrderStatusBar({ status }: OrderStatusBarProps) {
  const { color, label, description } = getStatusConfig(status);

  return (
    <div className="rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-4">
        <div className={`px-3 py-1 rounded-full font-medium ${color}`}>
          {label}
        </div>
        <div className="text-gray-600">{description}</div>
      </div>
    </div>
  );
}

import type { OrderStatus } from "@/features/order/types/orders.type";
import type { Role } from "@/types/globals.type";

interface OrderStatusBarProps {
  status: OrderStatus;
  role: Role;
}

const getStatusConfig = (status: OrderStatus, role: Role) => {
  switch (status) {
    case "PENDING":
      return {
        color: "bg-yellow-200 text-yellow-800",
        label: "Chờ xử lý",
        description:
          role === "STORE"
            ? "Đơn đặt dịch vụ này đang chờ bạn xác nhận "
            : "Đơn đặt dịch vụ của bạn đang chờ xử lý từ cửa hàng",
      };
    case "PROCESSING":
      return {
        color: "bg-green-200 text-green-800",
        label: "Đang xử lý",
        description:
          role === "STORE"
            ? "Đơn đặt dịch vụ này đang được xử lý"
            : "Đơn đặt dịch vụ của bạn đang được xử lý",
      };
    case "CANCELED":
      return {
        color: "bg-red-200 text-red-800",
        label: "Đã hủy",
        description:
          role === "STORE"
            ? "Đơn đặt dịch vụ này đã bị hủy"
            : "Đơn đặt dịch vụ của bạn đã bị hủy",
      };
    case "COMPLETED":
      return {
        color: "bg-blue-200 text-blue-800",
        label: "Hoàn thành",
        description:
          role === "STORE"
            ? "Đơn đặt dịch vụ này đã hoàn thành"
            : "Đơn đặt dịch vụ của bạn đã hoàn thành",
      };
    default:
      return {
        color: "bg-gray-200 text-gray-800",
        label: "Không xác định",
        description: "Trạng thái đơn đặt dịch vụ không xác định",
      };
  }
};

export default function OrderStatusBar({ status, role }: OrderStatusBarProps) {
  const { color, label, description } = getStatusConfig(status, role);

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

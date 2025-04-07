import type { Order, OrderStatus } from "@/features/order/types/orders.type";
import type { Role } from "@/types/globals.type";
import Icon from "@/components/icons";

interface OrderStatusBarProps {
  status: OrderStatus;
  role: Role;
  order?: Order;
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

export default function OrderStatusBar({
  status,
  role,
  order,
}: OrderStatusBarProps) {
  const { color, label, description } = getStatusConfig(status, role);
  const CANCEL_DESCRIPTION = {
    STORE: order?.customer_cancelled_description,
    CUSTOMER: order?.store_cancelled_description,
  };

  // Determine if the cancellation reason should be shown
  const showCancelReason =
    status === "CANCELED" &&
    order &&
    ((role !== "STORE" && order.store_cancelled_description) ||
      (role === "STORE" && order.customer_cancelled_description));

  // Determine if the completion note should be shown
  const showCompletionNote =
    status === "COMPLETED" && order?.completed_description;

  return (
    <div className="rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <div className={`px-3 py-1 rounded-full font-medium ${color}`}>
            {label}
          </div>
          <div className="text-gray-600">{description}</div>
        </div>
        {showCancelReason && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center mb-2">
              <Icon glyph="warningCircle" className="text-red-600 mr-2" />
              <div className="text-red-700 font-medium">Lý do hủy</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-100 text-gray-700 relative overflow-hidden">
              <div className="relative z-10">
                <span className="font-medium">
                  {role === "STORE" ? "Khách hàng" : "Cửa hàng"}:
                </span>{" "}
                {CANCEL_DESCRIPTION[role as keyof typeof CANCEL_DESCRIPTION]}
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
                <Icon glyph="orderCancel" className="text-red-500" />
              </div>
            </div>
          </div>
        )}
        {showCompletionNote && role === "STORE" && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center mb-2">
              <Icon glyph="checkCircle2" className="text-blue-600 mr-2" />
              <div className="text-blue-700 font-medium">
                Ghi chú hoàn thành
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-gray-700 relative overflow-hidden">
              <div className="relative z-10">
                {order?.completed_description}
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
                <Icon glyph="noteComplete" className="text-blue-500" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import type { Order } from "@/features/order/types/orders.type";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TechnicianInformationProps {
  order: Order;
}

export default function TechnicianInformation({
  order,
}: TechnicianInformationProps) {
  // Find the assigned employee from the list
  const employee = order.service.owner.employees.find(
    (emp) => emp.employee_id === order.employee_id
  );

  return (
    <div className="flex flex-col gap-3 p-6 rounded-lg bg-white shadow-sm">
      <h3 className="text-base font-semibold">Thông tin kỹ thuật viên</h3>
      <div className="text-sm text-gray-600">
        Chi tiết về kỹ thuật viên được phân công xử lý đơn hàng của bạn
      </div>
      {(order.order_status === "PROCESSING" ||
        order.order_status === "COMPLETED") &&
      order.employee_full_name ? (
        <div className="flex flex-col sm:flex-row items-start gap-4 mt-2">
          <Avatar className="size-14 rounded-full border border-gray-200 shrink-0">
            {employee?.employee_avatar_url ? (
              <img
                src={employee.employee_avatar_url}
                alt={order.employee_full_name}
                className="object-cover w-full h-full"
              />
            ) : (
              <AvatarFallback className="text-lg">
                {order.employee_full_name.charAt(0)}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col w-full space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Họ và tên</h3>
              <p className="text-base font-semibold mt-1">
                {order.employee_full_name}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-24 bg-gray-50 rounded-md mt-2">
          <p className="text-gray-500 text-sm">
            Không có kỹ thuật viên nào được phân công
          </p>
        </div>
      )}
    </div>
  );
}

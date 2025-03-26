import { Order } from "@/features/order/types/orders.type";
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
    <div className="flex flex-col gap-2 p-6">
      <h3 className="font-semibold">Thông tin kỹ thuật viên</h3>
      <div className="text-sm text-gray-600">
        Chi tiết về kỹ thuật viên được phân công xử lý đơn hàng của bạn
      </div>
      {order.order_status === "PROCESSING" && order.employee_full_name ? (
        <div className="flex items-start gap-4">
          <Avatar className="size-12 rounded-full border border-gray-200">
            {employee?.employee_avatar_url ? (
              <img
                src={employee.employee_avatar_url}
                alt={order.employee_full_name}
                className="object-cover"
              />
            ) : (
              <AvatarFallback>
                {order.employee_full_name.charAt(0)}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <div className="mb-4">
              <h3 className="font-medium">Họ và tên</h3>
              <p className="text-lg font-semibold">
                {order.employee_full_name}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <h3 className="font-medium">Kinh nghiệm</h3>
                <p className="text-sm text-gray-600">
                  {employee?.employee_id
                    ? "5 năm kinh nghiệm sửa chữa điện lạnh"
                    : "Chưa có thông tin"}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Số điện thoại</h3>
                <p className="text-sm text-blue-600 hover:underline">
                  {order.store_phone_number}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">
            Không có kỹ thuật viên nào được phân công
          </p>
        </div>
      )}
    </div>
  );
}

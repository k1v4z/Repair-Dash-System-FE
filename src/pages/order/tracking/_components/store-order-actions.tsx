import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useOrder } from "@/features/order/hooks/useOrder";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "react-toastify";
import {
  storeUpdateOrderSchema,
  type StoreOrderUpdateData,
} from "@/schemas/order";
import { zodResolver } from "@hookform/resolvers/zod";

import { SUCCESS_MESSAGES } from "@/features/order/constants/order-message";
import SelectField from "@/components/common/select-field";

import type { EmployeeOption as EmployeeOptionItem } from "@/features/order/types/orders.type";
import type {
  Order,
  UpdateOrderRequest,
} from "@/features/order/types/orders.type";

import EmployeeOption from "./employee-options";

interface StoreOrderActionsProps {
  order: Order;
  onOrderUpdated: (order: Order | null) => void;
}

export default function StoreOrderActions({
  order,
  onOrderUpdated,
}: StoreOrderActionsProps) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { updateOrder, isLoading } = useOrder();

  const storeUpdateForm = useForm<StoreOrderUpdateData>({
    resolver: zodResolver(storeUpdateOrderSchema),
    defaultValues: {
      order_description: "",
      employee_id: order.employee_id || undefined,
      order_status:
        order.order_status === "PENDING" ? "PROCESSING" : "COMPLETED",
    },
  });

  const employeeOptions: EmployeeOptionItem[] = useMemo(() => {
    return order.service.owner.employees.map((employee) => ({
      value: employee.employee_id.toString(),
      label: employee.employee_full_name,
      avatar: employee.employee_avatar_url || "",
    }));
  }, [order.service.owner.employees]);

  // Don't show any actions for completed or canceled orders
  if (order.order_status === "COMPLETED" || order.order_status === "CANCELED") {
    return null;
  }

  const handlePendingSubmit = async (data: StoreOrderUpdateData) => {
    try {
      const updateData: UpdateOrderRequest = {
        order_status: "PROCESSING",
        order_description: data.order_description,
        employee_id: data.employee_id,
      };

      const updatedOrder = await updateOrder(
        order.order_id.toString(),
        updateData
      );

      if (updatedOrder) {
        toast.success(SUCCESS_MESSAGES["PROCESSING"]);
        onOrderUpdated(updatedOrder);
      }
    } catch {
      toast.error("Có lỗi xảy ra khi cập nhật đơn đặt dịch vụ!");
    }
  };

  const handleCancelOrder = async (reason?: string) => {
    try {
      const updatedOrder = await updateOrder(order.order_id.toString(), {
        order_status: "CANCELED",
        order_description: reason,
      });

      if (updatedOrder) {
        toast.success(SUCCESS_MESSAGES["CANCELED"]);
        onOrderUpdated(updatedOrder);
        setIsConfirmModalOpen(false);
      }
    } catch {
      toast.error("Có lỗi xảy ra khi hủy đơn đặt dịch vụ!");
    }
  };

  const handleProcessingSubmit = async (data: StoreOrderUpdateData) => {
    try {
      const updateData: UpdateOrderRequest = {
        order_status: "COMPLETED",
        order_description: data.order_description,
      };

      const updatedOrder = await updateOrder(
        order.order_id.toString(),
        updateData
      );

      if (updatedOrder) {
        toast.success(SUCCESS_MESSAGES["COMPLETED"]);
        onOrderUpdated(updatedOrder);
      }
    } catch {
      toast.error("Có lỗi xảy ra khi cập nhật đơn đặt dịch vụ!");
    }
  };

  const handleEmployeeSelect = (employeeId: number) => {
    storeUpdateForm.setValue("employee_id", employeeId);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Cập nhật trạng thái đơn hàng</CardTitle>
      </CardHeader>
      <CardContent>
        {order.order_status === "PENDING" && (
          <form
            className="space-y-4"
            onSubmit={storeUpdateForm.handleSubmit(handlePendingSubmit)}
          >
            {employeeOptions.length > 0 ? (
              <SelectField
                options={employeeOptions}
                placeholder="Chọn nhân viên phụ trách"
                value={storeUpdateForm.watch("employee_id")?.toString()}
                helperText={
                  storeUpdateForm.formState.errors.employee_id?.message
                }
                onValueChange={(value) => handleEmployeeSelect(parseInt(value))}
                renderOption={(option) => {
                  if (typeof option === "string") {
                    return option;
                  }
                  const employee = option as EmployeeOptionItem;
                  return <EmployeeOption option={employee} />;
                }}
              />
            ) : (
              <p className="text-gray-600 font-normal">
                Tạm thời không có nhân viên
              </p>
            )}
            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                disabled={isLoading || employeeOptions.length === 0}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Chuyển sang xử lý
              </Button>
              <Button
                type="button"
                disabled={isLoading}
                onClick={() => setIsConfirmModalOpen(true)}
                variant="outline"
                className="border-red-500 text-red-600 hover:bg-red-50"
              >
                Hủy đơn hàng
              </Button>
            </div>
          </form>
        )}
        {order.order_status === "PROCESSING" && (
          <form
            className="space-y-4"
            onSubmit={storeUpdateForm.handleSubmit(handleProcessingSubmit)}
          >
            <div className="grid gap-2">
              <Label htmlFor="order_description">Ghi chú</Label>
              <Textarea
                id="order_description"
                placeholder="Nhập ghi chú về đơn hàng"
                {...storeUpdateForm.register("order_description")}
              />
            </div>
            <div className="flex gap-3 mt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                Đánh dấu hoàn thành
              </Button>
              <Button
                type="button"
                disabled={isLoading}
                variant="outline"
                onClick={() => {
                  setIsConfirmModalOpen(true);
                }}
                className="border-red-500 text-red-600 hover:bg-red-50"
              >
                Hủy đơn hàng
              </Button>
            </div>
          </form>
        )}
      </CardContent>
      <ConfirmDialog
        open={isConfirmModalOpen}
        isLoading={isLoading}
        onOpenChange={setIsConfirmModalOpen}
        title="Xác nhận huỷ đơn đặt dịch vụ"
        description="Vui lòng nhập lý do hủy đơn hàng này."
        onConfirm={handleCancelOrder}
        reasonRequired
        reasonLabel="Lý do hủy đơn"
      />
    </Card>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { Order, OrderStatus } from "@/features/order/types/orders.type";
import { toast } from "react-toastify";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { useOrder } from "@/features/order/hooks/useOrder";
import routePath from "@/config/route";

interface OrderActionsProps {
  orderId: number;
  status: OrderStatus;
  onOrderUpdated: (order: Order | null) => void;
}

export default function OrderActions({
  orderId,
  status,
  onOrderUpdated,
}: OrderActionsProps) {
  const navigate = useNavigate();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const { updateOrder, isLoading } = useOrder();

  const handleCancelOrder = async () => {
    try {
      const updatedOrder = await updateOrder(orderId.toString(), {
        order_status: "CANCELED",
      });
      toast.success("Đơn hàng đã được hủy thành công");
      setIsCancelModalOpen(false);
      onOrderUpdated(updatedOrder);
    } catch {
      toast.error("Có lỗi xảy ra khi hủy đặt dịch vụ");
    }
  };

  const handleBack = () => {
    navigate(routePath.home);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {status === "PENDING" && (
        <Button
          onClick={() => setIsCancelModalOpen(true)}
          variant="outline"
          className="border-red-500 text-red-600 hover:bg-red-50"
          disabled={isLoading}
        >
          Hủy đơn
        </Button>
      )}
      <Button onClick={handleBack} variant="outline">
        Quay lại
      </Button>
      <ConfirmDialog
        open={isCancelModalOpen}
        onOpenChange={setIsCancelModalOpen}
        title="Xác nhận hủy đặt dịch vụ"
        description="Bạn có chắc chắn muốn hủy đặt dịch vụ này không?"
        onConfirm={handleCancelOrder}
      />
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import ORDER_DIALOG_MESSAGE from "@/features/order/constants/order-dialog-message";
import { useOrder } from "@/features/order/hooks/useOrder";
import routePath from "@/config/route";

import { toast } from "react-toastify";

import type { Order, OrderStatus } from "@/features/order/types/orders.type";
import type { DialogContent } from "@/types/globals.type";
import FeedbackOrder from "./feedback-order";
import type { FeedbackFormData } from "@/schemas/order";

interface OrderActionsProps {
  orderId: number;
  status: OrderStatus;
  isFeedback: boolean;
  onOrderUpdated: (order: Order | null) => void;
}

export default function OrderActions({
  orderId,
  status,
  isFeedback,
  onOrderUpdated,
}: OrderActionsProps) {
  const navigate = useNavigate();
  const [dialogActions, setDialogActions] = useState<DialogContent | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const { updateOrder, isLoading } = useOrder();
  
  const handleCancelOrder = async (reason?: string) => {
    try {
      const updatedOrder = await updateOrder(orderId.toString(), {
        order_status: "CANCELED",
        order_description: reason,
      });
      toast.success("Đơn hàng đã được hủy thành công");
      setDialogActions(null);
      onOrderUpdated(updatedOrder);
    } catch {
      toast.error("Có lỗi xảy ra khi hủy đặt dịch vụ");
    }
  };

  const handleCompleteOrder = async () => {
    try {
      const updatedOrder = await updateOrder(orderId.toString(), {
        order_status: "COMPLETED",
      });
      toast.success("Đơn hàng đã được đánh dấu hoàn thành thành công");
      setDialogActions(null);
      onOrderUpdated(updatedOrder);
      setShowFeedback(true);
    } catch {
      toast.error("Có lỗi xảy ra khi đánh dấu hoàn thành đơn hàng");
    }
  };

  const handleFeedbackSubmit = async (data: FeedbackFormData) => {
    try {
      await updateOrder(orderId.toString(), {
        order_feedback: data.content,
        order_rating: data.rating,
      });
      toast.success("Cảm ơn bạn đã gửi đánh giá!");
      setShowFeedback(false);
    } catch {
      toast.error("Có lỗi xảy ra khi gửi đánh giá");
    }
  };

  const handleConfirmDialog = (status: string) => {
    setDialogActions({
      isOpen: true,
      title:
        ORDER_DIALOG_MESSAGE[status as keyof typeof ORDER_DIALOG_MESSAGE].title,
      description:
        ORDER_DIALOG_MESSAGE[status as keyof typeof ORDER_DIALOG_MESSAGE]
          .description,
      onConfirm:
        status === "PROCESSING" ? handleCompleteOrder : handleCancelOrder,
      reasonRequired: status === "PENDING",
      reasonLabel: "Lý do hủy đơn",
    });
  };

  const handleBack = () => {
    navigate(routePath.home);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {status === "PENDING" && (
        <Button
          onClick={() => handleConfirmDialog("PENDING")}
          variant="outline"
          className="border-red-500 text-red-600 hover:bg-red-50"
          disabled={isLoading}
        >
          Hủy đơn
        </Button>
      )}
      {status === "PROCESSING" && (
        <Button
          onClick={() => handleConfirmDialog("PROCESSING")}
          variant="outline"
          className="border-green-500 text-green-600 hover:bg-green-50"
          disabled={isLoading}
        >
          Xác nhận đã hoàn thành
        </Button>
      )}
      {status === "COMPLETED" && !isFeedback && (
        <Button
          onClick={() => setShowFeedback(true)}
          variant="outline"
          className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
          disabled={isLoading}
        >
          Đánh giá dịch vụ
        </Button>
      )}
      <Button onClick={handleBack} variant="outline">
        Quay lại
      </Button>
      <ConfirmDialog
        open={dialogActions?.isOpen ?? false}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setDialogActions(null);
          }
        }}
        isLoading={isLoading}
        title={dialogActions?.title ?? ""}
        description={dialogActions?.description ?? ""}
        onConfirm={dialogActions?.onConfirm || (() => {})}
        reasonRequired={dialogActions?.reasonRequired ?? false}
        reasonLabel={dialogActions?.reasonLabel ?? "Lý do"}
      />
      <FeedbackOrder
        orderId={orderId}
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        onFeedbackSubmit={handleFeedbackSubmit}
      />
    </div>
  );
}

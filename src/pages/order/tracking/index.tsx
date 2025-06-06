import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderStatusBar from "./_components/order-status-bar";
import CustomerInformation from "./_components/customer-information";
import ServiceInformation from "./_components/service-information";
import OrderActions from "./_components/order-actions";
import StoreOrderActions from "./_components/store-order-actions";
import ResourceNotFound from "@/components/common/resource-not-found";
import OrderSkeleton from "./_components/order-skeleton";
import { ChatBubble } from "@/pages/order/tracking/_components/chat-bubble";
import { useOrder } from "@/features/order/hooks/useOrder";
import { useAuthStore } from "@/stores/auth";
import type { Role } from "@/types/globals.type";
import type { Order } from "@/features/order/types/orders.type";

export default function OrderTracking() {
  const { orderId } = useParams<{ orderId: string }>();
  const { isLoading, error, getOrder } = useOrder();
  const [order, setOrder] = useState<Order | null>(null);
  const { user } = useAuthStore();
  const isCustomer = user?.user_id == order?.customer_id;

  const fetchOrder = async () => {
    const order = await getOrder(orderId as string);
    setOrder(order);
  };

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const onUpdateOrder = async (order: Order | null) => {
    setOrder(order);
  };

  if (isLoading && !order) {
    return <OrderSkeleton />;
  }

  if (error || !order) {
    return (
      <ResourceNotFound
        title="Không tìm thấy đơn hàng"
        description="Đơn hàng bạn đang tìm kiếm không tồn tại hoặc đã bị xóa."
        buttonText="Quay lại trang chủ"
      />
    );
  }

  const chatRecipientName = isCustomer
    ? order.store_name || "Cửa hàng"
    : order.customer_full_name;

  // Check if RTC session ID exists, otherwise fallback to order ID
  const chatSessionId = order.order_rtc_session_id || order.order_id.toString();

  return (
    <div className="container mx-auto px-4 py-6 relative">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          Chi tiết đơn đặt dịch vụ #{order.order_id}
        </h1>
        <OrderStatusBar
          status={order.order_status}
          role={user?.role as Role}
          order={order}
        />
      </div>
      {isCustomer ? (
        <div className="mb-6">
          <OrderActions
            orderId={order.order_id}
            status={order.order_status}
            isFeedback={order.order_rating !== null}
            onOrderUpdated={onUpdateOrder}
            fetchOrder={fetchOrder}
          />
        </div>
      ) : (
        <StoreOrderActions order={order} onOrderUpdated={onUpdateOrder} />
      )}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <CustomerInformation order={order} onOrderUpdated={onUpdateOrder} />
        <ServiceInformation order={order} />
      </div>
      <ChatBubble sessionId={chatSessionId} recipientName={chatRecipientName} />
    </div>
  );
}

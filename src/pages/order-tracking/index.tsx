import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderStatusBar from "./components/order-status-bar";
import CustomerInformation from "./components/customer-information";
import ServiceInformation from "./components/service-information";
import OrderActions from "./components/order-actions";
import ResourceNotFound from "@/components/common/resource-not-found";
import OrderSkeleton from "./components/order-skeleton";
import type { Order } from "@/features/order/types/orders.type";
import { useOrder } from "@/features/order/hooks/useOrder";

export default function OrderTracking() {
  const { orderId } = useParams<{ orderId: string }>();
  const { isLoading, error, getOrder } = useOrder();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const order = await getOrder(orderId as string);
      setOrder(order);
    };
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const onUpdateOrder = useCallback(async (order: Order | null) => {
    setOrder(order);
  }, []);

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

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          Chi tiết đơn đặt dịch vụ #{order.order_id}
        </h1>
        <OrderStatusBar status={order.order_status} />
      </div>
      <div className="mb-6">
        <OrderActions
          orderId={order.order_id}
          status={order.order_status}
          onOrderUpdated={onUpdateOrder}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <CustomerInformation order={order} onOrderUpdated={onUpdateOrder} />
        <ServiceInformation order={order} />
      </div>
    </div>
  );
}

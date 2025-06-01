import type { Order } from "../types/orders.type";
import { useCallback, useEffect, useState } from "react";
import { orderServices } from "../service/order.service";

export function useOrderByOwner() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [stats, setStats] = useState({
    total_orders: 0,
    total_completed_orders: 0,
    total_processing_orders: 0,
    total_pending_orders: 0,
    total_canceled_orders: 0,
    completion_rate: 0,
  });

  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await orderServices.getOrderByOwner();
      setOrders(response);
      
      // Calculate stats
      const total = response.length;
      const completed = response.filter((order) => order.order_status === "COMPLETED").length;
      const processing = response.filter((order) => order.order_status === "PROCESSING").length;
      const pending = response.filter((order) => order.order_status === "PENDING").length;
      const canceled = response.filter((order) => order.order_status === "CANCELED").length;
      
      setStats({
        total_orders: total,
        total_completed_orders: completed,
        total_processing_orders: processing,
        total_pending_orders: pending,
        total_canceled_orders: canceled,
        completion_rate: total > 0 ? (completed / total) * 100 : 0,
      });
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const refreshOrders = useCallback(() => {
    return fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    isLoading,
    error,
    stats,
    refreshOrders,
  };
} 
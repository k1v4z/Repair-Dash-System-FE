import { useState } from "react";
import { orderServices } from "../service/order.service";
import type { UpdateOrderRequest } from "../types/orders.type";
import type { OrderFormData } from "@/schemas/order";

export const useOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (data: OrderFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await orderServices.createOrder(data);
      return response;
    } catch {
      setError("Error creating order");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getOrder = async (orderId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const orderData = await orderServices.getOrder(orderId);
      return orderData;
    } catch {
      setError("Error fetching order details");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrder = async (orderId: string, data: UpdateOrderRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      await orderServices.updateOrder(orderId, data);
      // Refresh order data after update
      const updatedOrder = await getOrder(orderId);
      return updatedOrder;
    } catch {
      setError("Error updating order");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createOrder,
    getOrder,
    updateOrder,
  };
};

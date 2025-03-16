import { useState } from "react";
import { orderServices } from "../service/order.service";
import type { OrderFormData } from "@/schemas/order";
import type { CreateOrderResponse } from "../types/orders.type";

export const useOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (formData: OrderFormData): Promise<CreateOrderResponse | undefined> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await orderServices.createOrder(formData);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create order");
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createOrder,
    isLoading,
    error,
  };
};

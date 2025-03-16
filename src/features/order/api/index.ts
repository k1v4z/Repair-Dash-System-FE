import { axiosInstance } from "@/config/axios";
import type { CheckoutResponse } from "../types/orders.type";

const ORDER_ENDPOINTS = {
  CHECKOUT: "/orders/services/",
};

export const orderApi = {
  checkout: async (serviceId: string): Promise<CheckoutResponse> => {
    try {
      const response = await axiosInstance.get(
        `${ORDER_ENDPOINTS.CHECKOUT}${serviceId}`
      );

      return { ...response.data, status: response.status };
    } catch (error) {
      console.error("Order error");
      throw error;
    }
  },
};

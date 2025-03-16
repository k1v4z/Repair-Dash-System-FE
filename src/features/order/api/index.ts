import { axiosInstance } from "@/config/axios";
import type { CheckoutResponse, CreateOrderRequest, CreateOrderResponse } from "../types/orders.type";

const ORDER_ENDPOINTS = {
  CHECKOUT: "/orders/services/",
  CREATE: "/orders",
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

  createOrder: async (data: CreateOrderRequest): Promise<CreateOrderResponse> => {
    try {
      const response = await axiosInstance.post(ORDER_ENDPOINTS.CREATE, data);
      return { message: response.data.message, status: response.status };
    } catch (error) {
      console.error("Create order error");
      throw error;
    }
  },
};

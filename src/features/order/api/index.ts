import { axiosInstance } from "@/config/axios";
import type {
  CheckoutResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  Order,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from "../types/orders.type";

const ORDER_ENDPOINTS = {
  CHECKOUT: "/orders/services/",
  CREATE: "/orders",
  GET_ORDER: "/orders/",
  UPDATE_ORDER: "/orders/",
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

  createOrder: async (
    data: CreateOrderRequest
  ): Promise<CreateOrderResponse> => {
    try {
      const response = await axiosInstance.post(ORDER_ENDPOINTS.CREATE, data);
      return {
        message: response.data.message,
        order_id: response.data.order_id,
      };
    } catch (error) {
      console.error("Create order error");
      throw error;
    }
  },

  getOrder: async (orderId: string): Promise<Order> => {
    try {
      const response = await axiosInstance.get(
        `${ORDER_ENDPOINTS.GET_ORDER}${orderId}`
      );
      return response.data;
    } catch (error) {
      console.error("Get order error");
      throw error;
    }
  },

  updateOrder: async (
    orderId: string,
    data: UpdateOrderRequest
  ): Promise<UpdateOrderResponse> => {
    try {
      const response = await axiosInstance.put(
        `${ORDER_ENDPOINTS.UPDATE_ORDER}${orderId}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Update order error");
      throw error;
    }
  },
};

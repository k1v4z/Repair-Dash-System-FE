import { convertMultipleToBase64 } from "@/utils/file";
import { orderApi } from "../api";
import type {
  CheckoutResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  Order,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from "../types/orders.type";
import type { OrderFormData } from "@/schemas/order";

export const orderServices = {
  async checkout(serviceId: string): Promise<CheckoutResponse> {
    const response = await orderApi.checkout(serviceId);
    return response;
  },

  async createOrder(formData: OrderFormData): Promise<CreateOrderResponse> {
    const fullAddress = `${formData.user_street}, ${formData.user_ward}, ${formData.user_district}, ${formData.user_city}`;
    const orderData: CreateOrderRequest = {
      service_id: formData.service_id!,
      order_description: formData.order_description || "",
      customer_full_name: formData.customer_full_name,
      customer_phone_number: formData.customer_phone_number,
      customer_address: fullAddress,
      order_images: await convertMultipleToBase64(
        formData.order_images as File[]
      ),
    };

    const response = await orderApi.createOrder(orderData);
    return response;
  },

  async getOrder(orderId: string): Promise<Order> {
    const response = await orderApi.getOrder(orderId);
    return response.order;
  },

  async updateOrder(
    orderId: string,
    data: UpdateOrderRequest
  ): Promise<UpdateOrderResponse> {
    if (data.order_images?.length && data.order_images.length > 0) {
      data.order_images = await convertMultipleToBase64(
        data.order_images as File[]
      );
    }

    const response = await orderApi.updateOrder(orderId, data);
    return response;
  },
};

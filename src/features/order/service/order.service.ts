import { orderApi } from "../api";
import type { CheckoutResponse } from "../types/orders.type";

export const orderServices = {
  async checkout(serviceId: string): Promise<CheckoutResponse> {
    const response = await orderApi.checkout(serviceId);
    return response;
  },  
};

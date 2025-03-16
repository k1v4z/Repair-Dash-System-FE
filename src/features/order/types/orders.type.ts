import type { Service, UserAddress } from "@/types/service";
import type { AxiosResponse } from "@/types/globals.type";

export type CheckoutResponse = {
  checkout: {
    customer: UserAddress;
    service: Service;
  };
  status: number;
};

export type CreateOrderRequest = {
  service_id: number;
  order_description: string;
  customer_full_name: string;
  customer_phone_number: string;
  customer_address: string;
};

export type CreateOrderResponse = AxiosResponse;

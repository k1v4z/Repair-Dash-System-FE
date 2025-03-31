import type { Service, UserAddress } from "@/types/service";
import type { Option } from "@/types/globals.type";

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
  order_images: (string | File)[];
};

export type CreateOrderResponse = {
  message: string;
  order_id: number;
};

export type OrderStatus = "PENDING" | "PROCESSING" | "CANCELED" | "COMPLETED";

export type Employee = {
  employee_id: number;
  employee_full_name: string;
  employee_avatar_url: string | null;
  owner_id: number;
  createdAt: string;
  updatedAt: string;
};

export type EmployeeOption = Option & {
  avatar: string;
};

export type Owner = {
  user_id: number;
  user_full_name: string;
  user_avatar_url: string;
  employees: Employee[];
};

export type OrderService = {
  service_id: number;
  service_name: string;
  service_description: string;
  owner: Owner;
};

export type OrderCustomer = {
  user_id: number;
  user_full_name: string;
  user_avatar_url: string;
};

export type Order = {
  order_id: number;
  order_description: string;
  order_images_url: string[];
  order_status: OrderStatus;
  order_feedback: string | null;
  order_rating: number | null;
  service_name: string;
  service_description: string;
  store_full_name: string;
  store_address: string;
  store_phone_number: string;
  employee_full_name: string;
  customer_full_name: string;
  customer_phone_number: string;
  customer_address: string;
  service_id: number;
  employee_id: number;
  customer_id: number;
  createdAt: string;
  updatedAt: string;
  service: OrderService;
  customer: OrderCustomer;
};

export type GetOrderResponse = {
  order: Order;
};

export type UpdateOrderRequest = {
  customer_full_name?: string;
  customer_phone_number?: string;
  customer_address?: string;
  order_description?: string;
  order_status?: OrderStatus;
  employee_id?: number;
  order_feedback?: string;
  order_rating?: number;
  order_images?: File[] | string[];
};

export type UpdateOrderResponse = {
  message: string;
};

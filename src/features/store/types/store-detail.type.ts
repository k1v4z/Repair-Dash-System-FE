import type { UserAddress } from "@/types/service";

export type Review = {
  customer_full_name: string;
  order_feedback: string;
  order_rating: number;
};

export type Service = {
  service_id: number;
  service_name: string;
  service_alias: string;
  service_description: string;
  service_image_url: string;
  total_reviews: number;
  average_rating: number;
  favorite_id: null | -1 | number;
  owner_id: number;
  owner: UserAddress;
};

export type ServiceResponse = {
  services: Service[];
  status: number;
};

export type StoreDetailResponse = {
  store: UserAddress;
  status: number;
};

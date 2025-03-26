import type { UserInfo, Employee } from "./human";

export interface UserAddress extends UserInfo {
  user_street: string;
  user_ward: string;
  user_district: string;
  user_city: string;
}

export interface ServiceOwner extends UserAddress {
  user_id: number;
  user_full_name: string;
  authentication_id: number;
  createdAt: string;
  updatedAt: string;
  employees: Employee[];
}

export interface Service {
  service_id: number;
  service_name: string;
  service_image_url: string;
  service_description: string;
  owner_id: number;
  createdAt: string;
  updatedAt: string;
  owner: ServiceOwner;
}

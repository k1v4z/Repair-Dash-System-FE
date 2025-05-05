import { SubscriptionPlan } from "@/features/user/types/user.types";

export interface Authentication {
  authentication_id: number;
  identifier_email: string;
  password: string;
  role: string;
}

export interface User {
  user_id: number;
  user_full_name: string;
  user_avatar_url: string | null;
  user_alias: string;
  user_description: string | null;
  user_phone_number: string;
  user_street: string;
  user_ward: string;
  user_district: string;
  user_city: string;
  user_priority: SubscriptionPlan;
  delete_flag: boolean;
  authentication_id: number;
  authentication: Authentication;
  is_locked: boolean;
}

export type ManageUserResponse = {
  total_users: number;
  total_store_users: number;
  total_customer_users: number;
  total_admin_users: number;
  users: User[];
  total_page: number;
  current_page: number;
};

export interface AddUserInput {
  identifier_email: string;
  password: string;
  role: "STORE" | "CUSTOMER" | "ADMIN";
  user_full_name: string;
  user_phone_number: string;
  user_street: string;
  user_ward: string;
  user_district: string;
  user_city: string;
}

export interface AddUserResponse {
  user_id: number;
  status: number;
  code?: string;
}

export interface DeleteUserResponse {
  status: number;
  code?: string;
}

export type Statistics = {
  total_users: number;
  total_store_users: number;
  total_customer_users: number;
  total_admin_users: number;
};

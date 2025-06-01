import type { Role } from "@/types/globals.type";

export interface ProfileApiResponse {
  message: string;
  profile: ProfileResponse;
}

export interface ProfileResponse {
  user_id: number;
  user_full_name: string;
  user_avatar_url: string;
  user_avatar?: string;
  user_description: string | null;
  user_phone_number: string;
  user_street: string;
  user_ward: string;
  user_district: string;
  user_city: string;
  user_priority: number;
  delete_flag: boolean;
  authentication_id: number;
  created_at: string;
  updated_at: string;
  payments: {
    payment_id: number | null;
    transaction_id: string | null;
    payment_description: string | null;
    payment_type: string | null;
    payment_status: string | null;
    user_full_name: string | null;
    payment_amount: number | null;
    delete_flag: boolean | null;
    user_id: number | null;
    created_at: string | null;
    updated_at: string | null;
  };
  services?: Array<{
    service_name: string;
    service_description: string;
    service_image_url: string;
  }>;
  authentication?: {
    role: Role;
    identifier_email: string;
  };
}

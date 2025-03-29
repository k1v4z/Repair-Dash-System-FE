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
  delete_flag: boolean;
  authentication_id: number;
  createdAt: string;
  updatedAt: string;
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
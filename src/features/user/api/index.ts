import { axiosInstance } from "@/config/axios";
import type {
  ProfileApiResponse,
  ProfileResponse,
} from "@/features/user/types/profile.type";

const PROFILE_ENDPOINTS = {
  GET: "/profile",
  UPDATE: "/profile",
};

export const profileApi = {
  getProfile: async (): Promise<ProfileResponse> => {
    const response = await axiosInstance.get<ProfileApiResponse>(
      PROFILE_ENDPOINTS.GET
    );
    return response.data.profile;
  },

  updateProfile: async (
    data: Partial<ProfileResponse>
  ): Promise<ProfileResponse> => {
    try {
      const response = await axiosInstance.put<{
        message: string;
        result: ProfileResponse;
      }>(PROFILE_ENDPOINTS.UPDATE, data);
      return response.data.result;
    } catch (error) {
      console.error("Update Profile Error:", error);
      throw error;
    }
  },
};

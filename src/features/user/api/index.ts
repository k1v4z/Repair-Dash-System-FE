import { axiosInstance } from "@/config/axios";
import type {
  ProfileApiResponse,
  ProfileResponse,
} from "@/features/user/types/profile.type";
import type { FeedbackPayload, FeedbackResponse } from "../types/feedback.type";

const PROFILE_ENDPOINTS = {
  GET: "/profile",
  UPDATE: "/profile",
};
const FEEDBACK_ENDPOINTS = {
  CREATE: "/report",
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

export const feedbackApi = {
  createFeedback: async (data: FeedbackPayload): Promise<FeedbackResponse> => {
    const response = await axiosInstance.post(FEEDBACK_ENDPOINTS.CREATE, data);
    return response.data;
  },
};
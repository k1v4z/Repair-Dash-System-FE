import { profileApi } from "@/features/user/profile/api";
import type { ProfileResponse } from "../types/profile.type";

export const profileService = {
  getProfile: async (): Promise<ProfileResponse> => {
    const profile = await profileApi.getProfile();
    return profile;
  },
  updateProfile: async (data: Partial<ProfileResponse>): Promise<ProfileResponse> => {
    const profile = await profileApi.updateProfile(data);
    return profile;
  },
};

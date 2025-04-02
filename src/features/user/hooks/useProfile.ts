import { useState, useEffect } from "react";
import { profileService } from "@/features/user/service/profile.service";
import type { ProfileResponse } from "@/features/user/types/profile.type";
import { toast } from "react-toastify";

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await profileService.getProfile();
      setProfile(response);
    } catch {
      setError("Không thể tải thông tin profile");
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (
    data: Partial<ProfileResponse>,
    showToast = true
  ) => {
    try {
      const updatedProfile = await profileService.updateProfile(data);
      setProfile((prev) => ({
        ...prev!,
        ...updatedProfile,
      }));
      if (showToast) {
        toast.success("Cập nhật thông tin thành công!");
      }
      return updatedProfile;
    } catch {
      toast.error("Có lỗi xảy ra khi cập nhật thông tin!");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    isLoading,
    error,
    updateProfile,
    setProfile,
  };
};

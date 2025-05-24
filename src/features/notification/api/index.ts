import { axiosInstance } from "@/config/axios";
import type { NotificationResponse } from "../types/notification.type";

const NOTIFICATION_ENDPOINTS = {
  GET_NOTIFICATIONS: "/notifications",
};

export const notificationApi = {
  getNotifications: async (): Promise<NotificationResponse> => {
    try {
      const response = await axiosInstance.get(
        NOTIFICATION_ENDPOINTS.GET_NOTIFICATIONS
      );
      return { notifications: response.data.notifications };
    } catch (error) {
      console.error("Get notifications error");
      throw error;
    }
  },
};

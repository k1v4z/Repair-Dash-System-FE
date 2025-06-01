import type { NotificationResponse } from "../types/notification.type";
import { notificationApi } from "../api/index";

export const notificationServices = {
  getNotifications: async (): Promise<NotificationResponse> => {
    const response = await notificationApi.getNotifications();
    return response;
  },
};

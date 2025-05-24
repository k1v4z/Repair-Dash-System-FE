import { useState, useEffect } from "react";
import { notificationServices } from "../services/notification";
import type { Notification } from "../types/notification.type";

const STORAGE_KEY = "read_notifications";

const useNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const getReadNotifications = (): string[] => {
    const read = localStorage.getItem(STORAGE_KEY);
    return read ? JSON.parse(read) : [];
  };

  const generateNotificationId = (notification: Notification): string => {
    return `${notification.time}_${notification.content}`;
  };

  const markAsRead = (notification: Notification) => {
    const readNotifications = getReadNotifications();
    const notificationId = generateNotificationId(notification);

    if (!readNotifications.includes(notificationId)) {
      const updatedRead = [...readNotifications, notificationId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRead));
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }
  };

  const isRead = (notification: Notification): boolean => {
    const readNotifications = getReadNotifications();
    const notificationId = generateNotificationId(notification);
    return readNotifications.includes(notificationId);
  };

  const fetchNotifications = async () => {
    try {
      const response = await notificationServices.getNotifications();
      setNotifications(response.notifications);

      const readNotifications = getReadNotifications();
      const unread = response.notifications.filter(
        (notification) =>
          !readNotifications.includes(generateNotificationId(notification))
      ).length;
      setUnreadCount(unread);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setNotifications([]);
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const intervalId = setInterval(() => {
      fetchNotifications();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return {
    notifications,
    unreadCount,
    markAsRead,
    isRead,
  };
};

export default useNotification;

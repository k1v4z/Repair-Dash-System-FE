import { formatDistanceStrict } from "date-fns";
import { vi } from "date-fns/locale";
import type { Notification } from "@/features/notification/types/notification.type";
import Icon from "@/components/icons";
import useNotification from "@/features/notification/hooks/useNotification";

export const NotificationItem = ({
  notification,
}: {
  notification: Notification;
}) => {

  const { markAsRead, isRead } = useNotification();

  const handleClick = () => {
    if (notification.link && notification.link !== "undefined") {
      const targetPath = `/booking-detail/${notification.link}`;
      markAsRead(notification);
      window.location.href = targetPath;
    }
  };

  const formatTime = (date: number) => {
    const distance = formatDistanceStrict(new Date(date), new Date(), {
      locale: vi,
      addSuffix: true,
    });
    return distance.replace("dưới ", "");
  };

  const renderIcon = () => {
    switch (notification.type) {
      case "ORDER_CREATED":
        return (
          <Icon glyph="clipboard" className="size-5 text-blue-500 mt-[5px]" />
        );
      case "ORDER_CANCELED":
      case "ORDER_AUTO_CANCELED":
        return (
          <Icon glyph="clipboardX" className="size-5 text-red-500 mt-[5px]" />
        );
      case "ORDER_COMPLETED":
        return (
          <Icon
            glyph="clipboardCheck"
            className="size-5 text-green-500 mt-[5px]"
          />
        );
      case "ORDER_FEEDBACK":
        return (
          <Icon
            glyph="messageSquare"
            className="size-5 text-purple-500 mt-[5px]"
          />
        );
      case "ORDER_UPDATED_INFO":
        return (
          <Icon
            glyph="clipboardPen"
            className="size-5 text-yellow-500 mt-[5px]"
          />
        );
      case "ORDER_UPDATED_PROCESSING":
        return (
          <Icon glyph="clock" className="size-5 text-orange-500 mt-[5px]" />
        );
      default:
        return <Icon glyph="bell" className="size-5 text-gray-500 mt-[5px]" />;
    }
  };

  return (
    <div
      className="flex items-start gap-3 p-3 hover:bg-gray-50 cursor-pointer relative"
      onClick={handleClick}
    >
      {renderIcon()}
      <div className="flex-1 space-y-1 pr-5">
        <p className="text-sm text-gray-900">{notification.content}</p>
        <p className="text-xs text-gray-500">{formatTime(notification.time)}</p>
      </div>
      {!isRead(notification) && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500" />
      )}
    </div>
  );
};

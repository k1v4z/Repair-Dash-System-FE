import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Message } from "@/features/order/types/chat.type";
import { getRelativeTime } from "@/utils/datetime";

interface MessageBubbleProps {
  message: Message;
  showAvatar?: boolean;
}

export const ChatMessageBubble = ({
  message,
  showAvatar = true,
}: MessageBubbleProps) => {
  const { is_sender, message: text, timestamp } = message;
  const formattedTime = getRelativeTime(timestamp);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex items-end gap-2 mb-2",
        is_sender ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* {!is_sender && showAvatar && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <Icon glyph="avatarDefault" className="h-8 w-8" />
        </Avatar>
      )} */}
      <div className="flex flex-col max-w-[75%]">
        <div
          className={cn(
            "px-4 py-2 rounded-lg break-words",
            is_sender
              ? "bg-blue-600 text-white rounded-br-sm"
              : "bg-gray-100 text-black rounded-bl-sm"
          )}
        >
          {text}
        </div>
        <span
          className={cn(
            "text-xs mt-1",
            is_sender ? "text-right text-gray-500" : "text-gray-500"
          )}
        >
          {formattedTime}
        </span>
      </div>
      {is_sender && showAvatar && <div className="w-8" />}
    </motion.div>
  );
};

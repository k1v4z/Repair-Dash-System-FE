import { useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/icons";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const ChatMessageInput = ({
  onSendMessage,
  isLoading = false,
  disabled = false,
}: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !disabled) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end p-3 pt-2 border-t border-gray-200 bg-white">
      <div className="flex-1 relative">
        <Textarea
          placeholder="Nhập tin nhắn"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-[40px] placeholder:justify-start max-h-[120px] resize-none rounded-full pl-4 pr-12 py-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-gray-100"
          disabled={isLoading || disabled}
        />
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="absolute right-2 bottom-3"
        >
          <Button
            type="button"
            onClick={handleSend}
            disabled={!message.trim() || isLoading || disabled}
            className={`rounded-full h-[32px] w-[32px] p-0 flex items-center justify-center ${
              !message.trim() || isLoading || disabled
                ? "bg-blue-200"
                : "bg-blue-600"
            }`}
          >
            {isLoading ? (
              <Icon
                glyph="loader"
                className="h-4 w-4 text-white animate-spin"
              />
            ) : (
              <Icon glyph="send" className="h-4 w-4 text-white" />
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

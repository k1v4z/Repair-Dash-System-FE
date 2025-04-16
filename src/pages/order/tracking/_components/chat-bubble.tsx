import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/icons";
import { ChatPopup } from "./chat-popup";

interface ChatBubbleProps {
  sessionId: string;
  recipientName?: string;
}

export const ChatBubble = ({
  sessionId,
  recipientName = "Support",
}: ChatBubbleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleMinimize = () => {
    setIsOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <ChatPopup
            sessionId={sessionId}
            recipientName={recipientName}
            onClose={handleClose}
            onMinimize={handleMinimize}
          />
        )}
      </AnimatePresence>
      <motion.button
        className="fixed bottom-6 right-6 rounded-full bg-blue-600 text-white p-4 shadow-lg z-30 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <Icon glyph="messenger" className="h-6 w-6 fill-white" />
      </motion.button>
    </>
  );
};

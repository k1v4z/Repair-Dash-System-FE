import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useChat } from "@/features/order/hooks/useChat";
import Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ChatMessageGroup } from "./chat-message-group";
import { ChatMessageInput } from "./chat-message-input";

interface ChatPopupProps {
  sessionId: string;
  recipientName: string;
  onClose: () => void;
  onMinimize: () => void;
}

export const ChatPopup = ({
  sessionId,
  recipientName,
  onClose,
  onMinimize,
}: ChatPopupProps) => {
  const { messages, uiState, sendMessage, messagesEndRef } = useChat(sessionId);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-20 right-6 w-96 h-[500px] bg-white rounded-lg shadow-xl z-40 flex flex-col overflow-hidden border border-gray-200"
    >
      {/* Header */}
      <div className="px-4 py-3 bg-blue-600 text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-green-400 mr-2"></div>
          <h3 className="font-medium">{recipientName}</h3>
        </div>

        <div className="flex items-center space-x-1">
          <Button
            onClick={onMinimize}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-blue-700 h-8 w-8"
            aria-label="Minimize chat"
          >
            <Icon glyph="minus" className="h-4 w-4" />
          </Button>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-blue-700 h-8 w-8"
            aria-label="Close chat"
          >
            <Icon glyph="x" className="h-4 w-4 fill-white" />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4" ref={containerRef}>
        {uiState.isLoading ? (
          <div className="flex items-center justify-center h-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="text-blue-500"
            >
              <Icon glyph="loader" className="h-6 w-6" />
            </motion.div>
          </div>
        ) : uiState.error === "Phiên này đã hết hạn" ? (
          <div className="flex flex-col items-center justify-center h-full text-red-500">
            <Icon glyph="alertCircle" className="h-12 w-12 mb-2" />
            <p className="text-center font-medium">{uiState.error}</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Icon glyph="message" className="h-12 w-12 mb-2 text-blue-300" />
            <p className="text-center">Bắt đầu chat với {recipientName}</p>
          </div>
        ) : (
          <>
            <ChatMessageGroup messages={messages} />
            <div ref={messagesEndRef} />
          </>
        )}

        {uiState.error && uiState.error !== "Phiên này đã hết hạn" && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-md p-2 mt-2 text-sm flex items-center">
            <Icon glyph="alertCircle" className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{uiState.error}</span>
          </div>
        )}
      </div>
      <ChatMessageInput
        onSendMessage={sendMessage}
        isLoading={uiState.isSending}
        disabled={uiState.error === "Phiên này đã hết hạn"}
      />
    </motion.div>
  );
};

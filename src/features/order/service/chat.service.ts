import { getSession, sendMessage } from "../api/chat";
import type { Message } from "../types/chat.type";

/**
 * Retrieves the latest messages from a chat session
 */
export const getSessionMessages = async (
  sessionId: string
): Promise<{
  success: boolean;
  messages: Message[];
  error?: string;
  statusCode?: number;
}> => {
  const response = await getSession(sessionId);

  if (!response.success || !response.session) {
    return {
      success: false,
      messages: [],
      error: response.message || "Failed to retrieve session",
      statusCode: response.statusCode,
    };
  }

  return {
    success: true,
    messages: response.session.messages,
  };
};

/**
 * Sends a new message to a chat session
 */
export const sendNewMessage = async (
  sessionId: string,
  messageText: string
): Promise<{ success: boolean; error?: string }> => {
  if (!messageText.trim()) {
    return { success: false, error: "Message cannot be empty" };
  }

  const response = await sendMessage(sessionId, messageText);

  if (!response.success) {
    return {
      success: false,
      error: response.message || "Failed to send message",
    };
  }

  return { success: true };
};

/**
 * Checks if there are new messages by comparing with the existing messages
 */
export const hasNewMessages = (
  currentMessages: Message[],
  newMessages: Message[]
): boolean => {
  if (newMessages.length > currentMessages.length) {
    return true;
  }

  // If the last message timestamps are different, there are new messages
  if (
    currentMessages.length > 0 &&
    newMessages.length > 0 &&
    currentMessages[currentMessages.length - 1].timestamp !==
      newMessages[newMessages.length - 1].timestamp
  ) {
    return true;
  }

  return false;
};

import { useState, useEffect, useRef, useCallback } from "react";
import type { Message, ChatUIState } from "../types/chat.type";
import {
  getSessionMessages,
  sendNewMessage,
  hasNewMessages,
} from "../service/chat.service";

// Polling interval in milliseconds
const POLLING_INTERVAL = 5000;

export const useChat = (sessionId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [uiState, setUiState] = useState<ChatUIState>({
    isLoading: true,
    isSending: false,
    error: null,
  });
  const pollingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Function to fetch messages
  const fetchMessages = useCallback(async () => {
    if (!sessionId) return;

    try {
      const result = await getSessionMessages(sessionId);

      if (result.success) {
        // Check if there are new messages before updating state
        if (hasNewMessages(messages, result.messages)) {
          setMessages(result.messages);
        }

        // Clear any previous errors
        if (uiState.error) {
          setUiState((prev) => ({ ...prev, error: null }));
        }
      } else {
        // Check if it's a 404 status code - expired session
        if (result.statusCode === 404) {
          setUiState((prev) => ({
            ...prev,
            error: "Phiên này đã hết hạn",
            isLoading: false,
          }));

          // Stop polling if session has expired
          if (pollingTimerRef.current) {
            clearInterval(pollingTimerRef.current);
            pollingTimerRef.current = null;
          }
        } else {
          setUiState((prev) => ({
            ...prev,
            error: result.error || "Failed to load messages",
            isLoading: false,
          }));
        }
      }
    } catch {
      setUiState((prev) => ({
        ...prev,
        error: "Failed to load messages",
        isLoading: false,
      }));
    } finally {
      // Only set loading to false on initial load
      if (uiState.isLoading) {
        setUiState((prev) => ({ ...prev, isLoading: false }));
      }
    }
  }, [sessionId, messages, uiState.error, uiState.isLoading]);

  // Function to send a message
  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || !sessionId) return;

    setUiState((prev) => ({ ...prev, isSending: true, error: null }));

    try {
      const result = await sendNewMessage(sessionId, messageText);

      if (!result.success) {
        setUiState((prev) => ({
          ...prev,
          error: result.error || "Failed to send message",
        }));
      } else {
        // Optimistically add the message to the UI
        const optimisticMessage: Message = {
          user_id: 0, // Will be replaced by actual data from server
          message: messageText,
          is_sender: true,
          timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, optimisticMessage]);

        // Fetch the latest messages immediately after sending
        await fetchMessages();
      }
    } catch {
      setUiState((prev) => ({
        ...prev,
        error: "Failed to send message",
      }));
    } finally {
      setUiState((prev) => ({ ...prev, isSending: false }));
    }
  };

  // Function to scroll to the bottom of messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Initial fetch and setup polling
  useEffect(() => {
    const setupPolling = async () => {
      await fetchMessages();

      // Set up polling
      pollingTimerRef.current = setInterval(fetchMessages, POLLING_INTERVAL);
    };

    setupPolling();

    // Cleanup polling on unmount
    return () => {
      if (pollingTimerRef.current) {
        clearInterval(pollingTimerRef.current);
      }
    };
  }, [fetchMessages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return {
    messages,
    uiState,
    sendMessage,
    messagesEndRef,
    scrollToBottom,
  };
};

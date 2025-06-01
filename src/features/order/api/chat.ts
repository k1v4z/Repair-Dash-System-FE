import type {
    ChatApiResponse,
    SendMessageApiResponse,
  } from "../types/chat.type";
  import { axiosInstance } from "@/config/axios";
  
  const CHAT_ENDPOINTS = {
    SESSION: "/rtc",
  };
  
  /**
   * Fetches a chat session by session ID
   */
  export const getSession = async (
    sessionId: string
  ): Promise<ChatApiResponse> => {
    try {
      const response = await axiosInstance.get(
        `${CHAT_ENDPOINTS.SESSION}/${sessionId}`
      );
  
      return {
        success: true,
        session: response.data.session,
      };
    } catch (error) {
      console.error("Error fetching chat session:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to retrieve session",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        statusCode: (error as any)?.response?.status,
      };
    }
  };
  
  /**
   * Sends a message to a chat session
   */
  export const sendMessage = async (
    sessionId: string,
    message: string
  ): Promise<SendMessageApiResponse> => {
    try {
      const response = await axiosInstance.post(
        `${CHAT_ENDPOINTS.SESSION}/${sessionId}`,
        { message }
      );
  
      return {
        success: true,
        session: response.data.session,
      };
    } catch (error) {
      console.error("Error sending message:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to send message",
      };
    }
  };
  
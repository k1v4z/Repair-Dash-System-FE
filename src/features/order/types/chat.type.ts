export interface Message {
  user_id: number;
  message: string;
  is_sender: boolean;
  timestamp: string;
}

export interface ChatSession {
  session_id: string;
  user_id: number;
  order_id: number;
  customer_id: number;
  service_id: number;
  messages: Message[];
}

export interface ChatApiResponse {
  success: boolean;
  session?: ChatSession;
  message?: string;
  statusCode?: number;
}

export interface SendMessageApiResponse {
  success: boolean;
  session?: {
    session_id: string;
    user_id: number;
    message: string;
    timestamp: number;
  };
  message?: string;
}

export interface ChatUIState {
  isLoading: boolean;
  isSending: boolean;
  error: string | null;
}

export interface Notification {
  type:
    | "ORDER_CANCELED"
    | "ORDER_CREATED"
    | "ORDER_FEEDBACK"
    | "ORDER_AUTO_CANCELED"
    | "ORDER_COMPLETED"
    | "ORDER_UPDATED_INFO"
    | "ORDER_UPDATED_PROCESSING";
  content: string;
  link: string;
  time: number;
}

export interface NotificationResponse {
  notifications: Notification[];
}

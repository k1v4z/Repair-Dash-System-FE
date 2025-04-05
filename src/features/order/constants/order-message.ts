import type { OrderStatus } from "../types/orders.type";

export const SUCCESS_MESSAGES: Record<OrderStatus, string> = {
  PROCESSING: "Đơn đặt dịch vụ đã được chuyển sang trạng thái đang xử lý!",
  COMPLETED: "Đơn đặt dịch vụ đã được đánh dấu là hoàn thành!",
  CANCELED: "Đơn đặt dịch vụ đã bị hủy!",
  PENDING: "Cập nhật trạng thái đơn đặt dịch vụ thành công!",
};

export const CONFIRM_MESSAGES: Record<string, string> = {
  CANCELED: "Bạn có muốn hủy đơn đặt dịch vụ này?",
};

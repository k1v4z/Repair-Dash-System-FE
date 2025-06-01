import { ServiceReport } from '@/features/store/types/store-export.type';
import { ServiceOrder } from '@/features/store/types/store-manage.type';
import { formatDate } from '@/utils/datetime/date';
import type { ExcelColumn } from '@/utils/export/excel';

const formatDateSafe = (date: string | number | null): string => {
  if (!date) return '';
  try {
    return formatDate(new Date(String(date)));
  } catch (error) {
    console.error('Error formatting date:', error);
    return String(date);
  }
};

export const createServiceReportColumns = (): ExcelColumn<ServiceReport>[] => {
  return [
    { header: 'Tên dịch vụ', key: 'service_name', width: 30 },
    { header: 'Mô tả', key: 'service_description', width: 40 },
    { header: 'Tổng đơn hàng', key: 'total_orders', width: 15 },
    { header: 'Hoàn thành', key: 'total_completed_orders', width: 15 },
    { header: 'Đang xử lý', key: 'total_processing_orders', width: 15 },
    { header: 'Chờ xử lý', key: 'total_pending_orders', width: 15 },
    { header: 'Đã hủy', key: 'total_canceled_orders', width: 15 },
    { 
      header: 'Tỷ lệ hoàn thành', 
      key: 'completion_rate', 
      width: 15,
      formatter: (value: string | number) => `${value}%`
    },
    { header: 'Lượt thích', key: 'total_favorites', width: 15 },
    { 
      header: 'Ngày cập nhật', 
      key: 'updated_at', 
      width: 20,
      formatter: (value: string | number) => formatDateSafe(value)
    },
  ];
};

export const createOrderReportColumns = (): ExcelColumn<ServiceOrder>[] => {
    return [
      { header: 'Mã đơn', key: 'order_id', width: 15 },
      { header: 'Khách hàng', key: 'customer_full_name', width: 30 },
      { header: 'Nhân viên', key: 'employee_full_name', width: 30 },
      { header: 'Trạng thái', key: 'order_status', width: 15 },
      { header: 'Đánh giá', key: 'order_rating', width: 15 },
      { 
        header: 'Ngày tạo', 
        key: 'created_at', 
        width: 20,
        formatter: (value: string | number | null) => formatDateSafe(value)
      },
    ];
  }; 
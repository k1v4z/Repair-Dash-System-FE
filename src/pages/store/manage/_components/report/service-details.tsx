import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ServiceReportItem } from "@/features/store/types/store-manage.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icons from "@/components/icons";
import { format } from "date-fns";
import type { OrderStatus } from "@/features/order/types/orders.type";
import { useReport } from "@/features/store/hooks/useReport";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import routePath from "@/config/route";
import type { StatItem } from "@/types/globals.type";

interface ServiceDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceReportItem | null;
  monthly_report?: Record<string, number>;
}
const ORDER_STATUS_MAP: Record<OrderStatus, { label: string; color: string }> = {
  COMPLETED: { label: "Hoàn thành", color: "bg-green-100 text-green-700" },
  PROCESSING: { label: "Đang xử lý", color: "bg-blue-100 text-blue-700" },
  PENDING: { label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-700" },
  CANCELED: { label: "Đã hủy", color: "bg-red-100 text-red-700" },
};
export function ServiceDetailsDialog({ isOpen, onClose, service, monthly_report }: ServiceDetailsDialogProps) {
  const { 
    orders, 
    isLoadingOrders, 
    selectedStatus, 
    setSelectedStatus, 
    getOrdersByService 
  } = useReport();

  const [selectedMonth, setSelectedMonth] = useState<string>("ALL");

  useEffect(() => {
    if (isOpen && service) {
      getOrdersByService(service.service.service_id.toString());
    }
  }, [isOpen, service, selectedStatus, selectedMonth]);

  if (!service) return null;

  const filteredOrders = orders.filter(order => {
    if (selectedMonth === "ALL") return true;
    const orderMonth = format(new Date(order.created_at), "MM/yyyy");
    return orderMonth === selectedMonth;
  });

  const stats: StatItem[] = [
    {
      label: "Hoàn thành",
      value: service.total_completed_orders,
      total: service.total_orders,
      color: "bg-green-500",
      icon: "check",
      iconClass: "text-green-500",
      description: "Đã hoàn thành"
    },
    {
      label: "Đang xử lý",
      value: service.total_processing_orders,
      total: service.total_orders,
      color: "bg-blue-500",
      icon: "loading",
      iconClass: "text-blue-500",
      description: "Đang xử lý"
    },
    {
      label: "Chờ xử lý",
      value: service.total_pending_orders,
      total: service.total_orders,
      color: "bg-yellow-500",
      icon: "clock",
      iconClass: "text-yellow-500",
      description: "Chờ xử lý"
    },
    {
      label: "Đã hủy",
      value: service.total_canceled_orders,
      total: service.total_orders,
      color: "bg-red-500",
      icon: "close",
      iconClass: "text-red-500",
      description: "Đã hủy"
    }
  ];

  const handleViewOrder = (orderId: string) => {
    window.open(routePath.bookingDetail.replace(":orderId", orderId), '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1300px] max-h-[95vh] flex flex-col" aria-describedby="dialog-description">
        <DialogHeader className="px-6 py-4 border-b flex-shrink-0">
          <DialogTitle className="text-xl">Chi tiết dịch vụ</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto" id="dialog-description">
          <div className="p-6 space-y-6">
            {/* Service Info */}
            <div className="flex gap-4">
              <Avatar className="h-16 w-16 rounded-xl flex-shrink-0">
                <AvatarImage 
                  src={service.service.service_image_url || ''} 
                  alt={service.service.service_name}
                  className="rounded-xl"
                />
                <AvatarFallback className="bg-gray-100 text-gray-400 rounded-xl">
                  <Icons glyph="wrench" className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-xl text-gray-900 mb-1 truncate">
                  {service.service.service_name}
                </h3>
                <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                  {service.service.service_description}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Icons glyph="heart" className="w-4 h-4" />
                    {service.total_favorites} lượt thích
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Icons glyph="calendar" className="w-4 h-4" />
                    Cập nhật {format(new Date(service.service.updated_at), "dd/MM/yyyy")}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Tổng đơn hàng</div>
                <div className="text-2xl font-semibold">{service.total_orders}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">Tỷ lệ hoàn thành</div>
                <div className="text-2xl font-semibold">
                  {service.total_orders > 0 
                    ? Math.round((service.total_completed_orders / service.total_orders) * 100)
                    : 0}%
                </div>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`rounded-full p-1.5 bg-gray-50 ${stat.iconClass}`}>
                        <Icons glyph={stat.icon} className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{stat.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {stat.value}/{stat.total} đơn
                      </span>
                      <span className="text-sm font-medium">
                        {stat.total > 0 ? ((stat.value / stat.total) * 100).toFixed(0) : 0}%
                      </span>
                    </div>
                  </div>
                  <div className="relative h-2 bg-gray-300 rounded-full overflow-hidden">
                    <div 
                      className={`absolute left-0 top-0 h-full transition-all ${stat.color}`}
                      style={{ width: `${stat.total > 0 ? (stat.value / stat.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Orders Table */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">Danh sách đơn hàng</h4>
                <div className="flex items-center gap-2">
                  <Select 
                    value={selectedMonth} 
                    onValueChange={setSelectedMonth}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Chọn tháng">
                        {selectedMonth === "ALL" ? "Tất cả tháng" : selectedMonth}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL" className="text-gray-700 py-2 text-base">
                        Tất cả tháng
                      </SelectItem>
                      {Object.keys(monthly_report || {}).map((month) => (
                        <SelectItem 
                          key={month} 
                          value={month}
                          className="text-gray-700 py-2 text-base"
                        >
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select 
                    value={selectedStatus} 
                    onValueChange={(value: "ALL" | OrderStatus) => setSelectedStatus(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Chọn trạng thái">
                        {selectedStatus === "ALL" ? (
                          "Tất cả trạng thái"
                        ) : (
                          <span className={`px-2 py-0.5 rounded ${ORDER_STATUS_MAP[selectedStatus]?.color}`}>
                            {ORDER_STATUS_MAP[selectedStatus]?.label}
                          </span>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL" className="text-gray-700 py-2 text-base">
                        Tất cả trạng thái
                      </SelectItem>
                      {Object.entries(ORDER_STATUS_MAP).map(([value, { label, color }]) => (
                        <SelectItem 
                          key={value} 
                          value={value as OrderStatus}
                          className={`${color} rounded my-1 py-2 text-base`}
                        >
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="border rounded-md">
                <div className="max-h-[400px] overflow-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-white z-10">
                      <TableRow>
                        <TableHead className="w-[100px] py-4 text-base">Mã đơn</TableHead>
                        <TableHead className="w-[200px] py-4 text-base">Khách hàng</TableHead>
                        <TableHead className="w-[120px] py-4 text-base">Nhân viên</TableHead>
                        <TableHead className="w-[150px] py-4 text-base">Trạng thái</TableHead>
                        <TableHead className="w-[120px] py-4 text-base">Đánh giá</TableHead>
                        <TableHead className="w-[140px] py-4 text-base">Ngày tạo</TableHead>
                        <TableHead className="w-[80px] py-4 text-base text-center">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoadingOrders ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-base">
                            <div className="flex items-center justify-center gap-2">
                              <Icons glyph="loading" className="w-5 h-5 animate-spin" />
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : filteredOrders.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-gray-500 text-base">
                            Chưa có đơn hàng nào
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredOrders.map((order) => (
                          <TableRow key={order.order_id}>
                            <TableCell className="py-4 text-base">#{order.order_id}</TableCell>
                            <TableCell className="font-medium py-4 text-base">{order.customer_full_name}</TableCell>
                            <TableCell className="py-4 text-base">
                              {order.employee_full_name || "Chưa phân công"}
                            </TableCell>
                            <TableCell className="py-4">
                              <Badge 
                                variant="secondary" 
                                className={`${ORDER_STATUS_MAP[order.order_status as OrderStatus].color} text-base px-3 py-1`}
                              >
                                {ORDER_STATUS_MAP[order.order_status as OrderStatus].label}
                              </Badge>
                            </TableCell>
                            <TableCell className="py-4 text-base">
                              {order.order_rating ? (
                                <div className="flex items-center gap-1">
                                  <Icons glyph="star" className="w-5 h-5 text-yellow-400" />
                                  <span>{order.order_rating}</span>
                                </div>
                              ) : (
                                <span className="text-gray-400">Chưa đánh giá</span>
                              )}
                            </TableCell>
                            <TableCell className="py-4 text-base">
                              {format(new Date(order.created_at), "dd/MM/yyyy")}
                            </TableCell>
                            <TableCell className="py-4 text-base text-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-gray-100"
                                title="Xem chi tiết"
                                onClick={() => handleViewOrder(order.order_id.toString())}
                              >
                                <Icons glyph="eyeNonBorder" className="h-6 w-6 text-gray-600 hover:text-gray-800" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
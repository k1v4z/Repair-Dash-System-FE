import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { OrderByCustomer } from "@/features/order/types/orders.type";

interface OrderFilterProps {
  orders?: OrderByCustomer[];
  onFilter: (filteredOrders: OrderByCustomer[]) => void;
}

const statusMap: Record<string, { label: string; color: string }> = {
  COMPLETED: { label: "Hoàn thành", color: "bg-green-500" },
  PROCESSING: { label: "Đang xử lý", color: "bg-blue-500" },
  PENDING: { label: "Chờ xử lý", color: "bg-yellow-500" },
  CANCELED: { label: "Đã hủy", color: "bg-red-500" },
};

export function OrderFilter({ orders = [], onFilter }: OrderFilterProps) {
  const [status, setStatus] = useState<string>("ALL");

  function handleFilter(newStatus: string) {
    setStatus(newStatus);
    const safeOrders = Array.isArray(orders) ? orders : [];
    let filteredOrders = [...safeOrders];

    if (newStatus !== "ALL") {
      filteredOrders = filteredOrders.filter(
        (order) => order.order_status === newStatus
      );
    }

    onFilter(filteredOrders);
  }

  return (
    <div className="flex items-end space-x-4">
      <div className="w-[200px]">
        <label className="text-sm font-medium">Trạng thái</label>
        <Select value={status} onValueChange={handleFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Tất cả trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tất cả</SelectItem>
            {Object.entries(statusMap).map(([value, { label, color }]) => (
              <SelectItem key={value} value={value}>
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${color}`} />
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => {
          setStatus("ALL");
          onFilter(Array.isArray(orders) ? orders : []);
        }}
      >
        Đặt lại
      </Button>
    </div>
  );
}

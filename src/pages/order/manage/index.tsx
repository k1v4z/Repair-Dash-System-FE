import { useOrderByOwner } from "@/features/order/hooks/useOrderByOwner";
import { useEffect, useState } from "react";
import { OrderFilter } from "./_components/order-filter";
import { OrderStats } from "./_components/order-status";
import { OrderTable } from "./_components/order-table";
import type { OrderByCustomer } from "@/features/order/types/orders.type";

export default function OrderManagement() {
  const { orders = [], isLoading, error, stats } = useOrderByOwner();
  const [filteredOrders, setFilteredOrders] = useState<OrderByCustomer[]>([]);

  useEffect(() => {
    if (orders && Array.isArray(orders)) {
      setFilteredOrders(orders as OrderByCustomer[]);
    }
  }, [orders]);

  if (error) {
    return <div>Có lỗi xảy ra: {error.message}</div>;
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">Lịch sử đơn hàng</h2>

      <OrderStats stats={stats} />

      <div className="space-y-4">
        <OrderFilter
          orders={orders as OrderByCustomer[]}
          onFilter={setFilteredOrders}
        />
        <OrderTable data={filteredOrders || []} isLoading={isLoading} />
      </div>
    </div>
  );
}

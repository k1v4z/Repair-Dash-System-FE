import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface OrderStatsProps {
  stats: {
    total_orders: number;
    total_completed_orders: number;
    total_processing_orders: number;
    total_pending_orders: number;
    total_canceled_orders: number;
    completion_rate: number;
  };
}

export function OrderStats({ stats }: OrderStatsProps) {
  const items = [
    {
      title: "Tổng đơn hàng",
      value: stats.total_orders,
      className: "bg-gray-100",
    },
    {
      title: "Hoàn thành",
      value: stats.total_completed_orders,
      percent: stats.completion_rate,
      className: "bg-green-100 text-green-700",
    },
    {
      title: "Đang xử lý",
      value: stats.total_processing_orders,
      percent: (stats.total_processing_orders / stats.total_orders) * 100,
      className: "bg-blue-100 text-blue-700",
    },
    {
      title: "Chờ xử lý",
      value: stats.total_pending_orders,
      percent: (stats.total_pending_orders / stats.total_orders) * 100,
      className: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Đã hủy",
      value: stats.total_canceled_orders,
      percent: (stats.total_canceled_orders / stats.total_orders) * 100,
      className: "bg-red-100 text-red-700",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {items.map((item) => (
        <Card key={item.title} className={cn("shadow-none", item.className)}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            {item.percent !== undefined && (
              <p className="text-xs text-muted-foreground">
                {item.percent.toFixed(1)}% tổng đơn
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 
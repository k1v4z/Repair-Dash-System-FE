import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Icons from "@/components/icons";
import type { ReportResponse } from "@/features/store/types/store-manage.type";
import type { StatItem } from "@/types/globals.type";

interface ReportOverviewProps {
  data: ReportResponse | null;
}

export function ReportOverview({ data }: ReportOverviewProps) {
  const stats: StatItem[] = useMemo(() => [
    {
      label: "Tổng đơn hàng",
      value: data?.total.total_orders || 0,
      icon: "box",
      iconClass: "text-gray-500",
      description: `${data?.services.length || 0} dịch vụ`,
      total: data?.total.total_orders || 0,
      color: "text-gray-500",
    },
    {
      label: "Hoàn thành",
      value: data?.total.total_completed_orders || 0,
      icon: "check",
      iconClass: "text-green-500",
      description: `${((data?.total.total_completed_orders || 0) / (data?.total.total_orders || 1) * 100).toFixed(0)}%`,
      total: data?.total.total_orders || 0,
      color: "text-green-500",
    },
    {
      label: "Đang xử lý",
      value: data?.total.total_processing_orders || 0,
      icon: "loading",
      iconClass: "text-blue-500",
      description: `${((data?.total.total_processing_orders || 0) / (data?.total.total_orders || 1) * 100).toFixed(0)}%`,
      total: data?.total.total_orders || 0,
      color: "text-blue-500",
    },
    {
      label: "Chờ xử lý",
      value: data?.total.total_pending_orders || 0,
      icon: "clock",
      iconClass: "text-yellow-500",
      description: `${((data?.total.total_pending_orders || 0) / (data?.total.total_orders || 1) * 100).toFixed(0)}%`,
      total: data?.total.total_orders || 0,
      color: "text-yellow-500",
    },
    {
      label: "Đã hủy",
      value: data?.total.total_canceled_orders || 0,
      icon: "close",
      iconClass: "text-red-500",
      description: `${((data?.total.total_canceled_orders || 0) / (data?.total.total_orders || 1) * 100).toFixed(0)}%`,
      total: data?.total.total_orders || 0,
      color: "text-red-500",
    },
  ], [data]);

  return (
    <div className="grid grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.description}</p>
              </div>
              <div className={`rounded-full p-2 bg-gray-50 ${stat.iconClass}`}>
                <Icons glyph={stat.icon} className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 
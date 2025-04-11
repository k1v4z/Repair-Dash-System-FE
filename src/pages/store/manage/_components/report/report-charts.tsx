import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReportResponse } from "@/features/store/types/store-manage.type";
import { PieChart, BarChart, ResponsiveContainer, Pie, Bar, YAxis, Tooltip, Legend, Cell } from 'recharts';

interface ReportChartsProps {
  data: ReportResponse | null;
}

export function ReportCharts({ data }: ReportChartsProps) {
  const pieData = [
    { name: 'Hoàn thành', value: data?.total.total_completed_orders ?? 0, color: '#22C55E' },
    { name: 'Đang xử lý', value: data?.total.total_processing_orders ?? 0, color: '#3B82F6' },
    { name: 'Chờ xử lý', value: data?.total.total_pending_orders ?? 0, color: '#EAB308' },
    { name: 'Đã hủy', value: data?.total.total_canceled_orders ?? 0, color: '#EF4444' },
  ];

  const barData = useMemo(() => 
    data?.services.map(service => ({
      name: service.service.service_name,
      'Hoàn thành': service.total_completed_orders,
      'Đang xử lý': service.total_processing_orders,
      'Chờ xử lý': service.total_pending_orders,
      'Đã hủy': service.total_canceled_orders,
    })) ?? [],
    [data?.services]
  );

  if (!data) return null;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Trạng thái đơn hàng</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Đơn hàng theo dịch vụ</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={barData}>
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Hoàn thành" fill="#22C55E" stackId="stack" />
              <Bar dataKey="Đang xử lý" fill="#3B82F6" stackId="stack" />
              <Bar dataKey="Chờ xử lý" fill="#EAB308" stackId="stack" />
              <Bar dataKey="Đã hủy" fill="#EF4444" stackId="stack" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
} 
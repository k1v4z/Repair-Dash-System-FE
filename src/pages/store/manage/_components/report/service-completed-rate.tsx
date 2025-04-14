import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReportResponse } from "@/features/store/types/store-manage.type";
import { useMemo } from "react";

interface ServiceCompletionRatesProps {
  data: ReportResponse | null;
}

export function ServiceCompletionRates({ data }: ServiceCompletionRatesProps) {
  const services = useMemo(() => {
    if (!data?.services) return [];
    
    return data.services.map(service => {
      const total = service.total_orders;
      const completed = service.total_completed_orders;
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

      return {
        name: service.service.service_name,
        percentage,
        total,
        completed,
      };
    });
  }, [data?.services]);

  if (!data) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tỷ lệ hoàn thành theo dịch vụ</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {services.map((service, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{service.name}</span>
              <span className="text-gray-500">
                {service.completed}/{service.total} đơn
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 origin-left transform-gpu animate-progress-bar"
                  style={{ 
                    transform: `scaleX(${service.percentage / 100})`
                  }}
                />
              </div>
              <span className="text-sm font-medium w-12 animate-fade-in">
                {service.percentage}%
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
} 
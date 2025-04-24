import { useReport } from '@/features/store/hooks/useReport';
import { ReportOverview } from './report/report-overview';
import { ReportCharts } from './report/report-charts';
import { ServiceCompletionRates } from './report/service-completed-rate';
import { ServiceTable } from './report/service-table';
import { useState } from 'react';

export function ReportManagement() {
  const [pageSize, setPageSize] = useState(10);
  const {
    reportData,
    currentPage,
    isLoading,
    setCurrentPage,
  } = useReport(pageSize);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Báo cáo dịch vụ</h2>
        <p className="text-sm text-gray-500 mt-1">
          Tổng quan về hiệu suất các dịch vụ và đơn hàng
        </p>
      </div>

      <ReportOverview data={reportData} />

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <ReportCharts data={reportData} />
        </div>
        
        <ServiceCompletionRates data={reportData} />
      </div>

      <ServiceTable
        data={reportData?.services || []}
        currentPage={currentPage}
        totalPages={reportData?.total_pages || 1}
        onPageChange={setCurrentPage}
        isLoading={isLoading}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        monthly_report={reportData?.monthly_report}
      />
    </div>
  );
} 
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import Icons from "@/components/icons";
import type { ColumnDef } from "@tanstack/react-table";
import type { ServiceReportItem } from "@/features/store/types/store-manage.type";
import { formatDate } from "@/utils/datetime/date";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { ServiceDetailsDialog } from "./service-details";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { exportToExcel } from "@/utils/export/excel";
import { createServiceReportColumns } from "./report-helper";

const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50];

interface ServiceTableProps {
  data: ServiceReportItem[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
}

export function ServiceTable({ 
  data, 
  currentPage, 
  totalPages, 
  onPageChange,
  isLoading = false,
  pageSize = 10,
  onPageSizeChange
}: ServiceTableProps) {
  const [selectedService, setSelectedService] = useState<ServiceReportItem | null>(null);

  const reportData = useMemo(() => data.map(item => ({
    service_name: item.service.service_name,
    service_description: item.service.service_description,
    total_orders: item.total_orders,
    total_completed_orders: item.total_completed_orders,
    total_processing_orders: item.total_processing_orders,
    total_pending_orders: item.total_pending_orders,
    total_canceled_orders: item.total_canceled_orders,
    completion_rate: item.total_orders > 0 
      ? Math.round((item.total_completed_orders / item.total_orders) * 100)
      : 0,
    total_favorites: item.total_favorites,
    updated_at: item.service.updated_at
  })), [data]);

  const handleExportExcel = () => {
    if (!data.length) return;

    const sheets = [{
      name: 'Báo cáo dịch vụ',
      columns: createServiceReportColumns(),
      data: reportData
    }];

    exportToExcel('bao_cao_dich_vu', sheets);
  };

  const columns: ColumnDef<ServiceReportItem>[] = [
    {
      accessorKey: "service.service_name",
      header: "Tên dịch vụ",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage 
              src={row.original.service.service_image_url || ''} 
              alt={row.original.service.service_name} 
            />
            <AvatarFallback className="bg-gray-100 text-gray-400">
              <Icons glyph="wrench" className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-gray-800">
              {row.original.service.service_name}
            </div>
            <div className="text-sm text-gray-500">
              {row.original.service.service_alias}
            </div>
            <div className="text-xs text-gray-400 truncate max-w-[200px]">
              {row.original.service.service_description}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "total_orders",
      header: "Tổng đơn",
      cell: ({ row }) => (
        <div className="text-gray-700 font-medium">
          {row.original.total_orders}
        </div>
      ),
    },
    {
      accessorKey: "total_completed_orders",
      header: "Hoàn thành",
      cell: ({ row }) => (
        <div className="text-green-600 font-medium">
          {row.original.total_completed_orders}
        </div>
      ),
    },
    {
      accessorKey: "total_processing_orders",
      header: "Đang xử lý",
      cell: ({ row }) => (
        <div className="text-blue-600 font-medium">
          {row.original.total_processing_orders}
        </div>
      ),
    },
    {
      accessorKey: "total_pending_orders",
      header: "Chờ xử lý",
      cell: ({ row }) => (
        <div className="text-yellow-600 font-medium">
          {row.original.total_pending_orders}
        </div>
      ),
    },
    {
      accessorKey: "total_canceled_orders",
      header: "Đã hủy",
      cell: ({ row }) => (
        <div className="text-red-600 font-medium">
          {row.original.total_canceled_orders}
        </div>
      ),
    },
    {
      accessorKey: "total_favorites",
      header: "Yêu thích",
      cell: ({ row }) => (
        <div className="text-gray-600">
          {row.original.total_favorites}
        </div>
      ),
    },
    {
      accessorKey: "service.updated_at",
      header: "Cập nhật",
      cell: ({ row }) => (
        <div className="text-sm text-gray-500">
          {formatDate(new Date(row.original.service.updated_at))}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Thao tác",
      cell: ({ row }) => (
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={() => setSelectedService(row.original)}
        >
          <Icons glyph="eyeNonBorder" className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Chi tiết dịch vụ</CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Số dòng mỗi trang:</span>
                <Select
                  value={pageSize.toString()}
                  onValueChange={(value) => onPageSizeChange?.(Number(value))}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PAGE_SIZE_OPTIONS.map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size} dòng
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                variant="outline" 
                className="border-gray-200 shadow-sm"
                onClick={handleExportExcel}
                disabled={isLoading || data.length === 0}
              >
                <Icons glyph="chart" className="w-4 h-4 mr-1.5" /> Xuất báo cáo
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data}
            loading={isLoading}
            pagination={{
              currentPage,
              pageSize,
              totalPages,
              onPageChange,
            }}
          />
        </CardContent>
      </Card>

      <ServiceDetailsDialog 
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
      />
    </>
  );
} 
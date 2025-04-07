import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/data-table";
import { ColumnDef } from "@tanstack/react-table";
import Icons from "@/components/icons";
import Rating from "@/components/common/rating";
import type { Feedback } from "@/features/store/types/store-manage.type";
import { averageStars } from "@/utils/average-stars";
import {formatDate} from "@/utils/datetime/date";
const DUMMY_FEEDBACKS: Feedback[] = [
  {
    id: 1,
    customer_name: "Nguyễn Văn A",
    service_name: "Sửa chữa điện thoại",
    rating: 5,
    content: "Dịch vụ rất tốt, nhân viên nhiệt tình",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    customer_name: "Trần Thị B",
    service_name: "Thay màn hình",
    rating: 4,
    content: "Sửa chữa nhanh, giá cả hợp lý",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 3,
    customer_name: "Lê Văn C",
    service_name: "Thay pin",
    rating: 3,
    content: "Dịch vụ ổn, nhưng thời gian chờ hơi lâu",
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
];

export function FeedbackManagement() {
  const [feedbacks] = useState<Feedback[]>(DUMMY_FEEDBACKS);
  const [currentPage, setCurrentPage] = useState(1);

  const columns: ColumnDef<Feedback>[] = [
    {
      accessorKey: "customer_name",
      header: "Khách hàng",
      cell: ({ row }) => (
        <div className="font-medium text-gray-800">{row.original.customer_name}</div>
      ),
    },
    {
      accessorKey: "service_name",
      header: "Dịch vụ",
      cell: ({ row }) => (
        <div className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs inline-flex font-medium">
          {row.original.service_name}
        </div>
      ),
    },
    {
      accessorKey: "rating",
      header: "Đánh giá",
      cell: ({ row }) => {
        const rating = row.original.rating;
        let bgColor = "bg-red-50 text-red-700";
        
        if (rating >= 4) {
          bgColor = "bg-green-50 text-green-700";
        } else if (rating >= 3) {
          bgColor = "bg-yellow-50 text-yellow-700";
        }
        
        return (
          <div className="flex items-center space-x-2">
            <div className={`rounded-full px-2 py-0.5 text-xs font-medium ${bgColor}`}>
              {rating}/5
            </div>
            <div className="translate-y-[-4px] inline-flex">
              <Rating number={rating} />
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "content",
      header: "Nội dung",
      cell: ({ row }) => (
        <div className="max-w-xs">
          <p className="truncate text-gray-600" title={row.original.content}>
            "{row.original.content}"
          </p>
        </div>              
      ),
    },
    {
      accessorKey: "created_at",
      header: "Thời gian",
      cell: ({ row }) => {
        const date = new Date(row.original.created_at);
        return (
          <span className="text-xs text-gray-500">
             {formatDate(date)}  
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Thao tác",
      cell: () => (
        <Button variant="outline" size="sm" className="text-xs h-8 border-gray-200 shadow-sm">
          <Icons glyph="eyeNonBorder" className="w-3.5 h-3.5 mr-1.5" />
          Chi tiết
        </Button>
      ),
    },
  ];

  const avgRating = averageStars(feedbacks);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Quản lý phản hồi</h2>
          <p className="text-sm text-gray-500 mt-1">
            <span className="inline-flex items-center gap-2">
              Đánh giá trung bình: 
              <span className="font-medium text-yellow-500">{avgRating}/5</span>
              <span className="translate-y-[-4px] inline-flex">
                <Rating number={Number(avgRating)} />
              </span>
              <span className="text-gray-500">({feedbacks.length} phản hồi)</span>
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-200 shadow-sm">
            <Icons glyph="chart" className="w-4 h-4 mr-1.5" /> Xuất báo cáo
          </Button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-md shadow-sm overflow-hidden">
        <DataTable
          columns={columns}
          data={feedbacks}
          pagination={{
            currentPage,
            pageSize: 5,
            totalPages: Math.ceil(feedbacks.length / 5),
            onPageChange: setCurrentPage,
          }}
        />
      </div>
    </div>
  );
} 
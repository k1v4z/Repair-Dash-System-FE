import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icons from "@/components/icons";
import type { Employee } from "@/features/store/types/store.type";
import {formatDate} from "@/utils/datetime/date";

const DUMMY_EMPLOYEES: Employee[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    position: "Kỹ thuật viên",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    status: "active",
    joined_date: "2023-01-15",
  },
  {
    id: 2,
    name: "Trần Thị B",
    position: "Lễ tân",
    email: "tranthib@example.com",
    phone: "0901234568",
    status: "active",
    joined_date: "2023-02-20",
  },
  {
    id: 3,
    name: "Lê Văn C",
    position: "Quản lý",
    email: "levanc@example.com",
    phone: "0901234569",
    status: "inactive",
    joined_date: "2022-11-10",
  },
];

export function EmployeeManagement() {
  const [employees] = useState<Employee[]>(DUMMY_EMPLOYEES);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: "Họ tên",
      cell: ({ row }) => (
        <div className="font-medium text-gray-800">{row.original.name}</div>
      ),
    },
    {
      accessorKey: "position",
      header: "Chức vụ",
      cell: ({ row }) => (
        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
          {row.original.position}
        </span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="flex items-center">
          <span className="text-gray-600 text-sm">{row.original.email}</span>
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Số điện thoại",
      cell: ({ row }) => (
        <div className="text-gray-600 text-sm">{row.original.phone}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
              status === "active"
                ? "bg-green-50 text-green-700 border border-green-100"
                : "bg-red-50 text-red-700 border border-red-100"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${status === "active" ? "bg-green-500" : "bg-red-500"}`}></span>
            {status === "active" ? "Đang làm việc" : "Ngừng làm việc"}
          </span>
        );
      },
    },
    {
      accessorKey: "joined_date",
      header: "Ngày bắt đầu",
      cell: ({ row }) => {
        const date = new Date(row.original.joined_date);
        const now = new Date();
        const diffMonths = (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());
        
        return (
          <div className="flex flex-col">
            <span className="text-gray-700 text-sm">
              {formatDate(date)}
            </span>
            <span className="text-xs text-gray-500">
              {diffMonths > 0 ? `${diffMonths} tháng trước` : "Mới"}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Thao tác",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 border border-gray-200 rounded-md hover:bg-gray-100">
                <span className="text-lg">⋮</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuItem className="cursor-pointer flex items-center">
                <Icons glyph="eyeNonBorder" className="mr-2 text-blue-500" />
                <span>Xem chi tiết</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer flex items-center">
                <Icons glyph="edit" className="mr-2 text-gray-500" />
                <span>Chỉnh sửa</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600 flex items-center">
                <Icons glyph={row.original.status === "active" ? "block" : "check"} className="mr-2" />
                <span>
                  {row.original.status === "active"
                    ? "Vô hiệu hóa"
                    : "Kích hoạt lại"}
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const activeCount = employees.filter(emp => emp.status === "active").length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Quản lý nhân viên</h2>
          <p className="text-sm text-gray-500 mt-1">
            Đang có <span className="font-medium text-green-600">{activeCount}</span> nhân viên làm việc 
            trong tổng số {employees.length} nhân viên
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <span className="mr-1">+</span> Thêm nhân viên
          </Button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-md shadow-sm overflow-hidden">
        <DataTable
          columns={columns}
          data={employees}
          pagination={{
            currentPage,
            pageSize: 5,
            totalPages: Math.ceil(employees.length / 5),
            onPageChange: setCurrentPage,
          }}
        />
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Thêm nhân viên mới</h3>
            <div className="text-right mt-4">
              <Button variant="outline" className="mr-2" onClick={() => setIsAddModalOpen(false)}>
                Hủy
              </Button>
              <Button>Lưu</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
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
import type { Employee } from "@/features/store/types/store-manage.type";
import {formatDate} from "@/utils/datetime/date";
import { useEmployee } from '@/features/store/hooks/useEmployee';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AddEmployeeModal } from "./add-employee-modal";
import { UpdateEmployeeModal } from "./update-employee-modal";
import { storeManageServices } from "@/features/store/services/store.service";
import { toast } from "react-toastify";
import type { AddEmployeeRequest, UpdateEmployeeRequest } from "@/features/store/types/store.type";
import { convertToBase64 } from "@/utils/convert/base64";
import { ConfirmDialog } from "@/components/common/confirm-dialog";

export function EmployeeManagement() {
  const {
    employees,
    currentPage,
    totalPages,
    isLoading,
    setCurrentPage,
    refreshEmployees
  } = useEmployee();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleAddEmployee = async (data: {
    employee_full_name: string;
    image: File | null;
  }) => {
    try {
      setIsAddLoading(true);
      const addData : AddEmployeeRequest = {
        employee_full_name: data.employee_full_name,
        avatar_image: data.image
      };
      const addResponse = await storeManageServices.addEmployee(addData);
      if (addResponse) {
        refreshEmployees();
        toast.success("Thêm nhân viên mới thành công");
        setIsAddModalOpen(false);
      }
      else {
        toast.error("Dữ liệu bị lỗi");
        throw new Error("Unexpected error");        
      }
    } catch {
      toast.error("Không thể thêm nhân viên. Vui lòng thử lại");
    } finally {
      setIsAddLoading(false);
    }
  };

  const handleUpdateClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateEmployee = async (data: {
    employee_full_name: string;
    image: File | null;
  }) => {
    try {
      setIsUpdateLoading(true);
      if (!selectedEmployee) return;

      let avatarUrl = selectedEmployee.employee_avatar_url;
      if (data.image) {
        avatarUrl = await convertToBase64(data.image);
      }

      const updateData: UpdateEmployeeRequest = {
        employee_full_name: data.employee_full_name,
        avatar_image: avatarUrl
      };

      await storeManageServices.updateEmployee(selectedEmployee.employee_id.toString(), updateData);
      await refreshEmployees();
      toast.success("Cập nhật nhân viên thành công");
      setIsUpdateModalOpen(false);
    } catch {
      toast.error("Không thể cập nhật nhân viên. Vui lòng thử lại");
    } finally {
      setIsUpdateLoading(false);
    }
  };

  const handleDeleteEmployee = async () => {
    try {
      if (!selectedEmployee) return;

      await storeManageServices.deleteEmployee(selectedEmployee.employee_id.toString());
      await refreshEmployees();
      toast.success("Xóa nhân viên thành công");
      setIsDeleteDialogOpen(false);
    } catch {
      toast.error("Không thể xóa nhân viên. Vui lòng thử lại");
    }
  };

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "employee_full_name",
      header: "Họ tên",
      cell: ({ row }) => {
        const status = row.original.status;
        const colorScheme = status ? {
          border: "border-green-500",
          bg: "bg-green-100",
          text: "text-green-500"
        } : {
          border: "border-primary-royalBlue",
          bg: "bg-transparent",
          text: "text-primary-royalBlue"
        };

        return (
          <div className="flex items-center gap-3 min-w-0 max-w-[200px]">
            <Avatar className={cn(
              "border-2 flex-shrink-0",
              colorScheme.border
            )}>
              <AvatarImage src={row.original.employee_avatar_url || ""} />
              <AvatarFallback className={colorScheme.bg}>
                <Icons 
                  glyph="avatarDefault" 
                  className={cn(
                    "w-5 h-5",
                    colorScheme.text
                  )} 
                />
              </AvatarFallback>
            </Avatar>
            <div className="font-medium text-gray-800 truncate" title={row.original.employee_full_name}>
              {row.original.employee_full_name}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "total_orders",
      header: "Số đơn hàng",
      cell: ({ row }) => (
        <div className="w-[50px]">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
            {row.original.total_orders}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div className="w-[200px]">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                status
                  ? "bg-green-50 text-green-700 border border-green-100"
                  : "bg-primary-royalBlue/10 text-primary-royalBlue border"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${status ? "bg-green-500" : "bg-primary-royalBlue"}`}></span>
              {status ? "Đang trong đơn hàng" : "Đang rảnh"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Ngày thêm",
      cell: ({ row }) => {
        const date = new Date(row.original.created_at);
        const now = new Date();
        const diffMonths = (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());
        
        return (
          <div className="flex flex-col w-[120px]">
            <span className="text-gray-700 text-sm truncate">
              {formatDate(date)}
            </span>
            <span className="text-xs text-gray-500 truncate">
              {diffMonths > 0 ? `${diffMonths} tháng trước` : "Mới"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "updated_at",
      header: "Ngày cập nhật",
      cell: ({ row }) => {
        const date = new Date(row.original.updated_at);
        const now = new Date();
        const diffMonths = (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());
        
        return (
          <div className="flex flex-col w-[120px]">
            <span className="text-gray-700 text-sm truncate">
              {formatDate(date)}
            </span>
            <span className="text-xs text-gray-500 truncate">
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
          <div className="w-[80px]">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <span className="text-xl">⋮</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleUpdateClick(row.original)}>
                  <Icons glyph="edit" className="mr-2 h-4 w-4" />
                  <span>Cập nhật</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-600 flex items-center" onClick={() => {
                  setSelectedEmployee(row.original);
                  setIsDeleteDialogOpen(true);
                }}>
                  <Icons glyph="delete" className="mr-2" />
                  <span>
                    Xóa
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const activeCount = employees.filter((emp: Employee) => emp.status).length;

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
          loading={isLoading}
          pagination={{
            currentPage,
            pageSize: 10,
            totalPages,
            onPageChange: setCurrentPage,
          }}
        />
      </div>

      <AddEmployeeModal 
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSubmit={handleAddEmployee}
        isLoading={isAddLoading}
      />
      <UpdateEmployeeModal
        open={isUpdateModalOpen}
        onOpenChange={setIsUpdateModalOpen}
        onSubmit={handleUpdateEmployee}
        isLoading={isUpdateLoading}
        employee={selectedEmployee!}
      />

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Xác nhận xóa"
        description="Bạn có chắc chắn muốn xóa nhân viên này? Hành động này không thể hoàn tác."
        onConfirm={handleDeleteEmployee}
        confirmText="Xóa"
      />
      
    </div>
  );
} 
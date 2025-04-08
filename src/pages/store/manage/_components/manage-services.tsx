import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DateSelect } from "@/components/ui/date-select";
import { AddServiceModal } from "@/pages/store/manage/_components/add-service-modal";
import SERVICE_DEFAULT_IMG from "@/assets/images/servicedefault.png";
import { DataTable } from "@/components/common/data-table";
import { storeManageServices } from "@/features/store/services/store.service";
import type { Service } from "@/features/store/types/store.type";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import type {
  AddServiceRequest,
  UpdateServiceRequest,
} from "@/features/store/types/store.type";
import { UpdateServiceModal } from "@/pages/store/manage/_components/update-service-modal";
import { formatDate } from "@/utils/datetime/date";
import { useGetServiceByOwner } from "@/features/store/hooks/useGetServiceByOwner";
import { toast } from "react-toastify";
import Icons from "@/components/icons";

const PAGE_SIZE = 8;
export function ServiceManagement() {
  const {
    services,
    currentPage,
    totalPages,
    isLoading: showSkeleton,
    setCurrentPage,
    refreshServices,
  } = useGetServiceByOwner(PAGE_SIZE);

  const [selectedMonth, setSelectedMonth] = useState("March");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const columns: ColumnDef<Service>[] = [
    {
      accessorKey: "service_name",
      header: "Tên dịch vụ",
      cell: ({ row }) => {
        let imageUrl = SERVICE_DEFAULT_IMG;
        const images = row.original.service_image_url;
        if (images) {
          imageUrl = images;
        }
        return (
          <div className="flex items-center gap-3 w-[250px]">
            <div className="w-10 h-10 rounded-md overflow-hidden shadow-sm flex-shrink-0 border border-gray-100">
              <img
                src={imageUrl}
                alt={row.original.service_name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-800 truncate">{row.original.service_name}</span>
              <span className="text-xs text-gray-500 truncate">{row.original.service_alias}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "service_description",
      header: "Mô tả dịch vụ",
      cell: ({ row }) => (
        <div className="w-[300px]">
          <p className="truncate text-gray-600" title={row.original.service_description}>
            {row.original.service_description}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Ngày tạo",
      cell: ({ row }) => (
        <div className="w-[120px]">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-800 border border-yellow-100">
            {formatDate(new Date(row.original.created_at), "vi-VN")}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "updated_at",
      header: "Ngày cập nhật",
      cell: ({ row }) => (
        <div className="w-[120px]">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-100">
            {formatDate(new Date(row.original.updated_at), "vi-VN")}
          </span>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Thao tác",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 border border-gray-200 rounded-md hover:bg-gray-100">
                <span className="text-xl">⋮</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem
                onClick={() => {
                  setSelectedService(row.original);
                  setIsUpdateModalOpen(true);
                }}
                className="cursor-pointer flex items-center"
              >
                <Icons glyph="edit" className="mr-2 text-blue-500" />
                <span>Chỉnh sửa</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer text-red-600 flex items-center"
                onClick={() => {
                  setDeleteId(row.original.service_id);
                  setIsDeleteDialogOpen(true);
                }}
              >
                <Icons glyph="delete" className="mr-2 text-red-600" />
                <span>Xóa</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleAddService = async (data: {
    service_name: string;
    service_description: string;
    service_alias: string;
    image: File | null;
  }) => {
    try {
      setIsAddLoading(true);

      const addData: AddServiceRequest = {
        service_name: data.service_name,
        service_description: data.service_description,
        service_image: data.image ,
        service_alias:data.service_alias ,
      };
      const addResponse = await storeManageServices.addService(addData);
      if (addResponse) {
        refreshServices();
        toast.success("Thêm dịch vụ thành công");
        setOpenAddModal(false);
      }
      else {
        toast.error("Dữ liệu bị lỗi");
        throw new Error("Unexpected error");        
      }
    } catch {
      toast.error("Thêm dịch vụ thất bại");
    } finally {
      setIsAddLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await storeManageServices.deleteService(deleteId.toString());
      setIsDeleteDialogOpen(false);
      toast.success("Xóa dịch vụ thành công");
      refreshServices();
    } catch {
      toast.error("Xóa dịch vụ thất bại");
    }
  };

  const handleUpdate = async (data: {
    service_name: string;
    service_description: string;
    service_alias: string;
    image: File | null;
  }) => {
    if (!selectedService) return;

    try {
      setIsUpdateLoading(true);

      const updateData: UpdateServiceRequest = {
        service_name: data.service_name,
        service_description: data.service_description,
        service_alias: data.service_alias,
        service_image: data.image || undefined
      };

      await storeManageServices.updateService(
        selectedService.service_id.toString(),
        updateData
      );
      await refreshServices();
      toast.success("Cập nhật dịch vụ thành công");
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Cập nhật dịch vụ thất bại");
    } finally {
      setIsUpdateLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Quản lý dịch vụ</h2>
          <p className="text-sm text-gray-500 mt-1">Có tất cả {services.length} dịch vụ</p>
        </div>
        <div className="flex gap-3 items-center">
          <DateSelect value={selectedMonth} onChange={setSelectedMonth} />
          <Button 
            onClick={() => setOpenAddModal(true)} 
            className="bg-primary hover:bg-primary/90 text-white shadow-sm"
          >
            <Icons glyph="plus" className="w-4 h-4 mr-1.5" /> Thêm dịch vụ
          </Button>
        </div>
      </div>
      
      <div className="bg-white border border-gray-100 rounded-md shadow-sm overflow-hidden">
        <DataTable
          columns={columns}
          data={services}
          loading={showSkeleton}
          pagination={{
            currentPage,
            pageSize: 8,
            totalPages,
            onPageChange: setCurrentPage,
          }}
        />
      </div>
      
      <AddServiceModal
        open={openAddModal}
        onOpenChange={setOpenAddModal}
        onSubmit={handleAddService}
        isLoading={isAddLoading}
      />
      
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Xác nhận xóa"
        description="Bạn có chắc chắn muốn xóa dịch vụ này? Hành động này không thể hoàn tác."
        onConfirm={handleDelete}
        confirmText="Xóa"
      />
      
      {selectedService && (
        <UpdateServiceModal
          open={isUpdateModalOpen}
          onOpenChange={setIsUpdateModalOpen}
          service={selectedService}
          onSubmit={handleUpdate}
          isLoading={isUpdateLoading}
        />
      )}
    </div>
  );
} 